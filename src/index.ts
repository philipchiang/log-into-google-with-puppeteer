import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import nodemailer from 'nodemailer';
import moment from 'moment';
import { format } from 'path';

dotenv.config();

const updateSheet = async (url: string, sheetId: number) => {
    puppeteerExtra.use(stealthPlugin());
    const browser = await puppeteerExtra.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 0});
    await page.type('[type="email"]', process.env.gmailUsername);
    await page.click('#identifierNext');
    await page.waitForTimeout(5000);

    await page.type('[type="password"', process.env.password);
    await page.click('#passwordNext');
    
    await page.waitForTimeout(10000);

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

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet                 = doc.sheetsById[sheetId];
    const mobileTotal           = coreWebVital.slice(0, 3).reduce((a, b) => a + b);
    const desktopTotal          = coreWebVital.slice(3, 6).reduce((a, b) => a + b);
    const averageGoodPercentage = (coreWebVital[2]/mobileTotal + coreWebVital[5]/desktopTotal)/2;

    await sheet.addRows([
        {
            Date: formattedDate, Type: 'Mobile:', Poor: coreWebVital[0], 'Need Improvement': coreWebVital[1], Good: coreWebVital[2], Total: mobileTotal, 'Poor %': coreWebVital[0]/mobileTotal, 'Improvement %': coreWebVital[1]/mobileTotal, 'Good %': coreWebVital[2]/mobileTotal
        },
        {
            Date: formattedDate, Type: 'Desktop:', Poor: coreWebVital[3], 'Need Improvement': coreWebVital[4], Good: coreWebVital[5], Total: desktopTotal, 'Poor %': coreWebVital[3]/desktopTotal, 'Improvement %': coreWebVital[4]/desktopTotal, 'Good %': coreWebVital[5]/desktopTotal, Average: averageGoodPercentage
        },
    ]);    
}

const elle = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.elle.com.hk%2F', 0);
};

const cosmo = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.cosmopolitan.com.hk%2F', 20914483);
};

const esquire = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.esquirehk.com%2F', 1417022314)
};

const hb = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.harpersbazaar.com.hk%2F', 225516983)
};

const cosmart = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Fwww.cosmart.hk%2F', 1412392396)
};

const letzshop = async () => {
    await updateSheet('https://search.google.com/search-console/core-web-vitals?resource_id=sc-domain%3Aletzshop.hk', 1571063584)
};

const sendEmail = () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODE_MAILER_AUTH_USER,
            pass: process.env.NODE_MAILER_AUTH_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: process.env.NODE_MAILER_AUTH_USER,
        to: 'philip.chiang@scmp.com, kei.ling@scmp.com',
        subject: '[Core Web Vital] Report has been updated',
        text: 'The report has been updated already. Please check. Thanks.',
    };
    
    transporter.sendMail(mailOptions);
}

(async () => {
    await elle();
    await cosmo();
    await esquire();
    await hb();
    await cosmart();
    await letzshop();
    sendEmail();
})();
