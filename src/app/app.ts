import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { WhyChooseUs } from './why-choose-us/why-choose-us';
import { Footer } from './footer/footer';
import { HealthyLifestyle } from './healthy/healthy-lifestyle';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, WhyChooseUs, Footer, HealthyLifestyle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('FitnessApp');
}
