import { browser, by, element } from 'protractor';

export class TweetPage {
    async navigateTo(): Promise<unknown> {
        return browser.get('/status/1318536307216363520');
    }

    async getProfileName(): Promise<string> {
        return element(by.css('app-tweet .profileInfo .profileName')).getText();
    }

    async getCount(): Promise<string> {
        return element(by.css('app-tweet .likesCount')).getText();
    }

    toggleLike() {
        return element(by.css('app-tweet .likesCount'));
    }

    toggleComment() {
        return element(by.css('.replyInfo'));
    }

    toggleCommentClick() {
        return element(by.css('.commentsCount'));
    } 
}
