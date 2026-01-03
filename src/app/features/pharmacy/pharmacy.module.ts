import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { MedicineFormComponent } from './medicine-form/medicine-form.component';
import { PharmacySaleComponent } from './pharmacy-sale/pharmacy-sale.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: MedicineListComponent, canActivate: [AuthGuard] },
  { path: 'medicines/new', component: MedicineFormComponent, canActivate: [AuthGuard] },
  { path: 'medicines/edit/:id', component: MedicineFormComponent, canActivate: [AuthGuard] },
  { path: 'sale', component: PharmacySaleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MedicineListComponent,
    MedicineFormComponent,
    PharmacySaleComponent
  ]
})
export class PharmacyModule {}
