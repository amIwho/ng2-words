import { Ng2WordsPage } from './app.po';

describe('ng2-words App', () => {
  let page: Ng2WordsPage;

  beforeEach(() => {
    page = new Ng2WordsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
