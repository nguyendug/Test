const { chromium } = require("playwright");

// Test login
describe("HideMyAcc Login Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto("https://app.hidemyacc.com/login");
  }, 20000);

  afterAll(async () => {
    await browser.close();
  });
  test("Login with invalid credentials", async () => {
    await page.fill('input[type="email"]', "example@test.com");
    await page.fill('input[type="password"]', "password");
    const signInButton = await page.$(
      'button[class="fw-bold bg-yellow color-white rounded-pill px-4 py-2"]'
    );
    await signInButton.click();
    await page.waitForSelector(".toast.fade.show .text-danger");
    const errorMessage = await page.$eval(
      ".toast.fade.show .text-danger",
      (node) => node.innerText
    );
    expect(errorMessage).toBe("Wrong username or password");
  });
  test("Login without entering credentials", async () => {
    // Clear
    await page.fill('input[type="email"]', "");
    await page.fill('input[type="password"]', "");
    const signInButton = await page.$(
      'button[class="fw-bold bg-yellow color-white rounded-pill px-4 py-2"]'
    );
    await signInButton.click();
    await page.waitForSelector(".toast.fade.show .text-danger");
    const errorMessage = await page.$eval(
      ".toast.fade.show .text-danger",
      (node) => node.innerText
    );
    expect(errorMessage).toBe("Please enter your email and password");
  });
});
