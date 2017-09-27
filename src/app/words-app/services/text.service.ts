import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {RequestOptions, Headers} from "@angular/http";
import {WordsHttpService} from "./words-http.service";


@Injectable()
export class TextService {

  postTextsUrl = '/api/posts';

  constructor(private http: WordsHttpService) { }

  getTextByDate(dateString): Observable<string> {
    return Observable.of("Text Example")
  }

  saveText(text) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.postTextsUrl, JSON.stringify({text: text}), options);
  }

}
