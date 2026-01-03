import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: PatientListComponent, canActivate: [AuthGuard] },
  { path: 'new', component: PatientFormComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: PatientFormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PatientListComponent,
    PatientFormComponent
  ]
})
export class PatientModule {}
