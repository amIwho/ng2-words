import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthInterceptor} from './words-http.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

declare var moment: any;

@Injectable()
export class MockTextService {

  postTextsUrl = '/api/texts';
  getTextByDateUrl = '/api/text/';

  constructor(private http: AuthInterceptor) { }

  getTextByDate(dateString) {
    return Observable.of({
       'text': 'texasdfrrraasdfsdft2  sfassssdf',
       'date': '22.09.2017'
       });
  }

  saveText(text) {
    return Observable.of({'n': 1, 'nModified': 0, 'ok': 1});
  }

}
