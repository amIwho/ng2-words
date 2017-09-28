import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Timeline} from "../models/timeline";
import {WordsHttpService} from "./words-http.service";

@Injectable()
export class TimelineService {

  constructor(
    private http: WordsHttpService
  ) { }

  getTimelineData(month) {
    return this.http.get('/api/timeline/'+ month).map(res => res.json());
  }
}
