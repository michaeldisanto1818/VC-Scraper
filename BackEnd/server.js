const express = require('express');
const bodyParser = require('body-parser');
const {scraper} = require('./scraper');
const {scraper2} = require('./scraper2');
const {scraper3} = require('./scraper3');
const {scraper4} = require('./scraper4');
const {scraper5} = require('./scraper5');
const {scraper6} = require('./scraper6');
const {scraper7} = require('./scraper7');
const {scraper8} = require('./scraper8');
const {scraper9} = require('./scraper9');
const {scraper10} = require('./scraper10');
const {scraper11} = require('./scraper11');
const {scraper12} = require('./scraper12');
const {scraper13} = require('./scraper13');
const {YCscrape} = require('./YCscrape');
const {APscrape} = require('./APscrape');
const {AAscrape} = require('./AAscrape');
const {ALscrape} = require('./ALscrape');
const {Lscrape} = require('./Lscrape');
const {Bscrape} = require('./Bscrape');
const cors = require('cors');

async function server() {
    const app = express();
    const PORT = 5000;

    app.use(cors());
    app.use(bodyParser.json());

    app.post('/scrape', async (req, res) => {
        try {
            const { 
                scraper1: runScraper1, 
                scraper2: runScraper2, 
                scraper3: runScraper3, 
                scraper4: runScraper4, 
                scraper5: runScraper5, 
                scraper6: runScraper6, 
                scraper7: runScraper7,
                scraper8: runScraper8,
                scraper9: runScraper9,
                scraper10: runScraper10,
                scraper11: runScraper11,
                scraper12: runScraper12,
                scraper13: runScraper13,
                YCscrape: runYCscrape, 
                APscrape: runAPscrape,
                AAscrape: runAAscrape,
                ALscrape: runALscrape,
                Lscrape: runLscrape,
                Bscrape: runBscrape
            } = req.body;
            const ScrapedData = {};
            
            if (runYCscrape || runAPscrape || runAAscrape || runALscrape || runLscrape || runBscrape) {
                if (runYCscrape) {
                    ScrapedData.YCscrape = await YCscrape();
                }
                if (runAPscrape) {
                    ScrapedData.APscrape = await APscrape();
                }
                if (runAAscrape) {
                    ScrapedData.AAscrape = await AAscrape();
                }
                if (runALscrape) {
                    ScrapedData.ALscrape = await ALscrape();
                }
                if (runLscrape) {
                    ScrapedData.Lscrape = await Lscrape();
                }
                if (runBscrape) {
                    ScrapedData.Bscrape = await Bscrape();
                }
            } else {
                if (runScraper1) {
                    ScrapedData.scraper1 = await scraper();
                }
                if (runScraper2) {
                    ScrapedData.scraper2 = await scraper2();
                }
                if (runScraper3) {
                    ScrapedData.scraper3 = await scraper3();
                }
                if (runScraper4) {
                    ScrapedData.scraper4 = await scraper4();
                }
                if (runScraper5) {
                    ScrapedData.scraper5 = await scraper5();
                }
                if (runScraper6) {
                    ScrapedData.scraper6 = await scraper6();
                }
                if (runScraper7) {
                    ScrapedData.scraper7 = await scraper7();
                }
                if (runScraper8) {
                    ScrapedData.scraper8 = await scraper8();
                }
                if (runScraper9) {
                    ScrapedData.scraper9 = await scraper9();
                }
                if (runScraper10) {
                    ScrapedData.scraper10 = await scraper10();
                }
                if (runScraper11) {
                    ScrapedData.scraper11 = await scraper11();
                }
                if (runScraper12) {
                    ScrapedData.scraper12 = await scraper12();
                }
                if (runScraper13) {
                    ScrapedData.scraper13 = await scraper13();
                }
            }
            res.json({ 
                message: 'Scraping complete!',
                data: ScrapedData
            });
        } catch (error) {
            console.error('Scraping error:', error);
            res.status(500).json({ message: 'An error occurred during scraping'});
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

module.exports = { server };