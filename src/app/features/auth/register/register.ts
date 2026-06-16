import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Auth } from '../../../core/services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Bắt buộc phải import ReactiveFormsModule
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
 registerForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    // Khởi tạo form với các điều kiện ràng buộc (Validation)
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]], // Chỉ cho phép số và độ dài 10-11
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator // Hàm tự viết để check trùng mật khẩu
    });
  }
  

  // Hàm custom kiểm tra Re-password có khớp với Password không
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Hàm mồi để lấy nhanh các trường dữ liệu bên HTML cho ngắn code
  get f() { return this.registerForm.controls; }


  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err.status === 400) {
          alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
        } else {
          alert('Đăng ký thất bại. Vui lòng thử lại sau.');
        }
      }
    });
  }
}
