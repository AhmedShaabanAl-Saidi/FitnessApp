import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { WhyChooseUs } from "./why-choose-us/why-choose-us";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, WhyChooseUs, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FitnessApp');

}
