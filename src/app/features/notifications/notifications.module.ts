import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'email',
    component: EmailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sms',
    component: SmsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EmailComponent,
    SmsComponent
  ]
})
export class NotificationsModule {}
