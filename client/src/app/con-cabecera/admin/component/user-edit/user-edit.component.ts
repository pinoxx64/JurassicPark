import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interface/user';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    DialogModule, 
    FormsModule, 
    CommonModule, 
    PasswordModule, 
    ButtonModule, 
    InputTextModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  @Input() visible: boolean = false;
  @Input() user: User | null = null;
  @Input() onClose: () => void = () => {};
  @Input() onSave: (user: Partial<User>) => void = () => {};

  email: string = '';
  password: string = '';

  ngOnChanges() {
    if (this.user) {
      this.email = this.user.email;
      this.password = '';
    }
  }

  save() {
    if (this.user) {
      this.onSave({
        id: this.user.id,
        email: this.email,
        password: this.password
      });
    }
  }
}