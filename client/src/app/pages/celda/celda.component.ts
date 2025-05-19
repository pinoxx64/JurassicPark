import { SimulacionService } from './../../service/simulacion.service';
import { Component, OnInit } from '@angular/core';
import { CeldaService } from '../../service/celda.service';
import { Celda } from '../../interface/celda';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CabeceraComponent } from "../../component/cabecera/cabecera.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-celda',
  providers: [MessageService],
  templateUrl: './celda.component.html',
  styleUrl: './celda.component.css',
  imports: [
    CommonModule,
    ToastModule,
    TableModule,
    CabeceraComponent,
    ButtonModule
],
})
export class CeldaComponent implements OnInit {
  celdas: Celda[] = []
  loading = false
  resultadoBrecha: any = null;

  constructor(
    private celdaService: CeldaService,
    private simulacionService: SimulacionService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.obtenerCeldas();
  }

  obtenerCeldas() {
    this.loading = true;
    this.celdaService.getCeldas().subscribe({
      next: (data) => {
        this.celdas = data.celdas;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las celdas'
        });
      }
    });
  }

ejecutarBrecha(celdaId: number) {
  this.loading = true;
  this.simulacionService.getSimulacionBrecha(celdaId).subscribe({
    next: (res) => {
      this.loading = false;
      this.resultadoBrecha = res.informes;
      this.messageService.add({
        severity: this.resultadoBrecha.fuga ? 'error' : 'success',
        summary: `Celda ${this.resultadoBrecha.celda}`,
        detail: Array.isArray(this.resultadoBrecha.efectos)
          ? this.resultadoBrecha.efectos.join(' ')
          : this.resultadoBrecha.efectos
      });
    },
    error: (err) => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: err.error?.message || 'No se pudo simular la brecha'
      });
    }
  });
}
}
