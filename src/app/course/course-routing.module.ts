import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseRegisteringComponent } from './course-registering/course-registering.component';
import { CourseSearchingComponent } from './course-searching/course-searching.component';

const routes: Routes = [
  { path: '', component: CourseSearchingComponent },
  { path: 'novo', component: CourseRegisteringComponent },
  { path: ':codigo', component: CourseRegisteringComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CourseRountingModule { }
