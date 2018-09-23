import {RouterModule, Routes} from '@angular/router';
import {WordsAppComponent} from './words-app/layout/words-app/words-app.component';
import {LoginComponent} from './words-app/layout/login/login.component';
import {SignupComponent} from './words-app/layout/signup/signup.component';
import {AboutComponent} from './words-app/layout/about/about.component';

const appRoutes: Routes = [
  {path: '', component: WordsAppComponent},
  {path: 'signin', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
