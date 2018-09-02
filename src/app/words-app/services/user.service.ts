import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {

    signupUrl = '/api/register';
  signinUrl = '/api/signin';
  logoutUrl = '/api/signout';
  currentUrl = '/api/me';

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser() {
    return this.http.get(this.currentUrl);
  }

  signup(credentials) {
    return this.http.post(this.signupUrl, {username: credentials.username, password: credentials.password});
  }

  signin(credentials) {
    return this.http.post(this.signinUrl, {username: credentials.username, password: credentials.password});
  }

  logout() {
    return this.http.get(this.logoutUrl);
  }

}
