import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { HomeComponent } from './features/home/home.component';
import { PaymentResult } from './features/payment/payment-result/payment-result';
import { Checkoutpayment } from './features/payment/checkoutpayment/checkoutpayment';

import { RoomListComponent } from './features/hotelmanager/rooms/room-list/room-list';
import { RoomCreateComponent } from './features/hotelmanager/rooms/room-create/room-create';
import { RoomEditComponent } from './features/hotelmanager/rooms/room-edit/room-edit';
import { RoomDetailComponent } from './features/hotelmanager/rooms/room-detail/room-detail';
import {  RoomTypeList } from './features/hotelmanager/roomstype/roomstype-list/roomstype-list';
import { RoomTypeCreateComponent } from './features/hotelmanager/roomstype/roomstype-create/roomstype-create';



export const routes: Routes = [

  // {
  //   path: '',
  //   component: HomeComponent
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {

  //   path: 'auth/login',
  //   component: Login
  // },

  {
    path: 'auth/register',
    component: Register
  },



 
//       // Sửa hết các path con bằng cách bỏ tiền tố 'hotelmanager/'
//       { path: 'hotelmanager/rooms', component: RoomListComponent },
//       { path: 'hotelmanager/rooms/create', component: RoomCreateComponent },
//       { path: 'hotelmanager/rooms/edit/:id', component: RoomEditComponent },
//       { path: 'hotelmanager/rooms/detail/:id', component: RoomDetailComponent },
    

// { path: 'hotelmanager/roomstype', component: RoomTypeList},
// { path: 'hotelmanager/roomstype/create', component: RoomTypeCreateComponent},



//   {
//     path: '',
//     redirectTo: 'auth/login',
//     pathMatch: 'full'
//   },
  //  ĐƯA CÁC ĐƯỜNG DẪN THANH TOÁN LÊN TRÊN `**`

  { path: 'payment/success', component: PaymentResult },
  { path: 'payment/failed', component: PaymentResult },
  { path: 'test-payment', component: Checkoutpayment },

  // Route xử lý đường dẫn không tồn tại (luôn để cuối cùng)
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];
