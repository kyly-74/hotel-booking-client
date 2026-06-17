

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

  private key = 'booking';

  private data: any = null;

  save(data: any) {
    this.data = data;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  get() {
    if (this.data) return this.data;

    const cache = localStorage.getItem(this.key);
    if (!cache) return null;

    try {
      this.data = JSON.parse(cache);
      return this.data;
    } catch {
      return null;
    }
  }

  clear() {
    this.data = null;
    localStorage.removeItem(this.key);
  }
}