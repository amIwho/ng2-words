import {Ng2WordsPage} from './app.po';

describe('ng2-words App', function () {
  let page: Ng2WordsPage;

  beforeEach(() => {
    page = new Ng2WordsPage();
  });

    it('should display message saying app works', () => {
    page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
  });
});
