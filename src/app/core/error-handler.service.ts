import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {

  constructor(private messagService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
    }
    this.messagService.add({ severity: 'error', detail: msg });
  }
}
