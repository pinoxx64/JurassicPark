import { Component } from '@angular/core';
import { SimulacionService } from '../service/simulacion.service';
import { Simulacion, IteracionSimulacion, InformeCelda } from '../interface/simulacion';
import { CabeceraComponent } from "../cabecera/cabecera.component";
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-simulacion',
  templateUrl: './simulacion.component.html',
  styleUrls: ['./simulacion.component.css'],
  imports: [CabeceraComponent, CommonModule, TableModule, FormsModule, ButtonModule, InputNumberModule, ToastModule],
  providers: [ConfirmationService, MessageService]
})
export class SimulacionComponent {
  tiempo: number = 1;
  simulacion?: Simulacion;
  iteraciones: IteracionSimulacion[] = [];
  iteracionActual: number = 0;
  mostrando: boolean = false;
  timer: any = null;
  loading: boolean = false;
  iteracionesMostradas: IteracionSimulacion[] = [];

  constructor(private simulacionService: SimulacionService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  iniciarSimulacion() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.loading = true;
    this.iteracionesMostradas = [];
    this.simulacionService.getSimulacionNormal(this.tiempo).subscribe({
      next: (res) => {
        this.simulacion = res;
        this.iteraciones = res.informes;
        this.iteracionActual = 0;
        this.mostrando = true;
        this.loading = false;
        this.mostrarIteraciones();
      },
      error: () => {
        this.loading = false;
        this.mostrando = false;
      }
    });
  }

  mostrarIteraciones() {
    if (!this.iteraciones.length) return;
    this.iteracionActual = 0;
    this.iteracionesMostradas = [];
    this.iteracionesMostradas.push(this.iteraciones[0]);
    this.iteracionActual = 1;
    this.timer = setInterval(() => {
      if (this.iteracionActual < this.iteraciones.length) {
        const iter = this.iteraciones[this.iteracionActual];
        this.iteracionesMostradas.push(iter);

        iter.informe.forEach(row => {
          if (row.brecha) {
            this.messageService.add({
              severity: 'warn',
              summary: '¡Brecha de Seguridad!',
              detail: `En la celda ${row.celda} se ha escapado el dinosaurio ${row.dinoEscapado}.`
            });
          }
        });

        this.iteracionActual++;
      } else {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 5000);
  }
}