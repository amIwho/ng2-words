import {browser, by, element} from 'protractor';

export class Ng2WordsPage {
    static navigateTo() {
    return browser.get('/');
  }

    static getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
