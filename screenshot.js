const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    console.log("Navigating to Figma...");
    await page.goto('https://www.figma.com/proto/umV7F4wBEfRUNvK0p2sNIY/PORTFOLIO?node-id=33-232&t=ft0QnRqxc86KvRLK-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=33%3A232', { waitUntil: 'networkidle2', timeout: 60000 });
    console.log("Waiting 10 seconds for Figma canvas to render completely...");
    await new Promise(r => setTimeout(r, 10000));
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'figma_screenshot.png', fullPage: true });
    console.log("Screenshot saved to figma_screenshot.png!");
    await browser.close();
  } catch(e) {
    console.error("Error:", e);
    process.exit(1);
  }
})();
