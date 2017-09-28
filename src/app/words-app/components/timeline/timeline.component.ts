import {Component, Input, OnInit} from '@angular/core';
import {Timeline} from "../../models/timeline";
import {TimelineService} from "../../services/timeline.service";

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
  @Input() monthString: string;

  constructor(
    private timelineService: TimelineService
  ) { }

  ngOnInit() {
    this.currentMonth = moment().format('MM.YYYY');
  }

  nextMonth() {

  }

  prevMonth() {

  }

  viewText(dayNumber) {

  }
}
