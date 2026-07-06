import { Component, signal } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { MarqueeTricker } from '../../../../shared/components/marquee-tricker/marquee-tricker';

@Component({
  selector: 'app-hero',
  imports: [Button, MarqueeTricker],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  content = {
    title: {
      before: 'Your body can',
      highlight1: 'stand',
      highlight2: 'almost',
      after: 'anything',
    },

    description:
      "It's your mind that needs convincing. Push past your limits, stay committed, and watch as your body transform into powerhouse of strength and resilience. Start your journey today & truly capable of!",

    stats: [
      {
        value: '1200+',
        label: 'Active Members',
      },
      {
        value: '12+',
        label: 'Certified Trainers',
      },
      {
        value: '20+',
        label: 'Years Of Experience',
      },
    ],

    buttons: {
      primary: 'Get Started',
      secondary: 'Explore More',
    },
  };
}
