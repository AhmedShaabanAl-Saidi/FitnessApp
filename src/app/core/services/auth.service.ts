import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ActivityLevelsResponse, SigninRequest, SignupRequest, SignupResponse } from '../../shared/interfaces/auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
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
}