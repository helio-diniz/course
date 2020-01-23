import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CourseService } from '../course.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Course } from '../../core/model';

@Component({
  selector: 'app-course-registering',
  templateUrl: './course-registering.component.html',
  styleUrls: ['./course-registering.component.css']
})
export class CourseRegisteringComponent implements OnInit {

  course = new Course();

  constructor(
    private courseService: CourseService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Novo Curso');

    const courseId = this.route.snapshot.params['codigo'];
    if (courseId) {
      this.setCourse(courseId);
    }
  }

  get editing() {
    return Boolean(this.course.id);
  }

  setCourse(codigo: number) {
    this.courseService.findById(codigo)
      .then(searchCourse => {
        this.course = searchCourse;
        this.changeTitle();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  save(form: FormControl) {
    if (this.editing) {
      this.updateCourse(form);
    } else {
      this.addCourse(form);
    }
  }

  addCourse(form: FormControl) {
    this.courseService.save(this.course)
      .then(addedCourse => {
        this.messageService.add({
          severity: 'success',
          detail: 'Curso adicionado com sucesso!'
        });
        this.course = addedCourse;
        this.router.navigate(['/cursos', addedCourse.id]);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  updateCourse(form: FormControl) {
    this.courseService.update(this.course)
      .then(updatedCourse => {
        this.course = updatedCourse;
        this.messageService.add({
          severity: 'sucess',
          detail: 'Curso alterado com sucesso!'
        });
        this.changeTitle();
      })
      .catch(erro => this.errorHandlerService.handle(erro));

  }

  reset(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.course = new Course();
    }.bind(this), 1);

    this.router.navigate(['/cursos/novo']);
  }

  changeTitle() {
    this.title.setTitle(`Edição do Curso: ${this.course.description}`);
  }

}
