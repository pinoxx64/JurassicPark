import { Component, OnInit } from '@angular/core';
import { CabeceraComponent } from "../../component/cabecera/cabecera.component";

@Component({
  selector: 'app-inicio',
  imports: [CabeceraComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  name: string = '';

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      this.name = usuario.name;
    } 
  }
}
