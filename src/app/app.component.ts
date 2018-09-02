import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="app container">
            <router-outlet></router-outlet>
        </div>
    `,
    styles: ['.app { height: 100%;}']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor() {
    }

    ngOnInit(): void {
    }


}
