import { Routes } from '@angular/router';
// Import cả 2 component Đăng nhập và Đăng ký (bạn kiểm tra lại đường dẫn chính xác trong dự án nhé)
import { Login } from './features/auth/login/login'; 
import { Register } from './features/auth/register/register'; 

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Login
  },
  {
    path: 'auth/register',
    component: Register // <-- Bắt buộc phải khai báo đường dẫn này thì routerLink mới chạy được
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/login' // Tất cả các đường dẫn lạ (bao gồm cả lỗi gõ sai) sẽ bị đá về login
  }
];