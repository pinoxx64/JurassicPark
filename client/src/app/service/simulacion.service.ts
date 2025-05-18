import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Simulacion } from '../interface/simulacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulacionService {

  constructor(private http: HttpClient) {}

  getSimulacionNormal(tiempo: number): Observable<Simulacion> {
    return this.http.post<Simulacion>(`${environment.simulacionUrl}`, { tiempo });
  }
}
