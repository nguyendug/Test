const { test, expect } = require('@playwright/test');

test('Test pricing page', async ({ page }) => {
  await page.goto('https://hidemyacc.com/pricing');

  // Lấy giá của các gói cước ban đầu
  const starterPrice = await page.$eval('.card-item-plans:has(h3:has-text("Starter")) .price', element => element.textContent);
  const basePrice = await page.$eval('.card-item-plans:has(h3:has-text("Base")) .price', element => element.textContent);
  const sharePrice = await page.$eval('.card-item-plans:has(h3:has-text("Share")) .price', element => element.textContent);

  // Kiểm tra giá của các gói cước
  expect(starterPrice).toBe('$15');
  expect(basePrice).toBe('$25');
  expect(sharePrice).toBe('$3');

  // Click vào switch
  await page.click('label[for="switch"]');

  // Lấy giá của các gói cước sau khi click vào switch
  const starterPriceAfterClick = await page.$eval('.card-item-plans:has(h3:has-text("Starter")) .price', element => element.textContent);
  const basePriceAfterClick = await page.$eval('.card-item-plans:has(h3:has-text("Base")) .price', element => element.textContent);
  const sharePriceAfterClick = await page.$eval('.card-item-plans:has(h3:has-text("Share")) .price', element => element.textContent);

  // Kiểm tra giá của các gói cước sau khi click vào switch
  expect(starterPriceAfterClick).toBe('$29');
  expect(basePriceAfterClick).toBe('$49');
  expect(sharePriceAfterClick).toBe('$5');
});