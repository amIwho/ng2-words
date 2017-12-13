import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {TimelineService} from '../../services/timeline.service';
import {C} from '../../const';

declare var moment: any;

//todo: update WordCount

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
  timeline: number[];
  activeDay: number;
  today: string;
  timelineState: string;

  @Input()
  set date(value) {
    this._date = value;
    this.activeDay = +moment(value, C.DDMMYYYY).format('D');
    this.updateTimeline();
  }
  get date() {
    return this._date;
  }

  @Input() state: string;
  @Output() showMeHistoryRecord = new EventEmitter();
  @Output() changeMonth = new EventEmitter();

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    this.currentMonth = moment().format(C.MMYYYY);
    this.today = moment().format(C.DDMMYYYY);
  }

  updateTimeline() {
    this.timeline = [];
    this.timelineState = '';
    const month = moment(this.date, C.DDMMYYYY).format(C.MMYYYY);
    const isCurrentMonth = moment(this.date, C.DDMMYYYY).format(C.MMYYYY) === moment().format(C.MMYYYY);
    const todayDayNumber = isCurrentMonth ? +moment().format('D') : 0;
    const amountOfDaysInMonth = moment(month, C.MMYYYY).daysInMonth();

    this.timelineService.getTimelineData(month).subscribe((timeline) => {
      for (let i = 0; i < amountOfDaysInMonth; i++) {
        this.timeline[i] = 0;
      }

      if (isCurrentMonth) {
        for (let i = todayDayNumber; i < amountOfDaysInMonth; i++) {
          this.timeline[i] = -1;
        }
      }

      timeline.forEach((day) => {
        const dayN = +moment(day.date, C.DDMMYYYY).format('D');
        this.timeline[dayN - 1] = day.words;
      });
      this.timelineState = 'show';
    });
  }

  updateWordCount(day, wordsCount) {
    this.timeline[day - 1] = wordsCount;
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
