import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class CabeceraComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      console.log(usuario);
      this.isAdmin = usuario.user.roles.includes('Administrador');
      console.log(this.isAdmin);
    }
  }

  inicio() {
    this.router.navigate(['/inicio']);
  }

  gestionUser() {
    this.router.navigate(['/gestionUser']);
  }

  simulacion() {
    this.router.navigate(['/simulacion']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}