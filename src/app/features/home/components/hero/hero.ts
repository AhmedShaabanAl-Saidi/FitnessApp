import { Component } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { MarqueeTricker } from '../../../../shared/components/marquee-tricker/marquee-tricker';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [Button, MarqueeTricker, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  stats = [
    { value: '1200+', labelKey: 'HERO.ACTIVE_MEMBERS' },
    { value: '12+',   labelKey: 'HERO.CERTIFIED_TRAINERS' },
    { value: '20+',   labelKey: 'HERO.YEARS_OF_EXPERIENCE' },
  ];
}
