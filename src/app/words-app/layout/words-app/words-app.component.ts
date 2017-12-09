import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TimelineService} from '../../services/timeline.service';
import { C } from '../../const';


@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html',
  styleUrls: ['./words-app.component.scss']
})
export class WordsAppComponent implements OnInit {

  month: string;
  monthName: string;
  date: string;
  timeline = [];
  currentDayNumber: number;

  constructor(private timelineService: TimelineService) {
  }

  ngOnInit() {
    moment.locale('ru-RU');
    this.month = moment().format(C.MMYYYY);
    this.monthName = moment().format('MMMM');
    this.date = moment().format(C.DDMMYYYY);
    this.currentDayNumber = +moment().format('D');


    this.timelineService.getTimelineData(this.month).subscribe((timeline) => {
      const dayCount = moment(this.month, C.MMYYYY).daysInMonth();
      for (let i = 0; i < this.currentDayNumber; i++) {
        this.timeline[i] = 0;
      }

      for (let i = this.currentDayNumber; i < dayCount; i++) {
        this.timeline[i] = '--';
      }

      timeline.forEach((day) => {
        const dayN = +moment(day.date, C.DDMMYYYY).format('D');
        this.timeline[dayN - 1] = day.words;
      });
    });
  }

  updateTimeline(data) {
    this.timeline[this.currentDayNumber - 1] = data.wordsCount;
  }

  showHistoryRecord(event) {
    this.date = moment(this.month, C.MMYYYY).date(event.dayNumber).format(C.DDMMYYYY);
  }
}
