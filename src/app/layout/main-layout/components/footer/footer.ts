import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Mail, PhoneCall } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly phoneIcon = PhoneCall;
  readonly mailIcon = Mail;
}
