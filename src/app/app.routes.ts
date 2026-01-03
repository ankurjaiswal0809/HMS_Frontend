import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // 🔹 Default redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔹 Auth routes (NO layout)
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // 🔹 Protected routes (WITH layout)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
      path: 'dashboard',
      loadChildren: () =>
      import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/admin/admin.module').then(m => m.AdminModule)
      },

      {
        path: 'doctors',
        loadChildren: () =>
          import('./features/doctors/doctor.module').then(m => m.DoctorModule)
      },

      {
        path: 'patients',
        loadChildren: () =>
          import('./features/patients/patient.module').then(m => m.PatientModule)
      },

      {
        path: 'appointments',
        loadChildren: () =>
          import('./features/appointments/appointment.module').then(m => m.AppointmentModule)
      },

      {
        path: 'pharmacy',
        loadChildren: () =>
          import('./features/pharmacy/pharmacy.module').then(m => m.PharmacyModule)
      },

      {
        path: 'billing',
        loadChildren: () =>
          import('./features/billing/billing.module').then(m => m.BillingModule)
      },

      {
        path: 'discharge',
        loadChildren: () =>
          import('./features/discharge/discharge.module').then(m => m.DischargeModule)
      },

      {
        path: 'notifications',
        loadChildren: () =>
          import('./features/notifications/notifications.module')
            .then(m => m.NotificationsModule)
      }

    ]
  },

  // 🔹 Fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
