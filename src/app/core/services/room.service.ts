import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
// Bạn có thể import các Interface DTO vào đây nếu muốn check dữ liệu chặt chẽ
import { RoomDto, RoomCreateDto, RoomUpdateDto, RoomStatusUpdateDto } from '../../shared/models/room.model';

@Injectable({
  providedIn: 'root' // <--- DÒNG NÀY LÀ BẮT BUỘC ĐỂ KHÔNG BỊ LỖI
})
export class Api {
  
  constructor(private http: HttpClient) {}

  // 1. GET: Lấy toàn bộ danh sách phòng
  getRooms(): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(`${environment.apiUrl}/rooms`);
  }

  // 2. GET: Lấy chi tiết phòng theo ID
  getRoomDetail(id: number): Observable<RoomDto> {
    return this.http.get<RoomDto>(`${environment.apiUrl}/rooms/${id}`);
  }

  // 3. GET: Lấy danh sách phòng theo ID loại phòng
  getRoomsByRoomType(roomTypeId: number): Observable<RoomDto[]> {
    return this.http.get<RoomDto[]>(`${environment.apiUrl}/rooms/room-type/${roomTypeId}`);
  }

  // 4. POST: Tạo phòng mới (Trả về true/false từ .NET)
  createRoom(createDto: RoomCreateDto): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/rooms`, createDto);
  }

  // 5. PUT: Cập nhật toàn bộ thông tin phòng
  updateRoom(id: number, updateDto: RoomUpdateDto): Observable<any> {
    return this.http.put(`${environment.apiUrl}/rooms/${id}`, updateDto);
  }

  // 6. PATCH: Cập nhật riêng trạng thái phòng
  updateRoomStatus(statusDto: RoomStatusUpdateDto): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/rooms/update-status`, statusDto);
  }

  // 7. DELETE: Xóa phòng
  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/rooms/${id}`);
  }

  createRoomWithImage(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/rooms`, formData);
  }

  // Thêm hàm này vào trong class Api
updateRoomWithImage(id: number, formData: FormData): Observable<any> {
  // QUAN TRỌNG: Không truyền thêm Header nào cả. 
  // Để trình duyệt tự tạo 'Content-Type' kèm 'boundary' cho FormData.
  return this.http.put(`${environment.apiUrl}/rooms/${id}`, formData);
}
}