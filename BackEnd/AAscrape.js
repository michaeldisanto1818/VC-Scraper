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

async function AAscrape() {
    let driver;
    let companies = []; 
    let urls = []; 
    let batch = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.alchemistaccelerator.com/portfolio');
        await new Promise(resolve => setTimeout(resolve, 3000));

        await driver.executeScript("window.scrollBy(0, 500);");
        await driver.sleep(500); // Wait a bit before next scroll
        

        let ddl = await driver.findElement(By.id('ddlClasses'));

        await ddl.click();

        let option = await ddl.findElement(By.css("option[value='38']"));

        batch = await option.getText();

        await option.click();

        await ddl.click();

        await driver.executeScript("window.scrollBy(0, 250);");
        await driver.sleep(500);

        await new Promise(resolve => setTimeout(resolve, 5000));

        let names = await driver.findElements(By.xpath("//div[contains(@class, 'feature_text')]"));
        
        let links = await driver.findElements(By.className('link'));

        for (let i = 0; i < names.length; i++) {
            let name = await names[i].getText();
            let url = await links[i].getAttribute("href");
            console.log(name);
            companies.push(name);
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


module.exports = { AAscrape };
