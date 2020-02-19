import { AuthService } from './../security/auth.service';
import { Category } from './../core/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Course } from '../core/model';

export class CourseFilter {
  description: string;
  pageIndex = 0;
  pageSize = 5;
}

@Injectable()
export class CourseService {
  categoryURL = 'http://localhost:8080/categorias';
  courseURL = 'http://localhost:8080/cursos';

  constructor(private http: HttpClient) { }

  findAll(): Promise<Course[]> {
    return this.http.get<Course[]>(`${this.courseURL}/todas`)
      .toPromise().then();
  }

  findPage(filter: CourseFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filter.pageIndex.toString(),
        size: filter.pageSize.toString()
      }
    });

    if (filter.description) {
      params = params.append('description', filter.description);
    }

    return this.http.get<any>(this.courseURL, { params })
      .toPromise()
      .then(response => {
        const courses = response.content;
        const resultado = {
          courses: courses,
          total: response.totalElements
        };
        return resultado;
      });
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.courseURL}/${id}`)
      .toPromise()
      .then(() => null);
  }

  save(course: Course): Promise<Course> {
    return this.http.post<Course>(`${this.courseURL}/novo`, course)
      .toPromise()
      .then();
  }

  update(course: Course): Promise<Course> {
    return this.http.put<Course>(`${this.courseURL}/${course.id}`, course)
      .toPromise()
      .then(response => {
        const updatedCourse = response;
        return updatedCourse;
      });
  }

  findById(id: number): Promise<Course> {
    return this.http.get<Course>(`${this.courseURL}/${id}`)
      .toPromise()
      .then(response => {
        const searchedCourse = response;
        return searchedCourse;
      });
  }

  findAllCategories(): Promise<Category[]> {
    return this.http.get<Category[]>(`${this.categoryURL}/todas`)
      .toPromise()
      .then();
  }
}
