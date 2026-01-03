import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorFormComponent } from './doctor-form/doctor-form.component';

const routes: Routes = [
  { path: '', component: DoctorListComponent },
  { path: 'new', component: DoctorFormComponent },
  { path: 'edit/:id', component: DoctorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class DoctorModule {}
