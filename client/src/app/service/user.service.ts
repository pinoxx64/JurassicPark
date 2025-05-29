import { User } from './../interface/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  login(body: any): Observable<User>{
    console.log(body)
    return this.http.post<User>(`${environment.userUrl}/login`, body)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${environment.userUrl}/`).pipe(
      map(response => response.users)
    );
  }

  putUser(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${environment.userUrl}/${user.id}`, user, { observe: 'response' });
  }

  softDeleteUser(id: number): Observable<HttpResponse<any>> {
    console.log(id)
    return this.http.delete<any>(`${environment.userUrl}/${id}`)
  }

  activateUser(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${environment.userUrl}/activate/${id}`, { observe: 'response' });
  }
}
