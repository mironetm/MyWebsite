const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Go to index
  await page.goto('file:///Users/mihaelamironet/Downloads/Website2/index.html', { waitUntil: 'networkidle0' });
  let cards = await page.$$eval('.scroll-card', els => els.length);
  console.log("Index 1 cards:", cards);
  
  // Click about link
  await page.click('a[href="about.html"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  console.log("On About Page");
  
  // Click mironet link back to index
  await page.click('a.top-right-mironet');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  cards = await page.$$eval('.scroll-card', els => els.length);
  console.log("Index 2 cards:", cards);
  
  await browser.close();
})();
