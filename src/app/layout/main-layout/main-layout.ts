import { Component } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { FloatingControls } from './components/floating-controls/floating-controls';

@Component({
  selector: 'app-main-layout',
  imports: [NavBar, RouterOutlet, Footer, FloatingControls],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
