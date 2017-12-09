import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Timeline} from '../../models/timeline';
import {TimelineService} from '../../services/timeline.service';
import {C} from '../../const';

declare var moment: any;

@Component({
  selector: 'words-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  currentMonth: string;

  @Input() timeline: Timeline;
  @Input() month: string;
  @Input() monthName: string;

  @Output() showMeHistoryRecord = new EventEmitter();

  constructor(
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    this.currentMonth = moment().format(C.MMYYYY);
  }

  nextMonth() {

  }

  prevMonth() {

  }

  viewText(dayNumber) {
    this.showMeHistoryRecord.emit({dayNumber});
  }
}
