import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SIMULACION_ROUTES } from './simulacion.routes';
import { SimulacionComponent } from './simulacion.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SIMULACION_ROUTES),
        SimulacionComponent
    ]
})

export class SimulacionModule {}