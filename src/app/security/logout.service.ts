import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  tokenRevokeUrl = 'http://localhost:8080/token/revoke';

  constructor(
    private http: HttpClient,
    private auht: AuthService
  ) { }

  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auht.removeAccessToken();
      });
  }
}
