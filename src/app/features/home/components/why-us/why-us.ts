import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-why-us',
  imports: [TranslatePipe],
  templateUrl: './why-us.html',
  styleUrl: './why-us.css',
})
export class WhyUs {
  benefits = [
    {
      number: '01',
      titleKey: 'WHY_US.BENEFITS.BENEFIT_1.TITLE',
      descKey: 'WHY_US.BENEFITS.BENEFIT_1.DESC',
    },
    {
      number: '02',
      titleKey: 'WHY_US.BENEFITS.BENEFIT_2.TITLE',
      descKey: 'WHY_US.BENEFITS.BENEFIT_2.DESC',
    },
    {
      number: '03',
      titleKey: 'WHY_US.BENEFITS.BENEFIT_3.TITLE',
      descKey: 'WHY_US.BENEFITS.BENEFIT_3.DESC',
    },
  ];
}
