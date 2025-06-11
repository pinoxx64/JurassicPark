import { Component, Input } from '@angular/core';
import { CeldaM } from '../../../../interface/celda';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-celda-detalle',
  imports: [
    CommonModule,
    DialogModule
  ],
  templateUrl: './celda-detalle.component.html',
  standalone: true,
  styleUrl: './celda-detalle.component.css'
})
export class CeldaDetalleComponent {
  @Input() celda!: CeldaM | null;
  @Input() visible: boolean = false;
  @Input() onClose: () => void = () => {};
}
