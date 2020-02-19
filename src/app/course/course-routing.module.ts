import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseRegisteringComponent } from './course-registering/course-registering.component';
import { CourseSearchingComponent } from './course-searching/course-searching.component';
import { AuthGuard } from './../security/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CourseSearchingComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_SEARCH_COURSE'] }
  },
  {
    path: 'novo',
    component: CourseRegisteringComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_COURSE'] }
  },
  {
    path: ':codigo',
    component: CourseRegisteringComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_REGISTER_COURSE'] }
  }
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
