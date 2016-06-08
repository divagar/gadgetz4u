import { Gadgetz4uPage } from './app.po';

describe('gadgetz4u App', function() {
  let page: Gadgetz4uPage;

  beforeEach(() => {
    page = new Gadgetz4uPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gadgetz4u works!');
  });
});
