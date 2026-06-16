import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(public auth: Auth) {}
  onLogout() {
    if(confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      this.auth.logout();
    }
    
  }
}
