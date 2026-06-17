import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RoomType } from '../../shared/models/roomtype.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private http = inject(HttpClient);
  // Sử dụng biến môi trường thay vì cứng mã URL
  private readonly baseUrl = `${environment.apiUrl}/RoomTypes`;

  // 1. Lấy toàn bộ danh sách
  getAll(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.baseUrl);
  }

  // 2. Lấy chi tiết theo ID
  getById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(`${this.baseUrl}/${id}`);
  }

  // 3. Tạo mới (Dữ liệu thường)
  create(roomType: RoomType): Observable<RoomType> {
    return this.http.post<RoomType>(this.baseUrl, roomType);
  }

  // 4. Tạo mới (Có kèm ảnh - FormData)
  createWithImage(formData: FormData): Observable<RoomType> {
    return this.http.post<RoomType>(this.baseUrl, formData);
  }

  // 5. Cập nhật (Dữ liệu thường)
  update(id: number, roomType: RoomType): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, roomType);
  }

  // 6. Cập nhật (Có kèm ảnh - FormData)
  updateWithImage(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, formData);
  }

  // 7. Xóa
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}