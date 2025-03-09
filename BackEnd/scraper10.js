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

async function scraper10() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://foundersfactory.com/articles/');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let html = await driver.findElement(By.css('html'));
        await html.click();

        for (let i = 0; i < 30; i++) {
            await html.sendKeys(Key.ARROW_DOWN);
            await driver.sleep(250);
        }

        let word1 = "Investing";

        let xPathQuery = `//*[contains(text(), '${word1}')]`;

        let elements = await driver.findElements(By.xpath(xPathQuery));

        let port = elements[0];

        await driver.executeScript("arguments[0].style.backgroundColor = 'yellow';", port);

        let tagName = await port.getTagName();
        let text = await port.getText();

        console.log(tagName);
        console.log(text);

        word = text.split(" in ")[1].trim();
        company_name = word.split("—")[0].trim();

        let titles = await driver.findElements(By.className('mb-4'));
        let index = null;

        for (let i = 0; i < titles.length; i++) {
            let comp = await titles[i].getText();
            if (comp === text) {
                index = i;
                break;
            }
        }

        let dates = await driver.findElements(By.css("time"));
        for (let i = 0; i < dates.length; i++) {
            if (i === (index-1)) {
                date_published = await dates[i].getAttribute("datetime");
            }
        }

        let urls = await driver.findElements(By.className('ff-button--undefined'));

        CurrentURL = await urls[index+13].getAttribute("href");

        await new Promise(resolve => setTimeout(resolve, 1000));

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


module.exports = { scraper10 };
