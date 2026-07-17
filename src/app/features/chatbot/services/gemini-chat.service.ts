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
      return new Observable<string>((observer) => {
        observer.error(new Error('Gemini API key is not configured.'));
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`;

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
}
