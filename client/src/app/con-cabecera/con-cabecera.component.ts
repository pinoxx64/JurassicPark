import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { WebsocketService } from '../service/websocket.service';
import { CabeceraComponent } from "../shared/cabecera/cabecera.component";

@Component({
  selector: 'app-con-cabecera',
  imports: [
    ToastModule,
    CabeceraComponent,
    RouterOutlet
],
  providers: [MessageService],
  templateUrl: './con-cabecera.component.html',
  styleUrl: './con-cabecera.component.css'
})
export class ConCabeceraComponent {

  constructor(
    private websocketService: WebsocketService,
    private messageService: MessageService
  ) { }

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
