export class Gadgetz4uPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gadgetz4u-app h1')).getText();
  }
}
