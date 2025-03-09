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

async function scraper8() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.inovia.vc/press/');
        await new Promise(resolve => setTimeout(resolve, 5000));

        let filter = await driver.findElement(By.className('display_filter_posts'));

        await filter.click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        let ddl = await driver.findElements(By.className('fs-arrow'));

        for (i = 0; i < ddl.length; i++) {
            let tag = await ddl[i].getTagName();
            console.log(tag);
        }

        await driver.executeScript("arguments[0].closest('.fs-wrap').querySelector('.fs-dropdown').classList.remove('fs-hidden');", ddl[2]);
        await driver.sleep(500); 

        await new Promise(resolve => setTimeout(resolve, 3000));

        let port = await driver.findElements(By.className('fs-checkbox'));

        await driver.executeScript("arguments[0].click();", port[157]);

        await new Promise(resolve => setTimeout(resolve, 3000));

        let articles = await driver.findElements(By.className('item_name'));
        let dates = await driver.findElements(By.className('item_date'));

        let links = await driver.findElements(By.className('founder-item'));
        CurrentURL = await links[0].getAttribute("href");

        let name = await articles[0].getText();

        company_name = name.split(" ")[0].trim();

        date_published = await dates[0].getText();

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


module.exports = { scraper8 };
