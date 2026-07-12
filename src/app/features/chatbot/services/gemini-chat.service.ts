import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ChatService } from './chat-service';
import { ChatMessage } from '../interfaces/chat.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiChatService implements ChatService {
  private http = inject(HttpClient);

  // Retrieve key from LocalStorage or any other config
  private getApiKey(): string | null {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey) return savedKey;
    }
    return environment.geminiApiKey || null;
  }


  sendMessage(prompt: string, history: ChatMessage[]): Observable<string> {
    const apiKey = this.getApiKey();

    if (!apiKey) {
      // If no API key is set, log a warning and use simulated response
      console.warn('Gemini API key is not configured. Falling back to local Smart Coach response.');
      return this.getMockResponse(prompt);
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:streamGenerateContent?key=${apiKey}`;

    // Map history to Gemini content structure
    const contents = history.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    const body = {
      contents,
      systemInstruction: {
        parts: [
          {
            text: `You are 'Smart Coach', an expert AI fitness coach and nutritionist for Super Fitness.
Provide helpful, professional, encouraging, and highly detailed fitness, workout, and nutrition advice.
Keep responses relatively concise, formatting them with simple markdown (bold, bullet points) if helpful, and always maintain an encouraging coach persona.`,
          },
        ],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    };

    return new Observable<string>((observer) => {
      let aborted = false;
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller?.signal
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (!response.body) {
          throw new Error('ReadableStream not supported on response.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';
        let cumulativeText = '';

        try {
          while (!aborted) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Robust JSON stream chunk bracket depth parser
            let startIdx;
            while ((startIdx = buffer.indexOf('{')) >= 0) {
              let depth = 0;
              let endIdx = -1;
              for (let i = startIdx; i < buffer.length; i++) {
                if (buffer[i] === '{') depth++;
                else if (buffer[i] === '}') {
                  depth--;
                  if (depth === 0) {
                    endIdx = i;
                    break;
                  }
                }
              }

              if (endIdx !== -1) {
                const chunkStr = buffer.substring(startIdx, endIdx + 1);
                buffer = buffer.substring(endIdx + 1);
                try {
                  const parsed = JSON.parse(chunkStr);
                  const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    cumulativeText += text;
                    observer.next(cumulativeText);
                  }
                } catch {
                  // Incomplete or metadata chunk
                }
              } else {
                break;
              }
            }
          }
          observer.complete();
        } catch (e: any) {
          if (!aborted) {
            console.error('Streaming parse error:', e);
            observer.error(e);
          }
        }
      }).catch((err) => {
        if (!aborted) {
          console.error('Fetch stream connection error:', err);
          observer.error(err);
        }
      });

      return () => {
        aborted = true;
        controller?.abort();
      };
    });
  }

  // Fallback simulator for offline/no-key usage
  private getMockResponse(prompt: string): Observable<string> {
    const query = prompt.toLowerCase();
    let reply = '';

    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('introduce') || query.includes('greet')) {
      reply = "Hello! I am your Smart Coach. I can help you design workouts, suggest diets, and keep you motivated! What are your fitness goals today?";
    } else if (query.includes('diet') || query.includes('nutrition') || query.includes('eat') || query.includes('food')) {
      reply = "To fuel your workouts, I recommend focusing on a balanced diet of **lean proteins** (chicken, fish, tofu), **complex carbs** (sweet potato, oats, brown rice), and **healthy fats** (avocado, nuts). Drink at least 3 liters of water daily. Would you like a specific meal plan structure?";
    } else if (query.includes('workout') || query.includes('exercise') || query.includes('train') || query.includes('routine')) {
      reply = "A great starting split is a **3-day Full Body routine** or a **4-day Upper/Lower split**:\n- **Day 1**: Push movements (Squat, Bench Press, Shoulder Press)\n- **Day 2**: Pull movements (Deadlift, Pull-Ups, Rows)\n- **Day 3**: Core & Cardio\n\nAlways warm up for 5-10 minutes. What is your current fitness level?";
    } else if (query.includes('muscle') || query.includes('gain') || query.includes('hypertrophy')) {
      reply = "To build muscle, focus on **progressive overload** (gradually increasing weights or reps) and consume a slight **caloric surplus** (200-500 kcal above maintenance) with about 1.6 to 2.2g of protein per kg of bodyweight. Rest 48 hours between training the same muscle group!";
    } else if (query.includes('lose') || query.includes('fat') || query.includes('weight')) {
      reply = "Fat loss requires a consistent **caloric deficit** (consuming fewer calories than you burn). Combine high-intensity strength training to preserve muscle with moderate cardio, and make sure your protein intake is high to maintain satiety. Let's estimate your daily calorie target!";
    } else {
      reply = `Thank you for asking! As your Smart Coach, I suggest focusing on consistency. For "${prompt}", here's a quick tip: keep tracking your progress daily, aim for 7-8 hours of sleep, and make sure you're progressively challenging your body. Let me know if you want me to write a custom plan for you!`;
    }

    // Simulate network delay of 1.2s to match typing indicator
    return new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next(reply);
        observer.complete();
      }, 1200);
    });
  }
}
