import { Injectable } from '@angular/core';
import {C} from '../const';
import {HttpClient} from "@angular/common/http";

declare var moment: any;

@Injectable()
export class TextService {

  postTextsUrl = '/api/texts';
  getTextByDateUrl = '/api/text/';

  constructor(private http: HttpClient) { }

  getTextByDate(dateString) {
    return this.http.get(this.getTextByDateUrl + dateString);
  }

  saveText(text) {
    return this.http.post(this.postTextsUrl, {
      text: text,
      date: moment().utc().format(C.DDMMYYYY)
    });
  }

}
