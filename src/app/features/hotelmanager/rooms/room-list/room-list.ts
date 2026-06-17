import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Api } from '../../../../core/services/room.service';
import { RoomDto } from '../../../../shared/models/room.model';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-list.html',
  styleUrls: ['./room-list.css']
})
export class RoomListComponent implements OnInit {
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  // Mảng rooms sử dụng kiểu RoomDto thay vì any[] để tận dụng TypeScript
  rooms: RoomDto[] = []; 

 // Trong class RoomEditComponent

ngOnInit(): void {
  // Gọi hàm loadRooms để lấy dữ liệu từ API khi trang vừa khởi tạo
  this.loadRooms();
}
  loadRooms(): void {
  this.api.getRooms().subscribe({
    next: (data: any[]) => {
      console.log('Dữ liệu từ Backend:', data);
      this.rooms = data.map((r: any) => ({
        // Cần đảm bảo các tên 'r.XYZ' khớp 100% với JSON trong tab Network
        id: r.id, 
        roomNumber: r.roomNumber ?? 'N/A',
        roomTypeName: r.roomTypeName ?? r.RoomTypeName ?? 'Chưa phân loại', // Hỗ trợ cả 2 kiểu
        roomTypeId: r.roomTypeId ?? r.RoomTypeId,
        floor: r.floor ?? '1',
        pricePerNight: r.pricePerNight ?? r.PricePerNight ?? 0, // Cần lấy đúng từ API
        status: r.status,
       image: this.getRoomImageUrl(r.roomTypeName ?? r.RoomTypeName)
      }));
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('CHI TIẾT LỖI API:', err);
      alert('Không thể tải dữ liệu phòng.');
    }
  });
}

 // Sửa lại hàm này trong cả room-list.ts và room-detail.ts
// Trong file room-list.ts
getRoomImageUrl(imageUrl: string | null | undefined): string {
  // Kiểm tra nếu imageUrl bị null, undefined hoặc là chuỗi rỗng
  if (!imageUrl || imageUrl.trim() === '') {
    
    return ''; 
  }
  
  // Nếu có ảnh, trả về đường dẫn đầy đủ
  return 'http://localhost:5099' + imageUrl;
}
  deleteRoom(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa phòng này không?')) {
      this.api.deleteRoom(id).subscribe({
        next: () => {
          alert('Xóa phòng thành công!');
          this.loadRooms();
        },
        error: (err) => {
          alert(err.error?.message || 'Xóa thất bại!');
        }
      });
    }
  }
}