import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {RequestOptions, Headers} from '@angular/http';
import {WordsHttpService} from './words-http.service';

declare var moment: any;

@Injectable()
export class TextService {

  postTextsUrl = '/api/texts';
  getTextByDateUrl = '/api/text/';

  constructor(private http: WordsHttpService) { }

  getTextByDate(dateString) {
    return this.http.get(this.getTextByDateUrl + dateString).map(res => res.json());
  }

  saveText(text) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(this.postTextsUrl, JSON.stringify({
      text: text,
      date: moment().utc().format('DD.MM.YYYY')
    }), options);
  }

}
