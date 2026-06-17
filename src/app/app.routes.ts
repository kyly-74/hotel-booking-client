import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { HomeComponent } from './features/home/home.component';

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
  {
    path: '**',
    redirectTo: ''
  }
];
