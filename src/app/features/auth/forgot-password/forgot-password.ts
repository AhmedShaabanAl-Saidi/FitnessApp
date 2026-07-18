import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, Button, Input],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword { }
