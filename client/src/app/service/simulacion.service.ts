import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Simulacion, SimulacionBrechaResponse } from '../interface/simulacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {

  constructor(private http: HttpClient) {}

  getSimulacionNormal(tiempo: number): Observable<Simulacion> {
    return this.http.post<Simulacion>(`${environment.simulacionUrl}`, { tiempo });
  }

  getSimulacionBrecha(celdaId: number): Observable<SimulacionBrechaResponse> {
    return this.http.post<SimulacionBrechaResponse>(`${environment.simulacionUrl}/brecha`, { celdaId });
  }
}
