import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { Api } from '../../../../core/services/room.service';

@Component({
  selector: 'app-room-create',
  standalone: true, // Đảm bảo có dòng này nếu bạn dùng Angular mới
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './room-create.html',
  styleUrls: ['./room-create.css']
})
export class RoomCreateComponent implements OnInit {
  
  room: any = {
    roomNumber: '',
    roomTypeId: 1, 
    status: 'Available', 
    floor: 1,
    pricePerNight: 0,
    imageUrl: ''
  };

  selectedFile: File | null = null;

  constructor(
    private apiService: Api,
    private router: Router
  ) { }


previewImageUrl: string | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];

  if (file) {
    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewImageUrl = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }
}


  ngOnInit(): void {}

 

  onCreate(): void {
    if (!this.room.roomNumber) {
      alert('Vui lòng nhập Mã phòng!');
      return;
    }

    const formData = new FormData();
    formData.append('RoomNumber', String(this.room.roomNumber));
    formData.append('RoomTypeId', String(this.room.roomTypeId));
    formData.append('PricePerNight', String(this.room.pricePerNight));
    formData.append('Floor', String(this.room.floor));
    formData.append('Status', String(this.room.status));
    
    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    this.apiService.createRoomWithImage(formData).subscribe({
      next: (res: any) => {
         console.log("CREATE RESPONSE:", res);

  alert('Thêm phòng mới thành công! 🎉');

  this.selectedFile = null;
  this.previewImageUrl = null;
  this.room = {
    roomNumber: '',
    roomTypeId: 1,
    status: 'Available',
    floor: 1,
    pricePerNight: 0,
    imageUrl: ''
  };

  this.goBack();
      },
      error: (err: any) => {
        console.error('Lỗi API:', err);
        alert('Có lỗi xảy ra, vui lòng kiểm tra lại!');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/hotelmanager/rooms']);
  }
}