import { Component, input } from '@angular/core';
import { Button } from '../button/button';
import { MarqueeTricker } from '../marquee-tricker/marquee-tricker';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us-summary',
  imports: [Button, MarqueeTricker, TranslatePipe],
  templateUrl: './about-us-summary.html',
  styleUrl: './about-us-summary.css',
})
export class AboutUsSummary {
  showMarquee = input<boolean>(false);

  features = [
    { titleKey: 'ABOUT_US.PERSONAL_TRAINER.TITLE', descKey: 'ABOUT_US.PERSONAL_TRAINER.DESC' },
    { titleKey: 'ABOUT_US.CARDIO_PROGRAMS.TITLE',  descKey: 'ABOUT_US.CARDIO_PROGRAMS.DESC' },
    { titleKey: 'ABOUT_US.QUALITY_EQUIPMENT.TITLE', descKey: 'ABOUT_US.QUALITY_EQUIPMENT.DESC' },
    { titleKey: 'ABOUT_US.HEALTHY_NUTRITIONS.TITLE', descKey: 'ABOUT_US.HEALTHY_NUTRITIONS.DESC' },
  ];
}
