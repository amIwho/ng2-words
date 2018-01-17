import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextService} from '../../services/text.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {C} from '../../const';

declare var moment: any;

@Component({
  selector: 'words-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  textForm: FormGroup;

  state = C.STATES.saved;
  currentDate: string;
  _textDate: string;
  savingCycleInterval: any;
  historyRecord: string;
  wordsCount = 0;

  @Input()
  set date(newDate: string) {
    this._textDate = newDate;
    this.updateAreaContent(this._textDate);
  }

  get date() {
    return this._textDate;
  }

  @Output() updateCounter = new EventEmitter();

  constructor(private textService: TextService,
              private _fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initForm();
    this.currentDate = moment().format(C.DDMMYYYY);
  }

  isToday() {
    return this.date === this.currentDate;
  }

  updateAreaContent(date: string) {
    this.textService.getTextByDate(this._textDate).subscribe((text) => {
      if (date === this.currentDate) {
        this.textForm.get('text').patchValue(text[0] && text[0].text, {emitEvent: false});
        this.wordsCount = this.getWordsCount();
        this.savingCycleInterval = setInterval(() => {
          this.save();
        }, 10000);
      } else {
        clearInterval(this.savingCycleInterval);
        this.historyRecord = text[0] && text[0].text || 'Здесь ничего нет';
      }
    });
  }

  initForm() {
    this.textForm = this._fb.group({
      text: this._fb.control('', Validators.required)
    });

    this.textForm.get('text').valueChanges.debounceTime(10).subscribe((text) => {
      this.state = C.STATES.notsaved;
      this.wordsCount = this.getWordsCount();
      this.updateCounter.emit({day: this.currentDate, wordsCount: this.wordsCount});
    });
  }

  getWordsCount() {
    const wordsArr = this.getText().trim().split(/[\s,.;]+/);
    for (let i = 0; i < wordsArr.length; i++) {
      if (wordsArr[i] === '') wordsArr.splice(i, 1) && i--;
    }
    return wordsArr.length;
  }

  getText() {
    return this.textForm.get('text').value || '';
  }

  save() {
    //todo: сохранение при переходе на другой день
    if (this.state === C.STATES.notsaved) {
      this.state = C.STATES.saving;
      this.textService.saveText(this.getText()).subscribe((res: any) => {
        if (res.ok === 1) {
          this.state = C.STATES.saved;
        }
      }, (err) => {
        this.state = C.STATES.notsaved;
        this.toastr.success('Попробуйте сохранить чуть позже!\n' + err, 'Что-то пошло не так!');
      });
    }
  }

  isSaving() {
    return this.state === C.STATES.saving;
  }

  isSaved() {
    return this.state === C.STATES.saved;
  }

  isNotSaved() {
    return this.state === C.STATES.notsaved;
  }


  saveByKeys(e) {
    e.preventDefault();
    e.stopPropagation();

    this.state = C.STATES.saving;
    //todo: DRY
    this.textService.saveText(this.getText()).subscribe((res: any) => {
      if (res.ok === 1) {
        this.state = C.STATES.saved;
        this.toastr.success('Сохранение прошло успешно!', 'Продолжайте!');
      }
    }, (err) => {
      this.state = C.STATES.notsaved;
      this.toastr.success('Попробуйте сохранить чуть позже!\n' + err, 'Что-то пошло не так!');
    });
  }

  putTab(e) {
    e.preventDefault();
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    this.textForm.get('text').setValue(this.getText().substring(0, start) + '\t' + this.getText().substring(end));
    return e.target.selectionStart = e.target.selectionEnd = start + 1;
  }


}
