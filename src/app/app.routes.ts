import {Routes, RouterModule} from '@angular/router';
import {WordsAppComponent} from "./words-app/layout/words-app/words-app.component";
import {LoginComponent} from "./words-app/layout/login/login.component";
import {SignupComponent} from "./words-app/layout/signup/signup.component";

const appRoutes: Routes = [
  {path: '', component: WordsAppComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sendToken', component: SignupComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
