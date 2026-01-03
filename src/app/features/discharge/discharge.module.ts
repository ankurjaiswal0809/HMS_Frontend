import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DischargeFormComponent } from './discharge-form/discharge-form.component';
import { DischargePdfComponent } from './discharge-pdf/discharge-pdf.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DischargeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pdf/:id',
    component: DischargePdfComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DischargeFormComponent,
    DischargePdfComponent
  ]
})
export class DischargeModule {}
