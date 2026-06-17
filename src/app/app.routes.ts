import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { HomeComponent } from './features/home/home.component';
import { PaymentResult } from './features/payment/payment-result/payment-result';
import { Checkoutpayment } from './features/payment/checkoutpayment/checkoutpayment';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: Login
  },
  {
    path: 'auth/register',
    component: Register
  },
  // Các đường dẫn thanh toán
  { path: 'payment/success', component: PaymentResult },
  { path: 'payment/failed', component: PaymentResult },
  { path: 'test-payment', component: Checkoutpayment },

  // Route xử lý đường dẫn không tồn tại (luôn để cuối cùng)
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
