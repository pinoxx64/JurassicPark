import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user';
import { CabeceraComponent } from "../../component/cabecera/cabecera.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-gestion-user',
  imports: [
    CabeceraComponent,
    CommonModule,
    ButtonModule,
    TableModule
  ],
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css'
})
export class GestionUserComponent {
  users: User[] = []; // Lista de usuarios

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

  deleteUser(id: number) {
    console.log(`Eliminar usuario con ID: ${id}`);
  }
}
