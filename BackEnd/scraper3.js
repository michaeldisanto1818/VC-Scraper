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

async function scraper3() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://iganpartners.com/latest');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let filters = await driver.findElements(By.className('jet-radio-list__item'));

        await filters[1].click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        let dates = await driver.findElements(By.css('.elementor-icon-list-text.elementor-post-info__item.elementor-post-info__item--type-date'));
        date = await dates[0].getText();
        console.log(date);

        let news = await driver.findElements(By.className('jet-listing-dynamic-link__link'));

        await news[1].click();

        await new Promise(resolve => setTimeout(resolve, 5000));

        company_name = '*See Article*';
        date_published = date;
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


module.exports = { scraper3 };
