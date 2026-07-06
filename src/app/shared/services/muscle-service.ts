import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject, Service } from '@angular/core';
import {
  MuscleAPIResponse,
  MuscleGroupByIdResponse,
  MuscleGroupResponse,
} from '../interfaces/muscles';
import { Observable } from 'rxjs';

@Service()
export class MuscleService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);
  getMuscleGroups(): Observable<MuscleGroupResponse> {
    return this.httpClient.get<MuscleGroupResponse>(`${this.baseUrl}muscles`);
  }
  getMuscleFullBody(): Observable<MuscleAPIResponse> {
    return this.httpClient.get<MuscleAPIResponse>(`${this.baseUrl}muscles/random`);
  }
  getMuscleById(id: string): Observable<MuscleGroupByIdResponse> {
    return this.httpClient.get<MuscleGroupByIdResponse>(`${this.baseUrl}musclesGroup/${id}`);
  }
}
