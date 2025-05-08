import { UserService } from './../../service/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private UserService: UserService) {}

  onSubmit() {
    this.UserService.login({ email: this.email, password: this.password }).subscribe({
      next: (response: User) => {
        console.log(response);
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
