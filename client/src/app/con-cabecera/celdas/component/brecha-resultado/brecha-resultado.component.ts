import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-brecha-resultado',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './brecha-resultado.component.html',
  styleUrl: './brecha-resultado.component.css'
})
export class BrechaResultadoComponent {
  @Input() resultado: any = null;
  @Input() visible: boolean = false;
  @Input() onClose: () => void = () => {};
}