import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { CourseHttpInterceptor } from './course-http-interceptor';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';

export function tokenGetter(): string {
  const token = localStorage.getItem('token');
  return token;
}

@NgModule({
  declarations: [LoginComponent],

  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),

    SecurityRoutingModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CourseHttpInterceptor,
      multi: true
    },
    AuthGuard,
    LogoutService
  ]
})
export class SecurityModule { }
