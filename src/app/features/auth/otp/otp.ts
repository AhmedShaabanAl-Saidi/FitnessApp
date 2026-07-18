import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-otp',
  imports: [FormsModule, RouterLink, Button, Input],
  templateUrl: './otp.html',
})
export class Otp {
  protected readonly code = '4444';
}
