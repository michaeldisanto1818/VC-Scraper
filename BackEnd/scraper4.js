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

async function scraper4() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://www.framework.vc/articles');
        await new Promise(resolve => setTimeout(resolve, 3000));

        let word1 = "portfolio";
        let word2 = "Portfolio";

        let xPathQuery = `//*[contains(text(), '${word1}') or contains(text(), '${word2}')]`;

        let elements = await driver.findElements(By.xpath(xPathQuery));

        let port  = elements[1];

        await driver.executeScript("arguments[0].style.backgroundColor = 'yellow';", port);

        let tagName = await port.getTagName();
        let text = await port.getText();

        console.log(tagName);
        console.log(text);

        let p = await driver.findElements(By.id('w-node-_5bdda1c8-f4fa-0cde-5e2f-40a992a48561-d6744d36'));

        let i = 0;

        let index = 0;

        for (i; i < p.length; i++) {
            let comp = await p[i].getText();
            if (comp === text) {
                console.log(comp);
                index = i;
                break;
            }
        }

        let articles = await driver.findElements(By.className('blog-image'));
        let dates = await driver.findElements(By.className('heading-03-title'));

        article = articles[index];
        date = dates[index];

        date_published = await date.getText();
        console.log(date_published); 
        
        let words = text.split("joins");
        company_name = words[0].trim();
        console.log(company_name);

        await article.click();

        await new Promise(resolve => setTimeout(resolve, 3000));

        CurrentURL = await driver.getCurrentUrl();
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


module.exports = { scraper4 };
