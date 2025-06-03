import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CeldaResponse, Celda, Dinosaurio } from '../interface/celda';

@Injectable({
  providedIn: 'root'
})
export class CeldaService {

  constructor(private http: HttpClient) { }

  getCeldas(): Observable<CeldaResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    console.log(headers)
    return this.http.get<CeldaResponse>(`${environment.celdaUrl}`, { headers });
  }

  putCeldas(celda: Celda): Observable<CeldaResponse> {
    console.log(celda.id, celda)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<CeldaResponse>(`${environment.celdaUrl}/${celda.id}`, celda, { headers });
  }

  getDinosauriosDisponibles() {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<Dinosaurio[]>(`${environment.celdaUrl}/dinosDisponibles`, { headers });
  }
}
