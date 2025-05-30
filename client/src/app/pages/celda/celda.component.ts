import { Component, OnInit } from '@angular/core';
import { CeldaService } from '../../service/celda.service';
import { SimulacionService } from '../../service/simulacion.service';
import { Celda, CeldaM } from '../../interface/celda';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CabeceraComponent } from "../../component/cabecera/cabecera.component";
import { CeldaDetalleComponent } from "../../component/celda-detalle/celda-detalle.component";
import { BrechaResultadoComponent } from "../../component/brecha-resultado/brecha-resultado.component";

@Component({
  selector: 'app-celda',
  providers: [MessageService, ConfirmationService],
  templateUrl: './celda.component.html',
  styleUrl: './celda.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    CardModule,
    ButtonModule,
    ConfirmPopupModule,
    CabeceraComponent,
    CeldaDetalleComponent,
    BrechaResultadoComponent
  ],
})
export class CeldaComponent implements OnInit {
  celdas: Celda[] = [];
  loading = false;

  resultadoBrecha: any = null;
  mostrarDialogoBrecha = false;

  celdaSeleccionada: CeldaM | null = null;
  mostrarDialogo = false;

  isAdmin: boolean = false;
  isVeterinario: boolean = false
  isMantenimiento: boolean = false

  constructor(
    private celdaService: CeldaService,
    private simulacionService: SimulacionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.obtenerCeldas();

    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      this.isAdmin = usuario.user.roles.includes('Administrador');
      this.isVeterinario = usuario.user.roles.includes('Veterinario')
      this.isMantenimiento = usuario.user.roles.includes('Mantenimiento');
    }
  }

  obtenerCeldas() {
    this.loading = true;
    this.celdaService.getCeldas().subscribe({
      next: (data) => {
        console.log(data)
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

  rellenarComedero(celda: Celda) {
    this.loading = true;
    const celdaMod = {
      id: celda.id,
      nivelPeligrosidad: celda.nivelPeligrosidad,
      cantidadAlimento: 100,
      averias: celda.averias,
      nivelSeguridad: celda.nivelSeguridad
    };
    this.celdaService.putCeldas(celdaMod).subscribe({
      next: (data) => {
        if (data?.celda) {
          const id = this.celdas.findIndex(c => c.id === celda.id);
          if (id !== -1) this.celdas[id] = data.celda;
        }
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Comedero rellenado',
          detail: `La celda ${celda.id} ha sido actualizada.`
        });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo rellenar el comedero'
        });
      }
    });
  }

  repararAveria(celda: Celda) {
    this.loading = true;
    const celdaMod = {
      id: celda.id,
      nivelPeligrosidad: celda.nivelPeligrosidad,
      cantidadAlimento: celda.cantidadAlimento,
      averias: 0,
      nivelSeguridad: celda.nivelSeguridad
    };
    this.celdaService.putCeldas(celdaMod).subscribe({
      next: (data) => {
        if (data?.celda) {
          const id = this.celdas.findIndex(c => c.id === celda.id);
          if (id !== -1) this.celdas[id] = data.celda;
        }
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Averías reparadas',
          detail: `La celda ${celda.id} ha sido actualizada.`
        });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo reparar la avería'
        });
      }
    });
  }

  confirmarBrecha(event: Event, celdaId: number) {
    this.confirmationService.confirm({
      target: event.target as HTMLElement,
      message: '¿Seguro que quieres simular una brecha en esta celda?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => this.ejecutarBrecha(celdaId)
    });
  }

  ejecutarBrecha(celdaId: number) {
    this.loading = true;
    this.simulacionService.getSimulacionBrecha(celdaId).subscribe({
      next: (res) => {
        this.loading = false;
        this.resultadoBrecha = res.informes;
        this.mostrarDialogoBrecha = true;
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

  cerrarDialogoBrecha = () => {
    this.mostrarDialogoBrecha = false;
    this.resultadoBrecha = null;
  };

  verDetalles(celda: Celda) {
    this.celdaSeleccionada = {
      ...celda,
      dinosaurios: (celda as any).dinosaurios ?? []
    };
    this.mostrarDialogo = true;
  }

  cerrarDialogo = () => {
    this.mostrarDialogo = false;
    this.celdaSeleccionada = null;
  };
}