import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-reset-password',
  imports: [RouterLink, Button, Input],
  templateUrl: './reset-password.html',
})
export class ResetPassword { }
