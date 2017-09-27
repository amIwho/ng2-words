import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsAppComponent } from './words-app.component';

describe('WordsAppComponent', () => {
  let component: WordsAppComponent;
  let fixture: ComponentFixture<WordsAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
