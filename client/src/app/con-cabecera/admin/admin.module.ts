import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from './admin.routes';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ADMIN_ROUTES),
        GestionUserComponent
    ]
})

export class AdminModule { }
