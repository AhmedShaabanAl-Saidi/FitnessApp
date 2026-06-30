import { AboutUs } from './components/about-us/about-us';
import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Workouts } from './components/workouts/workouts';

@Component({
  selector: 'app-home',
  imports: [Hero, AboutUs, Workouts],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
