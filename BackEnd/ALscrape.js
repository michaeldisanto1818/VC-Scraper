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

async function ALscrape() {
    let driver;
    let urls = [];
    let companies = [];
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.alphalab.org/news/');

        await new Promise(resolve => setTimeout(resolve, 3000));

        let buttons = await driver.findElements(By.className('category-button'));

        await buttons[3].click();

        await new Promise(resolve => setTimeout(resolve, 5000));

        let titles = await driver.findElements(By.className('post-title'));

        let links = await driver.findElements(By.css('a'));

        for (let i = 0; i < titles.length; i++) {
            let title = await titles[i].getText();
            let comp = title.split(" ")[1].trim();
            companies.push(comp);
        }

        for (let i = 26; i < links.length; i += 2) {
            let url = await links[i].getAttribute("href");
            urls.push(url);
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


module.exports = { ALscrape };
