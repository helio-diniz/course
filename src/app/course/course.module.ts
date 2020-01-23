import { CourseRountingModule } from './course-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from '../shared/shared.module';
import { CourseSearchingComponent } from './course-searching/course-searching.component';
import { CourseRegisteringComponent } from './course-registering/course-registering.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,

    SharedModule,
    CourseRountingModule
  ],
  declarations: [CourseSearchingComponent, CourseRegisteringComponent],
  exports: []
})
export class CourseModule { }
