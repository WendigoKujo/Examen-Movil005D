import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [

      {
        path: 'administrador/:id',
        loadChildren: () => import('../administrador/administrador.module').then( m => m.AdministradorPageModule)
      },
      {
        path: 'alumno/:id',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'profesor/:id',
        loadChildren: () => import('../profesor/profesor.module').then( m => m.ProfesorPageModule)
      },
      {
        path: 'admin-asignaturas/:id',
        loadChildren: () => import('../admin-asignaturas/admin-asignaturas.module').then( m => m.AdminAsignaturasPageModule)
      },
      {
        path: 'qr/:id',
        loadChildren: () => import('../qr/qr.module').then( m => m.QrPageModule)
      },
      {
        path: 'asistencia/:id',
        loadChildren: () => import('../asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
