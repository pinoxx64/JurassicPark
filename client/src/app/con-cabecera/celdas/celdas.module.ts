import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CELDAS_ROUTES } from './celdas.routes';
import { CeldaComponent } from './celda/celda.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CELDAS_ROUTES),
    CeldaComponent
  ]
})
export class CeldasModule {}