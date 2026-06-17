import { Routes } from '@angular/router';

import { RoomListComponent } from './features/hotelmanager/rooms/room-list/room-list';
import { RoomCreateComponent } from './features/hotelmanager/rooms/room-create/room-create';
import { RoomEditComponent } from './features/hotelmanager/rooms/room-edit/room-edit';
import { RoomDetailComponent } from './features/hotelmanager/rooms/room-detail/room-detail';
import { RoomTypeList } from './features/hotelmanager/roomstype/roomstype-list/roomstype-list';
import { RoomTypeCreateComponent } from './features/hotelmanager/roomstype/roomstype-create/roomstype-create';
import { ReviewDashboardComponent } from './features/hotelmanager/review/review-dashboard/review-dashboard';
import { ReviewListComponent } from './features/hotelmanager/review/review-list/review-list';
import { ReviewFormComponent } from './features/hotelmanager/review/review-form/review-form';

//---------------ADMIN---------------
import { adminGuard } from './core/guards/admin-guard';
import { Users } from './features/admin/users/users';
import { Hotels } from './features/admin/hotels/hotels';
import { Revenue } from './features/admin/revenue/revenue';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },

  { path: 'auth/login', loadComponent: () => import('./features/auth/login/login').then(m => m.Login) },
  { path: 'auth/register', loadComponent: () => import('./features/auth/register/register').then(m => m.Register) },

  { path: 'search', loadComponent: () => import('./pages/search-result/search-result').then(m => m.SearchResultComponent) },
  { path: 'hotel/:id', loadComponent: () => import('./features/hotels/hotel-detail/hotel-detail').then(m => m.HotelDetailComponent) },

  { path: 'payment/success', loadComponent: () => import('./features/payment/payment-result/payment-result').then(m => m.PaymentResult) },
  { path: 'payment/failed', loadComponent: () => import('./features/payment/payment-result/payment-result').then(m => m.PaymentResult) },
  { path: 'test-payment', loadComponent: () => import('./features/payment/checkoutpayment/checkoutpayment').then(m => m.Checkoutpayment) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent) },

  // Hotel Manager
  { path: 'hotelmanager/rooms', component: RoomListComponent },
  { path: 'hotelmanager/rooms/create', component: RoomCreateComponent },
  { path: 'hotelmanager/rooms/edit/:id', component: RoomEditComponent },
  { path: 'hotelmanager/rooms/detail/:id', component: RoomDetailComponent },

  { path: 'hotelmanager/roomstype', component: RoomTypeList },
  { path: 'hotelmanager/roomstype/create', component: RoomTypeCreateComponent },

  { path: 'hotelmanager/reviews/list/:hotelId', component: ReviewListComponent },
  { path: 'hotelmanager/reviews/form', component: ReviewFormComponent },
  { path: 'hotelmanager/reviews/dashboard', component: ReviewDashboardComponent },

  // Admin
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'users', component: Users },
      { path: 'hotels', component: Hotels },
      { path: 'revenue', component: Revenue }
    ]
  },

  // Catch-all
  { path: '**', redirectTo: 'auth/login' }
];
