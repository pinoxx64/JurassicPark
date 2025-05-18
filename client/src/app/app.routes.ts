import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { GestionUserComponent } from './pages/gestion-user/gestion-user.component';
import { SimulacionComponent } from './pages/simulacion/simulacion.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'gestionUser', component: GestionUserComponent},
    { path: 'simulacion', component: SimulacionComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
