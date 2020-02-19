import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  public jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.loadToken();
  }

  login(user: string, password: string): Promise<void> {
    const body = `username=${user}&password=${password}&grant_type=password`;
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y291cnNlLXVpOmMwdXJzM191MQ==');

    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.storeToken(response.access_token);
        this.router.navigate(['/cursos']);
      })
      .catch(response => {
        if (response.status === 400) {
          if (response.error.error === 'invalid_grant') {
            const errorDescription: string = response.error.error_description;
            return Promise.reject(errorDescription);
          }
        }

        return Promise.reject(response);
      });
  }

  public removeAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  public isInvalidAccessToken() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  public hasAuthority(role: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(role);
  }

  public hasAnyAuthority(roles) {
    for (const role of roles) {
      if (this.hasAuthority(role)) {
        return true;
      }
    }
    return false;
  }

  public getNewAccessToken(): Promise<void> {
    const body = 'grant_type=refresh_token';
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic Y291cnNlLXVpOmMwdXJzM191MQ==');
    return this.http.post<any>(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        console.log('Novo access token gerado!');
        this.storeToken(response.access_token);
        return Promise.resolve(null);
      })
      .catch(error => {
        console.log('Erro ao renovar token!', error);
        return Promise.resolve(null);
      });
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.storeToken(token);
    }
  }
}
