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

async function APscrape() {
    let driver;
    let companies = []; 
    let urls = []; 
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://angelpad.com/a/cat/news/');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let word1 = "raised";
        let word2 = "raises";
        let word3 = "funding";
        let word4 = "Funding";

        let xPathQuery = `//*[contains(text(), '${word1}') or contains(text(), '${word2}') or contains(text(), '${word3}') or contains(text(), '${word4}')]`;

        let elements = await driver.findElements(By.xpath(xPathQuery));

        for (let i = 0; i < elements.length; i++) {
            let tagName = await elements[i].getTagName();
            if (tagName === "a") {
                let comp = await elements[i].getText();
                let name = comp.split(" ")[0].trim();
                console.log(name);
                companies.push(name);

                let url = await elements[i].getAttribute("href");
                urls.push(url);
            }
        }

        await new Promise(resolve => setTimeout(resolve, 8000));

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


module.exports = { APscrape };
