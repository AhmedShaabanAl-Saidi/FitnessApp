import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MarqueeTricker } from "../../../../shared/components/marquee-tricker/marquee-tricker";

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MarqueeTricker],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  content = {

    description: [
      'Push harder, go Further.',
      'Your fitness journey starts today!',
    ],

    contact: {
      title: 'CONTACT US',
      phone: '+91 123 456 789',
      email: 'info@gmail.com',
    },

    timing: {
      title: 'OUR GYM TIMING',
      items: [
        {
          day: 'Mon - Fri',
          time: '08:00 AM - 10:00 PM',
        },
        {
          day: 'Sat - Sun',
          time: '08:00 AM - 09:00 PM',
        },
      ],
    },

    location: {
      title: 'OUR LOCATION',
      address: [
        '2715 Ash Dr.',
        'San Jose,',
        'South Dakota 83475',
      ],
    },

  };

}
