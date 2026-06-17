import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminService } from '../../../core/services/admin.service';
import { UserDto } from '../../../shared/models/admin/user.model';
import { LockUserDto } from '../../../shared/models/admin/request.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit{
  users: UserDto[] = [];
  loading = false;

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.adminService.getUsers().subscribe({

      next: (data) => {

        this.users = data;
        this.loading = false;

        console.log(
          "AFTER SET:",
          this.users.length,
          this.loading
        );

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
        this.loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  toggleLock(user: UserDto): void {

    const request: LockUserDto = {
      isLocked: !user.isLocked,
      reason: user.isLocked
        ? 'Mở khóa tài khoản'
        : 'Vi phạm chính sách'
    };

    this.adminService
      .lockUser(user.id, request)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.loadUsers();

        },

        error: (err) => {
          console.error(err);
        }

      });

  }
}