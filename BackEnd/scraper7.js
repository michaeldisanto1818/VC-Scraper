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

async function scraper7() {
    let driver;
    let company_name = ''; 
    let date_published = ''; 
    let CurrentURL = '';
    try {
        driver = await createDriver();
        
        await driver.get('https://fi.co/news');
        await new Promise(resolve => setTimeout(resolve, 5000));

        let flags = await driver.findElements(By.css('img'));
        let names = await driver.findElements(By.css('h3'));
        let urls = await driver.findElements(By.css('a'));

        urls = urls.slice(57);

        let dates = await driver.findElements(By.css('span'));
        dates = dates.slice(18);
        dates = dates.filter((_, index) => index % 2 !== 0);

        for (let i = 0; i < flags.length; i++) {
            let flag = flags[i].getAttribute("src");
            if (flag = "https://fi.co/assets/pages/flags/us-eecb7f4a2a5f28…ba41aecd4f9eec54ca40b6a8fd10368c8a07761208cf5.svg") {
                let comp = await names[i].getText();
                date_published = await dates[i].getText();
                CurrentURL = await urls[i].getAttribute("href");
                console.log(comp);
                company_name = comp;
                break;
            }
        }


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


module.exports = { scraper7 };
