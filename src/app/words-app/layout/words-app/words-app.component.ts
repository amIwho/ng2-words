import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {C} from '../../const';
import {TimelineComponent} from "../../components/timeline/timeline.component";


@Component({
  selector: 'words-app',
  templateUrl: './words-app.component.html',
  styleUrls: ['./words-app.component.scss']
})
export class WordsAppComponent implements OnInit {

  date: string;
  today: string;
  timelineState: string;

  @ViewChild(TimelineComponent) timelineComponent: TimelineComponent;

  constructor() { }

  ngOnInit() {
    moment.locale('ru-RU');
    this.today = moment().format(C.DDMMYYYY);
    this.date = this.today;
  }

  showHistoryRecord({date}) {
    this.date = date;
  }

  updateWordCountForCurrentDay({day, wordsCount}) {
    const dayNumber = +moment(day, C.DDMMYYYY).format('D');
    this.timelineComponent.updateWordCount(dayNumber, wordsCount);
  }

  goToMonth({month}) {
    this.date = month === moment(this.today, C.DDMMYYYY).format(C.MMYYYY) ?
      this.today : moment(month, C.MMYYYY).startOf('month').format(C.DDMMYYYY);
  }
}
