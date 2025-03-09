import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [isScraperRunning, setIsScraperRunning] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);
  const [selectedScrapers, setSelectedScrapers] = useState({
    scraper1: false,
    scraper2: false,
    scraper3: false,
    scraper4: false,
    scraper5: false,
    scraper6: false,
    scraper7: false,
    scraper8: false,
    scraper9: false,
    scraper10: false,
    scraper11: false,
    scraper12: false,
    scraper13: false,
    YCscrape: false,
    APscrape: false,
    AAscrape: false,
    ALscrape: false,
    Lscrape: false,
    Bscrape: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  
    if (name === "APscrape" || name === "YCscrape" || name === "AAscrape" || name === "ALscrape" || name === "Lscrape" || name === "Bscrape") {
      // If selecting scraper7 or YCscrape, disable the first _ scrapers
      setSelectedScrapers((prevState) => ({
        scraper1: false,
        scraper2: false,
        scraper3: false,
        scraper4: false,
        scraper5: false,
        scraper6: false,
        scraper7: false,
        scraper8: false,
        scraper9: false,
        scraper10: false,
        scraper11: false,
        scraper12: false,
        scraper13: false,
        ...prevState,
        [name]: checked,
      }));
    } else {
      // If selecting one of the first _ scrapers, disable APscrape, AAscrape & YCscrape
      setSelectedScrapers((prevState) => ({
        ...prevState,
        [name]: checked,
        APscrape: false,
        YCscrape: false,
        AAscrape: false,
        ALscrape: false,
        Lscrape: false,
        Bscrape: false
      }));
    }
  };  

  const handleScrape = async () => {
    setIsScraperRunning(true);
    try {
      const response = await fetch('http://localhost:5000/scrape', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedScrapers)
      });
      const data = await response.json();
      console.log(data);
      setScrapedData(data.data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while scraping');
    } finally {
      setIsScraperRunning(false);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        {[
          { key: "scraper1", label: "Plug & Play Tech" },
          { key: "scraper2", label: "Golden Ventures" },
          { key: "scraper3", label: "iGan Partners" },
          { key: "scraper4", label: "Framework" },
          { key: "scraper5", label: "Brightspark" },
          { key: "scraper6", label: "Alate Partners" },
          { key: "scraper7", label: "Founder Institute" },
          { key: "scraper8", label: "Inovia" },
          { key: "scraper9", label: "Endless Frontier Labs" },
          { key: "scraper10", label: "Founders Factory" },
          { key: "scraper11", label: "Lair East Labs" },
          { key: "scraper12", label: "Highline Beta" },
          { key: "scraper13", label: "Better Tomorrow Ventures" }
        ].map(({ key, label }) => (
          <label key={key}>
              <input
                type="checkbox"
                name={key}
                checked={selectedScrapers[key]}
                onChange={handleCheckboxChange}
                disabled={selectedScrapers.APscrape || selectedScrapers.YCscrape || selectedScrapers.AAscrape || selectedScrapers.ALscrape || selectedScrapers.Lscrape || selectedScrapers.Bscrape} // Disable if APscrape, AAscrape, or YCscrape is selected
              />
            {label}
          </label>
        ))}

        <label>
          <input
            type="checkbox"
            name="APscrape"
            checked={selectedScrapers.APscrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)} // Disable if any of first 6 scrapers are selected
          />
          AngelPad
        </label>

        <label>
          <input
            type="checkbox"
            name="YCscrape"
            checked={selectedScrapers.YCscrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)} // Disable if any of first 6 scrapers are selected
          />
          Y-Combinator
        </label>

        <label>
          <input
            type="checkbox"
            name="AAscrape"
            checked={selectedScrapers.AAscrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)}
          />
          Alchemist Accelerator
        </label>
        <label>
          <input
            type="checkbox"
            name="ALscrape"
            checked={selectedScrapers.ALscrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)}
          />
          alphalab
        </label>
        <label>
          <input
            type="checkbox"
            name="Lscrape"
            checked={selectedScrapers.Lscrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)}
          />
          L-Spark
        </label>
        <label>
          <input
            type="checkbox"
            name="Bscrape"
            checked={selectedScrapers.sBcrape}
            onChange={handleCheckboxChange}
            disabled={Object.values(selectedScrapers).slice(0, 13).some(val => val)}
          />
          Berkeley SkyDeck
        </label>
        </div>

        <button
          onClick={handleScrape}
          disabled={
            isScraperRunning ||
            Object.values(selectedScrapers).every((val) => val === false) // Disable if no scraper selected
          }
          className="app-button"
        >
          {isScraperRunning ? 'Scraping...' : 'Start Scraper'}
        </button>
        {scrapedData && (
          <div>
            <h2>Scraped Data:</h2>
            {Object.entries(scrapedData).map(([scraper, data]) => {
              const scraperNames = {
                scraper1: "Plug & Play Tech",
                scraper2: "Golden Ventures",
                scraper3: "iGan Partners",
                scraper4: "Framework",
                scraper5: "Brightspark",
                scraper6: "Alate Partners",
                scraper7: "Founder Institute",
                scraper8: "Inovia",
                scraper9: "Endless Frontier Labs",
                scraper10: "Founders Factory",
                scraper11: "Lair East Labs",
                scraper12: "Highline Beta",
                scraper13: "Better Tomorrow Ventures",
                YCscrape: "Y-Combinator",
                APscrape: "AngelPad",
                AAscrape: "Alchemist Accelerator",
                ALscrape: "alphalab",
                Lscrape: "L-Spark",
                Bscrape: "Berkeley SkyDeck"
              };

              return (
                <div key={scraper}>
                  <h3>{scraperNames[scraper] || scraper}:</h3>
                  
                  {scraper === "YCscrape" || scraper === "APscrape" || scraper === "AAscrape" || scraper === "ALscrape" || scraper === "Lscrape" || scraper === "Bscrape" ? (
                  <>
                    <p><b>{data.batch}</b></p>
                    {data.companies.map((company, index) => (
                      <div key={index}>
                        <p>Startup Name: {company}</p>
                        <p>URL: {data.urls[index]}</p>
                      </div>
                    ))}
                  </>
                  ) : (
                    // Default Formatting for Other Scrapers
                    <>
                      <p>Company Name: {data.company_name}</p>
                      <p>Date Published: {data.date_published}</p>
                      <p>URL: {data.CurrentURL}</p>
                    </>
                  )}
                </div>
              );
            })}

          </div>
        )}
      </header>
    </div>
  );
}

export default App;
