import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SmsService } from '../../../core/services/sms.service';

@Component({
  selector: 'app-sms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  form!: FormGroup;   // ✅ ONLY declaration — NO initialization here

  constructor(
    private fb: FormBuilder,
    private smsService: SmsService
  ) {}

  ngOnInit(): void {
    // ✅ Initialize AFTER FormBuilder is injected
    this.form = this.fb.group({
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  send(): void {
    if (this.form.invalid) return;

    this.smsService.send(this.form.value).subscribe(() => {
      alert('SMS sent successfully');
      this.form.reset();
    });
  }
}
