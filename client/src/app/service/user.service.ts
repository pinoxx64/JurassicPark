import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
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
}
