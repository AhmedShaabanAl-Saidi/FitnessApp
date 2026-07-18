import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { Input } from '../../../shared/components/input/input';
import { AuthSocialLogin } from '../components/auth-social-login/auth-social-login';

@Component({
  selector: 'app-login',
  imports: [RouterLink, Button, Input, AuthSocialLogin],
  templateUrl: './login.html',
})
export class Login { }
