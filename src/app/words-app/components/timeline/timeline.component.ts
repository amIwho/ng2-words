import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Timeline} from '../../models/timeline';
import {TimelineService} from '../../services/timeline.service';
import {C} from '../../const';

declare var moment: any;

@Component({
  selector: 'words-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('timelineState', [
      state('show', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate(500)
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {

  currentMonth: string;
  _date: string;

  @Input() timeline: Timeline;
  @Input()
  set date(value) {
    this._date = value;
    this.activeDay = +moment(value, C.DDMMYYYY).format('D');
  }
  get date() {
    return this._date;
  }
  @Input() state: string;

  @Output() showMeHistoryRecord = new EventEmitter();
  @Output() changeMonth = new EventEmitter();

  activeDay: number;
  today: string;

  constructor(private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.currentMonth = moment().format(C.MMYYYY);

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
