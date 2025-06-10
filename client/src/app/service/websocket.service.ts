import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.websocketUrl);
  }

  onBrecha(): Observable<{ celda: number, dinoEscapado: string }> {
    return new Observable(observer => {
      this.socket.on('brecha', (data) => observer.next(data));
      return () => this.socket.off('brecha');
    });
  }
}