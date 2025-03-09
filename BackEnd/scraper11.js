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

async function scraper11() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://laireastlabs.com/news/');
        await new Promise(resolve => setTimeout(resolve, 2000));

        let word1 = "#PortfolioNews";

        let xPathQuery = `//*[contains(text(), '${word1}')]`;

        let element = await driver.wait(until.elementLocated(By.xpath(xPathQuery)), 10000);

        await driver.executeScript("arguments[0].style.backgroundColor = 'yellow'; arguments[0].style.color = 'black';", element);

        let links = await driver.findElements(By.xpath("//div[@class='announcementBrief']//a"));
        company_name = await links[0].getText();
        let hereLink = await driver.findElement(By.xpath("//div[@class='announcementBrief']//a[contains(text(), 'here')]"));
        CurrentURL = await hereLink.getAttribute("href");

        date_published = "N/A";
        
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


module.exports = { scraper11 };
