import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { SignupRequest, SignupResponse } from '../register/register.interface';
import { SigninRequest } from '../login/login.interface';
import { ActivityLevelsResponse } from '../onboarding/onboarding.interface';
import { ForgotPasswordRequest } from '../forgot-password/forgot-password.interface';
import { VerifyResetCodeRequest } from '../otp/otp.interface';
import { ResetPasswordRequest } from '../reset-password/reset-password.interface';
import { ChangePasswordRequest, ChangePasswordResponse } from '../../profile/components/change-password-modal/change-password-modal.interface';

import { AuthApiResponse } from './auth-api-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly baseUrl = environment.baseUrl;

  signup(data: SignupRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}auth/signup`, data);
  }

  signin(data: SigninRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}auth/signin`, data);
  }

  getActivityLevels(): Observable<ActivityLevelsResponse> {
    return this.http.get<ActivityLevelsResponse>(`${this.baseUrl}levels`);
  }

  logout(): Observable<unknown> {
    return this.http.get(`${this.baseUrl}auth/logout`);
  }

  forgotPassword(email: string): Observable<AuthApiResponse> {
    const body: ForgotPasswordRequest = { email };
    return this.http.post<AuthApiResponse>(`${this.baseUrl}auth/forgotPassword`, body);
  }

  verifyResetCode(resetCode: string): Observable<AuthApiResponse> {
    const body: VerifyResetCodeRequest = { resetCode };
    return this.http.post<AuthApiResponse>(`${this.baseUrl}auth/verifyResetCode`, body);
  }

  resetPassword(email: string, newPassword: string): Observable<AuthApiResponse> {
    const body: ResetPasswordRequest = { email, newPassword };
    return this.http.put<AuthApiResponse>(`${this.baseUrl}auth/resetPassword`, body);
  }

  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    const token = this.tokenService.getToken();
    const headers = token ? new HttpHeaders({ token }) : undefined;
    return this.http.patch<ChangePasswordResponse>(`${this.baseUrl}auth/change-password`, data, {
      headers,
    });
  }
}
