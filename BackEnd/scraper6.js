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

async function scraper6() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://alatepartners.com/insights/');

        let selectors = await driver.findElements(By.className('h5'));

        await selectors[2].click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        let articles = await driver.findElements(By.className('h4'));

        let article = await articles[0].getText();

        console.log(article);

        let dates = await driver.findElements(By.className('h5'));

        date_published = await dates[4].getText();

        console.log(date_published);

        await new Promise(resolve => setTimeout(resolve, 5000));

        let words = article.split("Raises");
        company_name = words[0].trim();
        console.log(company_name);

        let clicks = await driver.findElements(By.className('thumb'));

        await clicks[0].click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        CurrentURL = await driver.getCurrentUrl();

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


module.exports = { scraper6 };
