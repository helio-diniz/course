import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CourseService } from '../course/course.service';
import { NotAuthorizedComponent } from './not-authorized-component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { AuthService } from './../security/auth.service';
import { from } from 'rxjs';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NotAuthorizedComponent],
  exports: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    Title,
    ErrorHandlerService, ,
    CourseService,
    AuthService,
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
