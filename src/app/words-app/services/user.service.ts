import { Injectable } from '@angular/core';
import {WordsHttpService} from "./words-http.service";
import {RequestOptions, Headers} from "@angular/http";


@Injectable()
export class UserService {

  signupUrl = '/api/signup';
  signinUrl = '/api/signin';
  logoutUrl = '/api/signout';
  currentUrl = '/api/me';

  constructor(
    private http: WordsHttpService
  ) { }

  getCurrentUser() {
    return this.http.get(this.currentUrl).map(res => res.json());
  }

  signup(credentials) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.signupUrl, JSON.stringify({username: credentials.username, password: credentials.password}), options)
      .map(res => res.json());
  }

  signin(credentials) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.signinUrl, JSON.stringify({username: credentials.username, password: credentials.password}), options)
      .map(res => res.json());
  }

  logout() {
    return this.http.get(this.logoutUrl);
  }

}
