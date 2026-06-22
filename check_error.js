const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:5174', { waitUntil: 'networkidle2' });
    
    // Login
    await page.type('input[name="email"]', 'admin@bossdoor.vn');
    await page.type('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    await page.waitForTimeout(2000);
    
    // Click Deals tab (Tiến độ)
    const tabs = await page.$$('.nav-item');
    for (let t of tabs) {
      const text = await page.evaluate(el => el.textContent, t);
      if (text.includes('Tiến độ')) {
        await t.click();
        console.log('Clicked Deals tab');
        break;
      }
    }
    
    await page.waitForTimeout(3000);
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
