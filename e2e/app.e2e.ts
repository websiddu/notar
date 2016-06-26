import { NotarPage } from './app.po';

describe('notar App', function() {
  let page: NotarPage;

  beforeEach(() => {
    page = new NotarPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('notar works!');
  });
});
