import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // 1. Import dòng này
import { routes } from './app.routes'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // 2. Thêm dòng này vào đây
    provideHttpClient()
  ]
};
