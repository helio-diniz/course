import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/api';

import { CourseService } from '../course.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Course } from '../../core/model';
import * as moment from 'moment';

@Component({
  selector: 'app-course-registering',
  templateUrl: './course-registering.component.html',
  styleUrls: ['./course-registering.component.css']
})
export class CourseRegisteringComponent implements OnInit {

  course = new Course();
  categories = [];

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
    console.log(courseId);
    if (courseId) {
      this.setCourse(courseId);
    }
    this.findAllCategories();
  }

  findAllCategories() {
    return this.courseService.findAllCategories()
      .then(cat => {
        this.categories = cat.map(c => ({ label: c.description, value: c.id }));
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  get editing() {
    return Boolean(this.course.id);
  }

  setCourse(codigo: number) {
    this.courseService.findById(codigo)
      .then(searchedCourse => {
        this.copyCourse(searchedCourse);
        this.changeTitle();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  copyCourse(newCourse: Course) {
    // this.course = newCourse;

    const startDate: string = moment(newCourse.startDate).format('YYYY.MM.DD');
    const finishDate: string = moment(newCourse.finishDate).format('YYYY.MM.DD');

    this.course.id = newCourse.id;
    this.course.description = newCourse.description;
    this.course.startDate = new Date(startDate);
    this.course.finishDate = new Date(finishDate);
    this.course.amountOfStudents = newCourse.amountOfStudents;
    this.course.category = newCourse.category;

  }

  save(form: FormControl) {
    if (this.editing) {
      this.updateCourse(form);
    } else {
      this.addCourse(form);
    }
  }

  addCourse(form: FormControl) {
    this.prepareDates();
    console.log(`addCourse course: ${JSON.stringify(this.course)}`);
    this.courseService.save(this.course)
      .then(addedCourse => {
        this.messageService.add({
          severity: 'success',
          detail: 'Curso adicionado com sucesso!'
        });
        this.copyCourse(addedCourse);
        this.router.navigate(['/cursos', addedCourse.id]);
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  updateCourse(form: FormControl) {
    this.prepareDates();
    console.log(`addCourse course: ${JSON.stringify(this.course)}`);
    this.courseService.update(this.course)
      .then(updatedCourse => {
        this.copyCourse(updatedCourse);
        this.messageService.add({
          severity: 'sucess',
          detail: 'Curso alterado com sucesso!'
        });
        this.setCourse(updatedCourse.id);
        this.changeTitle();
      })
      .catch(erro => {
        this.errorHandlerService.handle(erro);
      });

  }

  reset(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.course = new Course();
    }.bind(this), 1);

    this.router.navigate(['/cursos/novo']);
  }

  prepareDates() {
    this.course.startDate = moment(this.course.startDate).hour(21).toDate();
    this.course.finishDate = moment(this.course.finishDate).hour(21).toDate();
  }

  changeTitle() {
    this.title.setTitle(`Edição do Curso: ${this.course.description}`);
  }

}
