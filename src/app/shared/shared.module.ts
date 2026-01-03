import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HasRoleDirective } from './page-header/has-role.directive';

@NgModule({
  imports: [
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent,
    TruncatePipe,
    HasRoleDirective
  ],
  exports: [
    ConfirmDialogComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent,
    TruncatePipe,
    HasRoleDirective
  ]
})
export class SharedModule {}
