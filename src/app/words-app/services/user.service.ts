import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import "rxjs/add/observable/of";
import {WordsHttpService} from "./words-http.service";
import {RequestOptions, Headers} from "@angular/http";

@Injectable()
export class UserService {

  signupUserUrl = '/api/sendToken';

  constructor(
    private http: WordsHttpService
  ) { }

  getCurrentUser(): Observable<User> {
    return Observable.of({
      email: 'kalinon7@gmail.com',
      username: 'amIwho',
      fio: 'Сидоркин Олег Валентинович'
    })
  }

  sendToken(email) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.signupUserUrl, JSON.stringify({email: email}), options);
  }

}
