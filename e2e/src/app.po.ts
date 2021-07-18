import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl+'/status/1318536307216363520');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
}
