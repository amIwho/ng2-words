import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Timeline} from "../models/timeline";

@Injectable()
export class TimelineService {

  constructor() { }

  getTimelineData(month): Observable<Timeline> {
    return Observable.of({
      days: [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'--','--','--','--','--','--','--','--','--'
        ],
      month: '09.2017'
    });
  }

}
