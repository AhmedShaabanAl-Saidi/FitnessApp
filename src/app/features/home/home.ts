import { AboutUs } from './components/about-us/about-us';
import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Workouts } from './components/workouts/workouts';
import { WhyChooseUs } from './components/why-choose-us/why-choose-us';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Hero, AboutUs, Workouts, WhyChooseUs, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
