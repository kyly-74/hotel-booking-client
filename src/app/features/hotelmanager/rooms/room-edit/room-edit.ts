import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../../../core/services/room.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-room-edit',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './room-edit.html',
  styleUrls: ['./room-edit.css']
})
export class RoomEditComponent implements OnInit {
  previewImageUrl: string | null = null;
  private cdr = inject(ChangeDetectorRef);
  
  roomId!: number;
  selectedFile: File | null = null;
  isImageRemoved: boolean = false;
  
  room: any = {
    id: 0,
    roomNumber: '',
    roomTypeId: 1,
    status: 'Available',
    floor: 1,
    roomTypeName: '',    
    pricePerNight: 0,
    imageUrl: '' // Thêm trường này để lưu đường dẫn ảnh từ API
  };

  constructor(
    private apiService: Api,
    private route: ActivatedRoute, 
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.roomId) {
      this.loadRoomDetail();
    }
  }

  loadRoomDetail(): void {
    this.apiService.getRoomDetail(this.roomId).subscribe({
      next: (data: any) => { 
        this.room = {
          id: data.id ?? data.Id,
          roomNumber: data.roomNumber ?? data.RoomNumber,
          roomTypeId: data.roomTypeId ?? data.RoomTypeId,
          status: data.status ?? data.Status,
          floor: data.floor ?? data.Floor,
          roomTypeName: data.roomTypeName ?? data.RoomTypeName,   
          pricePerNight: data.pricePerNight ?? data.PricePerNight,
          imageUrl: data.imageUrl ?? data.ImageUrl ?? ''
        };
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Lỗi lấy chi tiết:', err)
    });
  }


  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.isImageRemoved = false;
    
    const reader = new FileReader();
    // Sử dụng arrow function để giữ ngữ cảnh 'this'
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewImageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

  // onFileSelected(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     this.isImageRemoved = false; 
  //   }
  // }

  removeImage(): void {
    this.room.imageUrl = '';
    this.isImageRemoved = true;
  }

  onUpdate(): void {
  if (!this.room.roomNumber) {
    alert('Vui lòng nhập mã phòng!');
    return;
  }

  const formData = new FormData();
  formData.append('Id', String(this.roomId));
  formData.append('RoomNumber', String(this.room.roomNumber).trim());
  formData.append('RoomTypeId', String(this.room.roomTypeId));
  formData.append('Status', String(this.room.status));
  formData.append('Floor', String(this.room.floor));
  
  // 🌟 THÊM DÒNG NÀY: Gửi đường dẫn ảnh hiện tại lên
  // Nếu ảnh đã bị xóa (isImageRemoved = true), gửi chuỗi rỗng hoặc giá trị null tùy logic backend
  formData.append('ImageUrl', this.isImageRemoved ? '' : (this.room.imageUrl || ''));

  formData.append('IsImageRemoved', String(this.isImageRemoved));

  if (this.selectedFile) {
    formData.append('imageFile', this.selectedFile);
  }




  console.log("--- BẮT ĐẦU KIỂM TRA FORMDATA ---");
(formData as any).forEach((value: any, key: any) => {
  console.log(key + ":", value);
});
console.log("--- KẾT THÚC KIỂM TRA FORMDATA ---");

  this.apiService.updateRoomWithImage(this.roomId, formData).subscribe({
    next: () => {
      alert('Cập nhật phòng thành công! 🎉');
      this.goBack();
    },
    error: (err: any) => {
      console.error('Lỗi chi tiết:', err);
      alert('Cập nhật thất bại, vui lòng kiểm tra lại!');
    }
  });
}

  goBack(): void {
    this.router.navigate(['/hotelmanager/rooms']); 
  }
}