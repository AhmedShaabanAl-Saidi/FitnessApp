import { Component } from '@angular/core';
import { Workouts } from '../../shared/components/workouts/workouts';

@Component({
  selector: 'app-classes',
  imports: [Workouts],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class Classes {}
