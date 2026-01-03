import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage = '';
  loading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 login(): void {
  if (this.loginForm.invalid) {
    console.log('❌ Form invalid', this.loginForm.value);
    return;
  }
   this.loading = true;

  console.log('✅ Calling backend login API');

  this.authService.login(this.loginForm.value).subscribe({
    next: () => {
      this.loading = false;
      console.log('✅ Login success');
      this.router.navigate(['/admin/users']);
    },
    error: err => {
      this.loading = false;
      console.error('❌ Backend error', err);
      this.errorMessage = err?.error?.message || 'Invalid username or password';
    }
  });
}

}
