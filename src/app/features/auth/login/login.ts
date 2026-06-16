import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { RouterModule } from '@angular/router';
declare var google: any; // Khai báo biến toàn cục để dùng script index.html

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: Auth,
    private http: HttpClient,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    // Sửa lỗi SSR: Chỉ vẽ nút bấm nếu đang chạy ở trình duyệt của khách
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleAuth();
    }
  }
  get f() { return this.loginForm.controls; }


  private initializeGoogleAuth() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: this.handleCredentialResponse.bind(this)
      });

      // Tự động render nút bấm Google chính chủ vào thẻ div#googleBtn
      google.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
    }
  }

  private handleCredentialResponse(response: any) {
    if (!response.credential) {
      alert('Không nhận được token từ Google!');
    return;
      }
      // Gửi token sang backend của bạn xử lý
      this.authService.loginWithGoogle(response.credential)
        .subscribe({
          next: (res: any) => this.authService.saveToken(res.token),
          error: (err) => alert('Đăng nhập Google thất bại!')
        });
    
  }

  onLogin() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => this.authService.saveToken(res.token),
      error: (err: any) => alert('Sai tài khoản hoặc mật khẩu!')
    });
  }
}