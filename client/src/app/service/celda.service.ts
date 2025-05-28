import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CeldaResponse, Celda } from '../interface/celda';

@Injectable({
  providedIn: 'root'
})
export class CeldaService {

  constructor(private http: HttpClient) {}

  getCeldas(): Observable<CeldaResponse> {
    return this.http.get<CeldaResponse>(`${environment.celdaUrl}`);
  }

  putCeldas(celda: Celda): Observable<CeldaResponse> {
    console.log(celda.id, celda)
    return this.http.put<CeldaResponse>(`${environment.celdaUrl}/${celda.id}`, celda);
  }
}
