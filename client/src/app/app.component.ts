import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './service/websocket.service';
import { MessageService } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Jurassic Park';

    constructor(
    private websocketService: WebsocketService,
    private messageService: MessageService
  ) {}

    ngOnInit() {
    this.websocketService.onBrecha().subscribe(data => {
      this.messageService.add({
        severity: 'warn',
        summary: '¡Brecha de Seguridad!',
        detail: `En la celda ${data.celda} se ha escapado el dinosaurio ${data.dinoEscapado}.`
      });
    });
  }
}
