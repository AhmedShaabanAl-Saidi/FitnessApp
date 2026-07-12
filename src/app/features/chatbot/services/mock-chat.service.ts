import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { ChatService } from './chat-service';
import { ChatMessage } from '../interfaces/chat.interface';

@Injectable({
  providedIn: 'root',
})
export class MockChatService implements ChatService {
  sendMessage(prompt: string, history: ChatMessage[]): Observable<string> {
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

    // Split mock reply into chunks of words/sentences to simulate real streaming!
    const words = reply.split(' ');
    return new Observable<string>((observer) => {
      let currentText = '';
      let i = 0;
      
      const interval = setInterval(() => {
        if (i < words.length) {
          currentText += (i === 0 ? '' : ' ') + words[i];
          observer.next(currentText);
          i++;
        } else {
          clearInterval(interval);
          observer.complete();
        }
      }, 50); // Emit a word every 50ms
      
      return () => clearInterval(interval);
    });
  }
}
