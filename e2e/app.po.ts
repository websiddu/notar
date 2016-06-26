export class NotarPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('notar-app h1')).getText();
  }
}
