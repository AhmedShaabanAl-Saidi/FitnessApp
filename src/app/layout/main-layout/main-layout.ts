import { Component } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { FloatingControls } from './components/floating-controls/floating-controls';
import { ChatbotComponent } from '../../features/chatbot/components/chatbot/chatbot';

@Component({
  selector: 'app-main-layout',
  imports: [NavBar, RouterOutlet, Footer, FloatingControls, ChatbotComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
