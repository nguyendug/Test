const { chromium } = require("playwright");

describe("HideMyAcc Search Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto("https://hidemyacc.com/blog");
  }, 200000);

  afterAll(async () => {
    await browser.close();
  });

  test("Search for a keyword that does not exist", async () => {
    await page.fill('input[type="text"]', "423432432423");
    await page.press('input[type="text"]', "Enter");
    await page.waitForSelector(".site-main .posts-not-found");
    const errorMessage = await page.$eval(
      ".site-main .posts-not-found",
      (node) => node.innerText
    );
    expect(errorMessage).toBe("No posts found");
  });

  test("Search for a keyword that exists", async () => {
    await page.fill('input[type="text"]', "1");
    await page.press('input[type="text"]', "Enter");
    await page.waitForSelector(".post-feed");
    const postFeed = await page.$(".post-feed");
    expect(postFeed).toBeTruthy();
  });
});
