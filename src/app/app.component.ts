import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ['.app { height: 100%;}']
})
export class AppComponent {
  title = 'app';
}

//todo: implement /about page
