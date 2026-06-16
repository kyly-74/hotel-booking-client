import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Lấy token từ két sắt localStorage ra
  const token = localStorage.getItem('token');
  // 2. Nếu có token thì clone request và thêm header Authorization vào
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Định dạng chuẩn quốc tế: Chữ Bearer + dấu cách + chuỗi Token
      }
    });
  }
  return next(req);
};
