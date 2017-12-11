import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Timeline} from '../../models/timeline';
import {TimelineService} from '../../services/timeline.service';
import { C } from '../../const';

declare var moment: any;

@Component({
  selector: 'words-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  currentMonth: string;

  @Input() timeline: Timeline;
  @Input() date: string;

  @Output() showMeHistoryRecord = new EventEmitter();
  @Output() changeMonth = new EventEmitter();

  activeDay: number;
  today: string;

  constructor(
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    this.currentMonth = moment().format(C.MMYYYY);
    this.activeDay = +moment(this.date, C.DDMMYYYY).format('D');
    this.today = moment().format(C.DDMMYYYY);
  }

  getMonthName() {
    return moment(this.date, C.DDMMYYYY).format('MMMM');
  }

  toMonth(direction) {
    const month = moment(this.date, C.DDMMYYYY).add(direction, 'month').format(C.MMYYYY);
    this.changeMonth.emit({month});
  }

  isCurrentMonth() {
    return moment(this.date, C.DDMMYYYY).format(C.MMYYYY) === this.currentMonth;
  }

  viewText(dayNumber) {
    if (this.isCurrentMonth() && dayNumber > +moment(this.today, C.DDMMYYYY).format('D')) return;

    this.activeDay = dayNumber;
    this.date = moment(this.date, C.DDMMYYYY).date(dayNumber).format(C.DDMMYYYY);
    this.showMeHistoryRecord.emit({date: this.date});
  }
}
