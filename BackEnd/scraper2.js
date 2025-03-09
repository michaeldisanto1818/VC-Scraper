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

async function scraper2() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.golden.ventures/news');
        await new Promise(resolve => setTimeout(resolve, 5000));

        let searchBar = await driver.findElement(By.id('field'));

        await delayedSendKeys(searchBar, '$');
        await searchBar.sendKeys(Key.RETURN);

        let news = await driver.findElements(By.className('w-dyn-item'));
        let news_company = await driver.findElements(By.className('news__company'));
        let dates = await driver.findElements(By.className('news__date'));

        let i = 1

        for (i; i < news.length; i++) {
            let company = await news_company[i].getText();
            console.log(company);
            if (company.trim().length > 0 && company !== 'COMPOSER') {
                break;
            }
        }

        company_name = await news_company[i].getText();
        date_published = await dates[i].getText();
        await news[i].click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        CurrentURL = await driver.getCurrentUrl();

        await new Promise(resolve => setTimeout(resolve, 8000));

        console.log(company_name);
        console.log(date_published);
        console.log(CurrentURL);
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


module.exports = { scraper2 };
