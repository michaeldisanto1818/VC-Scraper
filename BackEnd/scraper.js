const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function createDriver() {
    const options = new chrome.Options()
        options.addArguments('--headless=new'); // Remove this line if you want to see the browser
        options.addArguments('--ignore-certificate-errors');
        options.addArguments('--ignore-ssl-errors');

    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
}

async function delayedSendKeys(element, text) {
    for (let char of text) {
        await element.sendKeys(char);
        const delay = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

async function scraper() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://plugandplaytechcenter.com/venture-capital/investment-announcements');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let cards = await driver.findElements(By.css('pnp-investment-card'));
        if (cards.length > 0) {
            await cards[0].click();
            console.log('Clicked most recent investment card')
        } else {
            console.log('No investment cards found');
        }

        await new Promise(resolve => setTimeout(resolve, 5000));

        let date_element = await driver.findElement(By.className('text-md-light pnp-text-primary'));
        let date_published = await date_element.getText();
        console.log(date_published);

        let CurrentURL = await driver.getCurrentUrl();
        console.log(CurrentURL);

        let titles = await driver.findElements(By.className('title-xs-spacing pnp-text-primary'));
        if (titles.length > 0) {
            let title2 = titles[1];
            let full_title2 = await title2.getText(); 
            let BehindIndex = full_title2.indexOf('Behind');
            if (BehindIndex !== -1) {
                let company_name = full_title2.substring(BehindIndex+7).trim();
                return {
                    company_name,
                    date_published,
                    CurrentURL
                };
            } else {
                let company_name = full_title2;
                return {
                    company_name,
                    date_published,
                    CurrentURL
                };
            }
        } else {
            console.log('error finding titles');
        }

    } catch (error) {
        console.error(`Error during scraping:`, error.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }

}


module.exports = { scraper };
