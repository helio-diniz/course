import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogoutService } from './../../security/logout.service';
import { AuthService } from './../../security/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['\login']);
      })
      .catch((error) => {
        this.errorHandlerService.handle(error);
      });
  }

}
