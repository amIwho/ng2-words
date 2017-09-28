import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from "@angular/http";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./words-app/components/header/header.component";
import {WordsAppComponent} from "./words-app/layout/words-app/words-app.component";
import {TimelineComponent} from "./words-app/components/timeline/timeline.component";
import {AreaComponent} from "./words-app/components/area/area.component";
import {UserService} from "./words-app/services/user.service";
import {TimelineService} from "./words-app/services/timeline.service";
import {TextService} from "./words-app/services/text.service";
import {CapitalizePipe} from './words-app/pipes/capitalize.pipe';
import {WordsHttpService} from "./words-app/services/words-http.service";
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './words-app/layout/login/login.component';
import { SignupComponent } from './words-app/layout/signup/signup.component';

import {routing} from "./app.routes";

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import "rxjs/add/operator/map";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WordsAppComponent,
    TimelineComponent,
    AreaComponent,
    CapitalizePipe,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    TimelineService,
    TextService,
    WordsHttpService,
    {provide: LOCALE_ID, useValue: "ru-RU"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
