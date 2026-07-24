import { Component } from '@angular/core';
import { HealthySection } from '../../shared/components/healthy-section/healthy-section';

@Component({
  selector: 'app-healthy',
  imports: [HealthySection],
  templateUrl: './healthy.html',
  styleUrl: './healthy.css',
})
export class Healthy {}
