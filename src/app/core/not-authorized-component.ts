import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso negado!</h1>
    </div>
  `,
  styles: []
})
export class NotAuthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
