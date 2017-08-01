import { TeamPursuitPage } from './app.po';

describe('team-pursuit App', () => {
  let page: TeamPursuitPage;

  beforeEach(() => {
    page = new TeamPursuitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
