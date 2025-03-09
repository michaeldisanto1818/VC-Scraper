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

async function YCscrape() {
    let driver;
    let urls = [];
    let companies = [];
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.ycombinator.com/companies');

        await new Promise(resolve => setTimeout(resolve, 2000));

        let checkboxes = await driver.findElements(By.className('_label_i9oky_241'));

        await checkboxes[5].click();

        batch = await checkboxes[5].getText();

        await new Promise(resolve => setTimeout(resolve, 2000));

        await checkboxes[12].click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        await checkboxes[20].click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        let lastHeight = await driver.executeScript("return document.body.scrollHeight");

        while (true) {
            await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
            await driver.sleep(2000); // Wait for new content to load

            let newHeight = await driver.executeScript("return document.body.scrollHeight");
            if (newHeight === lastHeight) break; // Stop if no new content loads
            lastHeight = newHeight;
        }

        let links = await driver.findElements(By.className('_company_i9oky_355'));

        for (let link of links) {
            let url = await link.getAttribute("href");
            urls.push(url);
        }

        let names = await driver.findElements(By.className('_coName_i9oky_470'));

        for (let name of names) {
            let company = await name.getText();
            companies.push(company);
        }

        console.log(companies.length);

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


module.exports = { YCscrape };
