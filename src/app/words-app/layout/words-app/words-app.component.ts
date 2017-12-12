import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {TimelineService} from '../../services/timeline.service';
import {C} from '../../const';


@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html',
  styleUrls: ['./words-app.component.scss']
})
export class WordsAppComponent implements OnInit {

  date: string;
  today: string;

  timeline = [];
  timelineState = '';

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    moment.locale('ru-RU');
    this.today = moment().format(C.DDMMYYYY);
    this.date = this.today;
    this.updateTimeline();
  }

  updateTimeline() {
    this.timeline = [];
    this.timelineState = '';
    const month = moment(this.date, C.DDMMYYYY).format(C.MMYYYY);
    const isCurrentMonth = moment(this.date, C.MMYYYY).format(C.MMYYYY) === moment(this.today, C.MMYYYY).format(C.MMYYYY);
    const currentDayNumber = isCurrentMonth ? +moment(this.date).format('D') : 0;
    const amountOfDaysInMonth = moment(month, C.MMYYYY).daysInMonth();

    this.timelineService.getTimelineData(month).subscribe((timeline) => {
      for (let i = 0; i < amountOfDaysInMonth; i++) {
        this.timeline[i] = 0;
      }

      if (isCurrentMonth) {
        for (let i = currentDayNumber; i < amountOfDaysInMonth; i++) {
          this.timeline[i] = '--';
        }
      }

      timeline.forEach((day) => {
        const dayN = +moment(day.date, C.DDMMYYYY).format('D');
        this.timeline[dayN - 1] = day.words;
      });
      this.timelineState = 'show';
    });
  }

  updateWordCountForCurrentDay(data) {
    this.timeline[data.day - 1] = data.wordsCount;
  }

  showHistoryRecord(event) {
    this.date = event.date;
  }

  goToMonth(event) {
    this.date = event.month === moment(this.today, C.DDMMYYYY).format(C.MMYYYY) ?
      this.today : moment(event.month, C.MMYYYY).startOf('month').format(C.DDMMYYYY);
    this.updateTimeline();
  }
}
