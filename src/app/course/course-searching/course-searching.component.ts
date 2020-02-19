import { AuthService } from './../../security/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { CourseFilter, CourseService } from '../course.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-course-searching',
  templateUrl: './course-searching.component.html',
  styleUrls: ['./course-searching.component.css']
})
export class CourseSearchingComponent implements OnInit {

  totalOfRecords = 0;
  filter = new CourseFilter();
  @ViewChild('tabela', { static: false }) grid;
  courses = [];

  constructor(
    private courseService: CourseService,
    private errorHandlerService: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Curso');
  }

  findPage(pageIndex = 0) {
    this.filter.pageIndex = pageIndex;
    this.courseService.findPage(this.filter)
      .then(result => {
        this.totalOfRecords = result.total;
        this.courses = result.courses;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  onChangePage(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.findPage(pagina);
  }

  confirmRemoval(course: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(course);
      }
    });
  }

  excluir(course: any) {
    this.courseService.delete(course.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.findPage();
        } else {
          this.grid.first = 0;
          this.findPage();
        }

        this.messageService.add({
          severity: 'success',
          detail: 'Curso excluído com sucesso!'
        });
      })
      .catch(error => this.errorHandlerService.handle(error));
  }
}
