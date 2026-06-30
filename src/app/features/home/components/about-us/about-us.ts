import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-about-us',
  imports: [Button],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  content = {
    sectionTitle: 'About Us',
    heading: 'EMPOWERING YOU TO ACHIEVE',
    highlight: 'YOUR FITNESS',
    headingEnd: 'GOALS',
    description:
      "We believe fitness is more than just a workout—it's a lifestyle. With top-of-the-line facilities, certified trainers, and a supportive community, we're here to inspire and guide you every step of the way.",
    buttonText: 'Get Started',
    features: [
      {
        title: 'Personal Trainer',
        description: 'Achieve your fitness goals with the guidance of our certified trainers.',
      },
      {
        title: 'Cardio Programs',
        description: 'From steady-state runs to interval sprints, our treadmill programs.',
      },
      {
        title: 'Quality Equipment',
        description: 'Our gym is equipped with the latest cardio & strength machines.',
      },
      {
        title: 'Healthy Nutritions',
        description: 'Fuel your fitness journey with customized meal plans for you.',
      },
    ],
  };
}
