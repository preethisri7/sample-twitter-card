import { TweetPage } from "./tweet.po";

describe('Tweet tests', () => {
    let tweetPage: TweetPage;

    beforeEach(() => {
        tweetPage = new TweetPage();
        tweetPage.navigateTo();        
    });
    it('Should display profile name', async() => {
        await tweetPage.navigateTo();
        expect(await tweetPage.getProfileName()).toEqual('ABOUT YOU TECH');
    });
    it('Should toggle like and dislike by click', async() => {
        await tweetPage.navigateTo();
        expect(await tweetPage.getCount()).toEqual('2');
        tweetPage.toggleLike().click()
        expect(await tweetPage.getCount()).toEqual('3');
    });
    it('Should Open and Close Comments', async() => {
        await tweetPage.navigateTo();
        expect(await tweetPage.toggleComment().isPresent()).toBe(false);
        await tweetPage.toggleCommentClick().click();
        expect(await tweetPage.toggleComment().isPresent()).toBe(true);
        await tweetPage.toggleCommentClick().click();
        expect(await tweetPage.toggleComment().isPresent()).toBe(false);

    });
});

