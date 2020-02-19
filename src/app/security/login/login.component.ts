import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }

  login(user: string, password: string) {
    this.auth.login(user, password)
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }
}
