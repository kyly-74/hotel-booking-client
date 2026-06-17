import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login'; 
import { Register } from './features/auth/register/register'; 
import { PaymentResult } from './features/payment/payment-result/payment-result';
import { Checkoutpayment } from './features/payment/checkoutpayment/checkoutpayment';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: Login
  },
  {
    path: 'auth/register',
    component: Register 
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  //  ĐƯA CÁC ĐƯỜNG DẪN THANH TOÁN LÊN TRÊN `**`
  { path: 'payment/success', component: PaymentResult },
  { path: 'payment/failed',  component: PaymentResult },
  { path: 'test-payment', component: Checkoutpayment },

  // 🔽 LUÔN LUÔN ĐỂ ROUTE '**' Ở DÒNG CUỐI CÙNG CỦA MẢNG
  {
    path: '**',
    redirectTo: 'auth/login' 
  }
];