import { User, UserResponse } from './../interface/user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(body: any): Observable<UserResponse> {
    console.log(body)
    return this.http.post<UserResponse>(`${environment.userUrl}/login`, body)
  }

  getUsers(): Observable<User[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    console.log(headers)
    return this.http.get<{ users: User[] }>(`${environment.userUrl}/`, { headers }).pipe(
      map(response => response.users || [])
    );
  }

  putUser(user: User): Observable<HttpResponse<User>> {
    console.log(user)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.put<User>(`${environment.userUrl}/${user.id}`, user, { headers, observe: 'response' });
  }

  softDeleteUser(id: number): Observable<HttpResponse<any>> {
    console.log(id)
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.delete<any>(`${environment.userUrl}/${id}`, { headers, observe: 'response' })
  }

  activateUser(id: number): Observable<HttpResponse<any>> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get<any>(`${environment.userUrl}/activate/${id}`, { headers, observe: 'response' });
  }
}
