import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class Auth {

  // Biến dùng chung để Navbar biết người dùng đã đăng nhập chưa nhằm thay đổi giao diện
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // ─── Đăng ký ──────────────────────────────────────────────────────

  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  // ─── Đăng nhập bằng email/password ───────────────────────────────

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  // ─── Đăng nhập bằng Google ───────────────────────────────────────
  // Gửi idToken Google nhận được lên API backend để verify

  loginWithGoogle(idToken: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/google-login`, {
      IdToken: idToken   // ← chữ I hoa
    });
  }

  // ─── Lưu token khi đăng nhập thành công (cả thường & Google) ─────

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedInSubject.next(true);  // Phát tín hiệu đã đăng nhập
    this.router.navigate(['/']);       // Điều hướng về trang chủ
  }

  // ─── Đăng xuất ────────────────────────────────────────────────────

  logout() {
    localStorage.removeItem('token');

    // Đăng xuất Google SDK nếu user đang dùng Google
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect(); // tắt auto-select Google
    }

    this.loggedInSubject.next(false); // Phát tín hiệu đã đăng xuất
    this.router.navigate(['/auth/login']); // Đá về trang login
  }
}