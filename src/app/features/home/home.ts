import { Component } from '@angular/core';
import { AboutUsSummary } from '../../shared/components/about-us-summary/about-us-summary';
import { Hero } from './components/hero/hero';
import { Workouts } from '../../shared/components/workouts/workouts';
import { WhyUs } from './components/why-us/why-us';
import { HealthySection } from '../../shared/components/healthy-section/healthy-section';

@Component({
  selector: 'app-home',
  imports: [Hero, Workouts, AboutUsSummary, WhyUs, HealthySection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
