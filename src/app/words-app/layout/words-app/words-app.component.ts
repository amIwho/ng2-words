import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {TimelineService} from "../../services/timeline.service";
import {Timeline} from "../../models/timeline";

@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html',
  styleUrls: ['./words-app.component.scss']
})
export class WordsAppComponent implements OnInit {

  month: string;
  monthString: string;
  date: string;
  timeline: Timeline;
  currentDayNumber: number;

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    moment.locale('ru-RU');
    this.month = moment().format('MM.YYYY');
    this.monthString = moment().format("MMMM");
    this.date = moment().format('DD.MM.YYYY');
    this.currentDayNumber = +moment().format('D');

    this.timelineService.getTimelineData(this.month).subscribe((timeline) => {
      this.timeline = timeline;
    });
  }

  updateTimeline(data) {
    this.timeline.days[this.currentDayNumber] = data.wordsCount;
  }
}
