import { Component } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from '../../features/chatbot/components/chatbot/chatbot';

@Component({
  selector: 'app-main-layout',
  imports: [NavBar, RouterOutlet, ChatbotComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}

