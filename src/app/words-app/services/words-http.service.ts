import {Injectable} from '@angular/core';
import {Http, Request, Response, RequestOptions, XHRBackend, RequestOptionsArgs} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordsHttpService extends Http {

  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private router: Router
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch((e) => {
      if (e.status === 401) {
        window.location.href = '/login';
      }

      if (e.status === 500) {

      }

      return Observable.throw(e);
    });
  }

}
