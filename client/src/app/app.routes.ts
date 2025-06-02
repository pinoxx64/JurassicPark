import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './user/inicio/inicio.component';
import { GestionUserComponent } from './admin/pages/gestion-user/gestion-user.component';
import { SimulacionComponent } from './simulacion/simulacion.component';
import { CeldaComponent } from './celdas/pages/celda/celda.component';
import { AdminGuard } from './guard/admin.guard';
import { verCeldasGuard } from './guard/ver-celdas.guard';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
    { path: 'gestionUser', component: GestionUserComponent, canActivate: [AdminGuard, AuthGuard]},
    { path: 'simulacion', component: SimulacionComponent, canActivate: [AuthGuard]},
    { path: 'celdas', component: CeldaComponent, canActivate: [verCeldasGuard, AuthGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];
