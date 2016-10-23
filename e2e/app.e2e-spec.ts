import { AudioreadereditorPage } from './app.po';

describe('audioreadereditor App', function() {
  let page: AudioreadereditorPage;

  beforeEach(() => {
    page = new AudioreadereditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
