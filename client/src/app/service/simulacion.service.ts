import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Simulacion, SimulacionBrechaResponse } from '../interface/simulacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {

  constructor(private http: HttpClient) { }

  getSimulacionNormal(tiempo: number): Observable<Simulacion> {
    const token = sessionStorage.getItem('token');
    console.log(token)
    const headers = new HttpHeaders().set('token', token || '');
    console.log(headers)
    return this.http.post<Simulacion>(`${environment.simulacionUrl}`, { tiempo }, { headers });
  }

  getSimulacionBrecha(celdaId: number): Observable<SimulacionBrechaResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.post<SimulacionBrechaResponse>(`${environment.simulacionUrl}/brecha`, { celdaId }, { headers });
  }
}
