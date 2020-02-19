import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from '../security/course-http-interceptor';


@Injectable()
export class ErrorHandlerService {

  constructor(
    private messagService: MessageService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      console.log('Handle - Erro de resposta.');
      msg = 'Ocorreu um erro ao processar a sua solicitação!';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação!';
      }

      try {
        msg = errorResponse.error[0].userMessage;
      } catch (e) { }
      console.log('Handle - msg: ' + msg);
    } else {
      msg = 'Erro ao processar serviço remoto! Tente novamente.';
    }
    this.messagService.add({ severity: 'error', detail: msg });
  }
}

