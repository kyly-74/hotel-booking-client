import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar'; // Check lại đường dẫn file navbar của bạn nhé

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar], 
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title = 'hotel-booking-client';
}