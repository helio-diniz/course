import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { CourseService } from '../course/course.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
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
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
