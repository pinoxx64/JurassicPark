import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../interface/user';
import { CabeceraComponent } from "../../component/cabecera/cabecera.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-gestion-user',
  imports: [
    CabeceraComponent,
    CommonModule,
    ButtonModule,
    TableModule,
    ConfirmPopupModule
  ],
  providers: [ConfirmationService],
  templateUrl: './gestion-user.component.html',
  styleUrl: './gestion-user.component.css'
})
export class GestionUserComponent {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

deleteUser(event: Event, id: number) {
  this.confirmationService.confirm({
    target: event.target as HTMLElement,
    message: '¿Seguro que quieres eliminar este usuario?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.userService.softDeleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  });
}

activateUser(event: Event, id: number) {
  this.confirmationService.confirm({
    target: event.target as HTMLElement,
    message: '¿Seguro que quieres activar este usuario?',
    icon: 'pi pi-check',
    acceptLabel: 'Sí',
    rejectLabel: 'No',
    accept: () => {
      this.userService.activateUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  });
}
}
