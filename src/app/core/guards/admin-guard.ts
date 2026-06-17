import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userRole = decoded['role'] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (userRole === 'Admin') {
          return true; // Cho phép vào nếu là Admin
        }
      } catch (e) {
        console.error('Guard mã hóa lỗi:', e);
      }
    }
  }

  // Nếu không phải admin, đá ngược về trang login
  router.navigate(['/auth/login']);
  return false;
};