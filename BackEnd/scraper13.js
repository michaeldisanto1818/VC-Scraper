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

async function scraper13() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://better-tomorrow-ventures.ghost.io/');
        await new Promise(resolve => setTimeout(resolve, 2000));

        let filter = await driver.findElement(By.className('nav-why-we-invested'));
        await filter.click();

        await new Promise(resolve => setTimeout(resolve, 1000));

        let titles = await driver.findElements(By.className('gh-card-title'));
        let title = await titles[0].getText();

        company_name = title.split("Invested in")[1].trim();

        let dates = await driver.findElements(By.className('gh-card-date'));
        date_published = await dates[0].getText();

        let links = await driver.findElements(By.className('gh-card-link'));
        CurrentURL = await links[0].getAttribute("href");
        
        return {
            company_name,
            date_published,
            CurrentURL
        };

    } catch (error) {
        console.error(`Error during scraping:`, error.message);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }

}


module.exports = { scraper13 };
