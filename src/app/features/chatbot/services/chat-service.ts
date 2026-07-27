import { Observable } from 'rxjs';
import { ChatMessage } from '../interfaces/chat.interface';

export abstract class ChatService {
  abstract sendMessage(prompt: string, history: ChatMessage[]): Observable<string>;
}
