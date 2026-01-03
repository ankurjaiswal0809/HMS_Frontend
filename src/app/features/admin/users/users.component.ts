import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = ['username', 'role', 'enabled', 'actions'];

  form!: FormGroup;
  editingUserId: number | null = null;

  roles = ['ADMIN', 'DOCTOR', 'STAFF', 'PHARMACIST', 'USER'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
  username: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(6)]],
  role: ['', Validators.required],
  enabled: [true]
});

    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: users => this.users = users
    });
  }

  submit(): void {
    console.log('🔥 Submit clicked', this.form.value);
    if (this.form.invalid) return;

    if (this.editingUserId !== null) {
      this.userService
        .updateStatus(this.editingUserId, this.form.value.enabled)
        .subscribe(() => this.afterSave());
    } else {
      this.userService
        .create(this.form.value)
        .subscribe(() => this.afterSave());
    }
  }

  edit(user: User): void {
    if (user.id == null) return;

    this.editingUserId = user.id;
    this.form.patchValue({
      username: user.username,
      role: user.role,
      enabled: user.enabled
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Delete this user?')) return;

    this.userService.delete(id).subscribe(() => this.loadUsers());
  }

  cancel(): void {
    this.form.reset({ enabled: true });
    this.editingUserId = null;
  }

  private afterSave(): void {
    this.cancel();
    this.loadUsers();
  }
}
