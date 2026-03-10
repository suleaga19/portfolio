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
    
    console.log("Waiting 15 seconds for Figma to render and hiding UI...");
    await new Promise(r => setTimeout(r, 15000));
    
    // Attempt to hide Figma UI if present
    try {
        await page.evaluate(() => {
            const ui = document.querySelector('div[class*="toolbar"]');
            if(ui) ui.style.display = 'none';
        });
    } catch(e) {}

    console.log("Taking screenshots part 1...");
    await page.screenshot({ path: 'figma_capture_1.png' });
    
    // Simulate scroll down or page down
    console.log("Scrolling down...");
    await page.mouse.click(960, 540); // click in middle to focus
    await page.keyboard.press('PageDown');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'figma_capture_2.png' });
    
    await page.keyboard.press('PageDown');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'figma_capture_3.png' });
    
    await page.keyboard.press('PageDown');
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'figma_capture_4.png' });

    console.log("Screenshots saved!");
    await browser.close();
  } catch(e) {
    console.error("Error:", e);
    process.exit(1);
  }
})();
