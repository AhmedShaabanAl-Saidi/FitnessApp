import { Component, signal } from '@angular/core';
import { Button } from '../../../../shared/button/button';
import { MarqueeTricker } from '../../../../shared/marquee-tricker/marquee-tricker';

@Component({
  selector: 'app-hero',
  imports: [Button, MarqueeTricker],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  marqueeItems = signal<string[]>([
    'Personal Trainers',
    'Live Classes',
    'Outdoor & Online Trainers',
    'Personal Training',
  ]);
}
