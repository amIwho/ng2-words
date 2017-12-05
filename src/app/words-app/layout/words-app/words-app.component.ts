import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TimelineService} from '../../services/timeline.service';
import {Timeline} from '../../models/timeline';

@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html',
  styleUrls: ['./words-app.component.scss']
})
export class WordsAppComponent implements OnInit {

  month: string;
  monthString: string;
  date: string;
  timeline = [];
  currentDayNumber: number;

  constructor(private timelineService: TimelineService) {
  }

  ngOnInit() {
    moment.locale('ru-RU');
    this.month = moment().format('MM.YYYY');
    this.monthString = moment().format('MMMM');
    this.date = moment().format('DD.MM.YYYY');
    this.currentDayNumber = +moment().format('D');


    this.timelineService.getTimelineData(this.month).subscribe((timeline) => {
      const dayCount = moment(this.month, 'MM.YYYY').daysInMonth();
      for (let i = 0; i < this.currentDayNumber; i++) {
        this.timeline[i] = 0;
      }

      for (let i = this.currentDayNumber; i < dayCount; i++) {
        this.timeline[i] = '--';
      }

      timeline.forEach((day) => {
        const dayN = +moment(day.date, 'DD.MM.YYYY').format('D');
        this.timeline[dayN - 1] = day.words;
      });
    });
  }

  updateTimeline(data) {
    this.timeline[this.currentDayNumber - 1] = data.wordsCount;
  }
}
