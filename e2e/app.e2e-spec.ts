import { AudioeditorPage } from './app.po';

describe('audioeditor App', function() {
  let page: AudioeditorPage;

  beforeEach(() => {
    page = new AudioeditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
