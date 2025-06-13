import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './con-cabecera/inicio/inicio.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { verCeldasGuard } from './guard/ver-celdas.guard';
import { ConCabeceraComponent } from './con-cabecera/con-cabecera.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: ConCabeceraComponent,
        children: [
            { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
            {
                path: 'gestionUser',
                canActivate: [AdminGuard, AuthGuard],
                loadChildren: () => import('./con-cabecera/admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: 'simulacion',
                canActivate: [AuthGuard],
                loadChildren: () => import('./con-cabecera/simulacion/simulacion.module').then(m => m.SimulacionModule)
            },
            {
                path: 'celdas',
                canActivate: [verCeldasGuard, AuthGuard],
                loadChildren: () => import('./con-cabecera/celdas/celdas.module').then(m => m.CeldasModule)
            }
        ]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];