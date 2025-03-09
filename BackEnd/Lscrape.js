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

async function Lscrape() {
    let driver;
    let urls = [];
    let companies = [];
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.l-spark.com/meet-our-companies/');

        await new Promise(resolve => setTimeout(resolve, 2000));

        let current = await driver.findElements(By.className('brx-option-text'));
        await current[3].click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        let port = await driver.findElements(By.className('brxe-rrlxiq'));
        let links = await driver.findElements(By.className('brxe-klokcm'));

        for (let i = 0; i < port.length; i++) {
            let comp = await port[i].getText();
            let link = await links[i].getAttribute("href");
            let name = comp.split(" ")[0].trim();
            companies.push(name);
            urls.push(link);
        }

        return {
            companies,
            urls,
            batch
        };

    } catch (error) {
        console.error(`Error during scraping:`, error.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }

}


module.exports = { Lscrape };
