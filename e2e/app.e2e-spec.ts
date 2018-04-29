import { AppPage } from './app.po';

describe('porkemon-gallery App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have Search Pokemon label', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Search Pokemon');
  });
});
