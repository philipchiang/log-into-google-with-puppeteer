import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    // const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://accounts.google.com/signin/v2/identifier');
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(1500);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');


    await page.waitForTimeout(55000);


    await browser.close();
})();