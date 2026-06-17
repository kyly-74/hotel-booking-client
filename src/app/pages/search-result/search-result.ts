import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SearchService } from '../../core/services/search';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search-result.html',
  styleUrls: ['./search-result.css']
})
export class SearchResultComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  hotels: any[] = [];
  loading = false;

  destination = '';
  checkIn = '';
  checkOut = '';
  guests = 1;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.destination = params['destination'] || '';
      this.checkIn = params['checkIn'] || '';
      this.checkOut = params['checkOut'] || '';
      this.guests = +params['guests'] || 1;

      this.loadHotels();

    });

  }

  loadHotels(): void {

    this.loading = true;

    this.searchService.search(
      this.destination,
      this.checkIn,
      this.checkOut,
      this.guests
    ).subscribe({

      next: (data) => {
        console.log('SEARCH RESULT:', data);
        this.hotels = data;
        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.loading = false;
      }

    });
  }
}