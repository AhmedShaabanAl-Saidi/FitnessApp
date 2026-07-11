import { Component } from '@angular/core';
import { AboutUsSummary } from '../../shared/components/about-us-summary/about-us-summary';

@Component({
  selector: 'app-about-us',
  imports: [AboutUsSummary],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {}
