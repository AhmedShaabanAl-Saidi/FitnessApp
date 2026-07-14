import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-choose-us',
  imports: [CommonModule],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.css',
})
export class WhyChooseUs {
  content = {
    sectionTitle: 'Why Us',

    heading: 'ELEVATE FITNESS WITH THE',

    highlight: 'BEST WAY',

    headingEnd: 'POSSIBLE',

    description:
      "We offer a fitness journey that's tailored to your goals, supported by professional trainers and a welcoming community. Whether it's weight loss, strength building, or overall wellness, our proven methods.",

    benefits: [
      {
        number: '01',
        title: 'Personalized Fitness Plans',
        description:
          'We tailor every workout to fit your unique goals and fitness level ensuring that you make the most progress.',
      },
      {
        number: '02',
        title: 'Results-Driven Focus',
        description:
          "Everything we do is designed to help you achieve measurable results, whether you're aiming for weight loss.",
      },
      {
        number: '03',
        title: 'State-Of-The-Art Equipment',
        description:
          'We provide the latest in gym equipment, from cardio machines to free weights, designed to support every type.',
      },
    ],
  };
}
