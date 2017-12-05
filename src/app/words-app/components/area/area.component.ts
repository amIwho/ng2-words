import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextService} from '../../services/text.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

declare var moment: any;


@Component({
  selector: 'words-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  textForm: FormGroup;

  STATES = {
    saving: 'saving',
    saved: 'saved',
    notsaved: 'notsaved'
  };

  state = this.STATES.saved;

  currentDate: string;
  text: string;

  saving = false;

  @Input() date;
  @Output() updateCounter = new EventEmitter();

  constructor(private textService: TextService,
              private _fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initForm();

    this.currentDate = moment().format('DD.MM.YYYY');

    this.textService.getTextByDate(this.date).subscribe((text) => {
      this.textForm.get('text').patchValue(text[0].text, {emitEvent: false});
      setInterval(() => {this.save();}, 10000);
    });
  }

  initForm() {
    this.textForm = this._fb.group({
      text: this._fb.control('', Validators.required)
    });

    this.textForm.get('text').valueChanges.debounceTime(10).subscribe((text) => {
      this.state = this.STATES.notsaved;
      const wordsCount = this.getText().trim().split(/[\s,.;]+/).length;
      this.updateCounter.emit({wordsCount: wordsCount});
    });
  }

  getText() {
    return this.textForm.get('text').value;
  }

  save() {
    if (this.state === this.STATES.notsaved && this.getText()) {
      this.state = this.STATES.saving;
      this.textService.saveText(this.getText()).subscribe((res) => {
        if (res.json().ok === 1) {
          this.state = this.STATES.saved;
        }
      }, (err) => {
        this.state = this.STATES.notsaved;
        this.toastr.success('Попробуйте сохранить чуть позже!\n' + err, 'Что-то пошло не так!');
      });
    }
  }

  saveByKeys(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.getText()) {
      this.state = this.STATES.saving;
      this.textService.saveText(this.getText()).subscribe((res) => {
        if (res.json().ok === 1) {
          this.state = this.STATES.saved;
          this.toastr.success('Сохранение прошло успешно!', 'Продолжайте!');
        }
      }, (err) => {
        this.state = this.STATES.notsaved;
        this.toastr.success('Попробуйте сохранить чуть позже!\n' + err, 'Что-то пошло не так!');
      });
    }
  }

  putTab(e) {
    e.preventDefault();
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    this.textForm.get('text').setValue(this.getText().substring(0, start) + '\t' + this.getText().substring(end));
    return e.target.selectionStart = e.target.selectionEnd = start + 1;
  }


}
