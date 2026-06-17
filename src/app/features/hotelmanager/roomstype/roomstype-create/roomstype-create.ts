import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Bắt buộc để dùng [(ngModel)]
import { RoomTypeService } from '../../../../core/services/roomtype.service';

@Component({
  selector: 'app-roomstype-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Đã thêm FormsModule vào đây
  templateUrl: './roomstype-create.html',
  styleUrls: ['./roomstype-create.css'] // Đảm bảo tên file CSS khớp với tên file thật của bạn
})
export class RoomTypeCreateComponent {
  
  // Object dữ liệu khớp với form
  roomType = {
    typeName: '',
    description: '',
    maxOccupancy: 1,
    pricePerNight: 0,
    area: 0,
    totalRooms: 1,
    hotelId: 1
  };

  constructor(
    private service: RoomTypeService, 
    private router: Router
  ) {}

  onSubmit(form: any) {
  if (form.valid) {
    this.service.create(this.roomType as any).subscribe({
      next: () => {
        alert('Thêm loại phòng thành công!');
        this.router.navigate(['/hotelmanager/roomstype']);
      },
      error: (err) => {
        // CÁI NÀY SẼ CHO BẠN BIẾT LỖI GÌ
        console.log('Error Status:', err.status);
        console.log('Error Details:', err.error); 
        alert('Lỗi: ' + JSON.stringify(err.error)); // Hiển thị lỗi từ ModelState
      }
    });
  }
}
}