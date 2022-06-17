import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import nodemailer from 'nodemailer';
import moment from 'moment';
import { format } from 'path';

dotenv.config();

// ELLE
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.elle.com.hk%2F', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const elleSheet             = doc.sheetsById[0]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await elleSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await elleSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });
})();

// Cosmo
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.cosmopolitan.com.hk%2F', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const cosmoSheet            = doc.sheetsById[20914483]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await cosmoSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await cosmoSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });
})();

// Esquire
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.esquirehk.com%2F', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const esquireSheet          = doc.sheetsById[1417022314]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await esquireSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await esquireSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });
})();

// HB
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.harpersbazaar.com.hk%2F', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const hbSheet               = doc.sheetsById[225516983]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await hbSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await hbSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });
})();

// Cosmart
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.cosmart.hk%2F', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const cosmartSheet          = doc.sheetsById[1412392396]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await cosmartSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await cosmartSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });
})();

// Letzshop
(async () => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://search.google.com/search-console/core-web-vitals?resource_id=sc-domain%3Aletzshop.hk', {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(10000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(100000);

    const coreWebVital = await page.evaluate(() => {
        const data       = [];
        const containers = document.querySelectorAll('.qL2dyd');
        containers.forEach((el) => {
            data.push(parseInt(el.innerHTML.match(/\d/g).join(''), 10));
        })
        data.map((x) => {
            return parseInt(x, 10);
        });

        return data;
    });
    
    const todayDate = await page.evaluate(() => {
        return document.getElementsByClassName("zTJZxd")[0].innerHTML.slice(-7);
    });
    const formattedDate = moment(todayDate, "MM/DD/YY").format("DD/MM/YYYY");

    await page.waitForTimeout(1000);
    await browser.close();

    const doc = new GoogleSpreadsheet('1R-gfnr9p-VeZdE8_a7lgh-YS8q3kaWfij4ZCFHrD7qk');
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const letzshopSheet         = doc.sheetsById[1571063584]
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await letzshopSheet.addRow({
        Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
    });

    await letzshopSheet.addRow({
        Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
    });

    // Send Email 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'philip.chiang@scmp.com',
            pass: 'btkouzjpvvmgmxwa',
        },
    });
    
    const mailOptions = {
        from: 'philip.chiang@scmp.com',
        to: 'philip.chiang@scmp.com, kei.ling@scmp.com',
        subject: '[Core Web Vital] Report has been updated',
        text: 'The report has been updated already. Please check. Thanks.',
    };
    
    transporter.sendMail(mailOptions);
})();
