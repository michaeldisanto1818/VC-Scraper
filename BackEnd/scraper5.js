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

async function scraper5() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://brightspark.com/blog/latest');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let word1 = "deal";

        let xPathQuery = `//*[contains(text(), '${word1}')]`;

        let elements = await driver.findElements(By.xpath(xPathQuery));

        let port = elements[0];

        await driver.executeScript("arguments[0].style.backgroundColor = 'yellow';", port);

        let tagName = await port.getTagName();
        let text = await port.getText();

        console.log(tagName);
        console.log(text);

        let dates = await driver.findElements(By.className('text-gray-500'));
        let articles = await driver.findElements(By.xpath("//h5"));

        let index = 0;

        let i = 0;

        for (i; i < articles.length; i++) {
            let comp = await articles[i].getText();
            if (comp === text) {
                console.log(comp);
                index = i;
                break;
            }
        }

        date_published = await dates[index].getText();
        let words = text.split("in");
        company_name = words[3].trim();

        console.log(date_published);
        console.log(company_name);

        await new Promise (resolve => setTimeout(resolve, 2000));

        let buttons = await driver.findElements(By.className('btn-small'));
        await buttons[index].click();

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


module.exports = { scraper5 };
