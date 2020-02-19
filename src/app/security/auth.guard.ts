import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isInvalidAccessToken()) {
      console.log('Navegação com access token inváilido. Obtendo novo token!');
      return this.auth.getNewAccessToken()
        .then(() => {
          if (this.auth.isInvalidAccessToken()) {
            this.router.navigate(['\login']);
            return false;
          }
          return true;
        });

    } else if (next.data.roles && !this.auth.hasAnyAuthority(next.data.roles)) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }

}
