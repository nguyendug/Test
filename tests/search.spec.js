const { test, expect } = require('@playwright/test');

test.describe('HideMyAcc Search Test', () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://hidemyacc.com/blog');
    });

    test('Search for a keyword that does not exist', async () => {
        await page.fill('input[type="text"]', '423432432423');
        await page.press('input[type="text"]', 'Enter');
        await page.waitForSelector('.site-main .posts-not-found');
        const errorMessage = await page.$eval(
            '.site-main .posts-not-found',
            (node) => node.innerText
        );
        expect(errorMessage).toBe('No posts found');
    });

    test('Search for a keyword that exists', async () => {
        await page.fill('input[type="text"]', '1');
        await page.press('input[type="text"]', 'Enter');
        await page.waitForSelector('.post-feed');
        const postFeed = await page.$('.post-feed');
        expect(postFeed).toBeTruthy();
    });
});