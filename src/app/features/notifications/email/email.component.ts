import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { EmailService } from '../../../core/services/email.service';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  form!: FormGroup;   // ✅ declare only

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {

    // ✅ initialize AFTER injection
    this.form = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  send(): void {
    if (this.form.invalid) return;

    this.emailService.send(this.form.value)
      .subscribe(() => {
        alert('Email sent successfully');
        this.form.reset();
      });
  }
}
