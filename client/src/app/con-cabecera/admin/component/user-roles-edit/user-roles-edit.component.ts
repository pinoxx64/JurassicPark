import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-user-roles-edit',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule, ButtonModule, CheckboxModule],
  templateUrl: './user-roles-edit.component.html'
})
export class UserRolesEditComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() userRoles: string[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<string[]>();

  roles = [
    { name: 'Usuario', disabled: true },
    { name: 'Veterinario', disabled: false },
    { name: 'Mantenimiento', disabled: false },
    { name: 'Administrador', disabled: false }
  ];

  selectedRoles: string[] = [];
  checkedRoles: { [key: string]: boolean } = {};

ngOnChanges() {
  this.checkedRoles = {};
  for (const rol of this.roles) {
    this.checkedRoles[rol.name] = this.userRoles.includes(rol.name);
  }
}

  toggleRole(role: string, checked: boolean) {
    if (checked) {
      if (!this.selectedRoles.includes(role)) this.selectedRoles.push(role);
    } else {
      this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    }
  }

save() {
  this.selectedRoles = this.roles
    .filter(rol => this.checkedRoles[rol.name])
    .map(rol => rol.name);
  this.onSave.emit(this.selectedRoles);
}

  close() {
    this.onClose.emit();
  }
}