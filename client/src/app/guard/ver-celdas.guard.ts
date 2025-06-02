import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class verCeldasGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = sessionStorage.getItem('user');
    if (user) {
      const usuario = JSON.parse(user);
      if (usuario.user.roles && usuario.user.roles.includes('Administrador') || usuario.user.roles && usuario.user.roles.includes('Veterinario') || usuario.user.roles && usuario.user.roles.includes('Mantenimiento')) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}