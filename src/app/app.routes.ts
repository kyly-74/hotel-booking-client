import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component')
        .then(m => m.HomeComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-result/search-result')
        .then(m => m.SearchResultComponent)
  },

{
  path: 'hotel/:id',
  loadComponent: () =>
    import('./features/hotels/hotel-detail/hotel-detail')
      .then(m => m.HotelDetailComponent)
},
  {
    path: 'payment/success',
    loadComponent: () =>
      import('./features/payment/payment-result/payment-result')
        .then(m => m.PaymentResult)
  },
  {
    path: 'payment/failed',
    loadComponent: () =>
      import('./features/payment/payment-result/payment-result')
        .then(m => m.PaymentResult)
  },
  {
    path: 'test-payment',
    loadComponent: () =>
      import('./features/payment/checkoutpayment/checkoutpayment')
        .then(m => m.Checkoutpayment)
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth/login'
  // },
  {
  path: 'checkout',
  loadComponent: () =>
    import('./pages/checkout/checkout')
      .then(m => m.CheckoutComponent)
},
];