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

async function Bscrape() {
    let driver;
    let urls = [];
    let companies = [];
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://skydeck.berkeley.edu/portfolio/');

        await new Promise(resolve => setTimeout(resolve, 2000));

        let ddl1 = await driver.findElement(By.className('custom-class-select'));
        //await ddl1.click();

        await new Promise(resolve => setTimeout(resolve, 1000));

        let lastOption = await driver.findElement(By.xpath("//select[contains(@class, 'custom-class-select')]/option[last()]"));
        batch = await lastOption.getText();
        await lastOption.click();        

        let ddl2 = await driver.findElement(By.className('custom-industry-select'));
        //await ddl2.click();

        let cohort = await driver.findElement(By.xpath("//option[text()='Cohort']"));
        await cohort.click();

        await new Promise(resolve => setTimeout(resolve, 2000));

        let comps = await driver.findElements(By.className('company-link'));

        for (let i = 0; i < comps.length; i++) {
            let comp = await comps[i].getText();
            let url = await comps[i].getAttribute("href");
            companies.push(comp);
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


module.exports = { Bscrape };
