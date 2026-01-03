import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: AppointmentFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AppointmentFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AppointmentListComponent,
    AppointmentFormComponent
  ]
})
export class AppointmentModule {}
