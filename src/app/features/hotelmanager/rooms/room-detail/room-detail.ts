import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../../../../core/services/room.service';
import { RoomDto } from '../../../../shared/models/room.model';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './room-detail.html',
  styleUrls: ['./room-detail.css']
})
export class RoomDetailComponent implements OnInit {
  private api = inject(Api);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  // Khai báo kiểu RoomDto khớp với model
 room: RoomDto | null = null;
  imageUrl: string = '';

  ngOnInit(): void {
    // Lấy ID từ URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadRoomDetail(id);
    }
  }

 loadRoomDetail(id: number): void {
  this.api.getRoomDetail(id).subscribe({
    next: (data: any) => {
      console.log('DỮ LIỆU NHẬN ĐƯỢC:', data);
      // Nếu API trả về một object có chứa thuộc tính room, hãy dùng:
      // this.room = data.room || data;
      this.room = data; 
      this.cdr.detectChanges(); // Gọi cái này để ép UI cập nhật
    },
    error: (err) => {
      console.error('LỖI KHI TẢI DỮ LIỆU:', err);
    }
  });
}

  // CẦN THIẾT: Hàm này để hiển thị ảnh dựa trên loại phòng
  // Sửa lại hàm này trong cả room-list.ts và room-detail.ts
// Sửa hàm này ở CẢ HAI FILE (room-list.ts và room-detail.ts)
// Trong file room-list.ts
getRoomImageUrl(imageUrl: string | null | undefined): string {
  // Kiểm tra nếu imageUrl bị null, undefined hoặc là chuỗi rỗng
  if (!imageUrl || imageUrl.trim() === '') {
   
    return ''; 
  }
  
  // Nếu có ảnh, trả về đường dẫn đầy đủ
  return 'http://localhost:5099' + imageUrl;
}
}