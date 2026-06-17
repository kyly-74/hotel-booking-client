import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RoomTypeService } from '../../../../core/services/roomtype.service';
import { RoomType } from '../../../../shared/models/roomtype.model';

@Component({ 
  selector: 'app-room-type-list', // Đổi selector cho dễ phân biệt
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roomstype-list.html',
  styleUrls: ['./roomstype-list.css']
})
export class RoomTypeList implements OnInit { // Đã đổi tên class tại đây
  // roomTypes: RoomType[] = [];
  roomTypes: any[] = [];
  private service = inject(RoomTypeService);
  private cdr = inject(ChangeDetectorRef);

 ngOnInit() {
    this.service.getAll().subscribe({
      next: (data) => {
        this.roomTypes = data;
        // Ép Angular cập nhật giao diện sau khi có dữ liệu
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error(err)
    });
  }

  deleteRoom(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa loại phòng này?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.roomTypes = this.roomTypes.filter(r => r.id !== id);
        },
        error: (err) => console.error('Lỗi khi xóa:', err)
      });
    }
  }
}