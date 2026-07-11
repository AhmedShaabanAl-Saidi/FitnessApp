import { Component } from '@angular/core';
import { AboutUsSummary } from '../../shared/components/about-us-summary/about-us-summary';
import { Hero } from './components/hero/hero';
import { Workouts } from '../../shared/components/workouts/workouts';

@Component({
  selector: 'app-home',
  imports: [Hero, Workouts, AboutUsSummary],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
