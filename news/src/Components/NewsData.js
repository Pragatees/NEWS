import React, { useEffect, useState } from "react";
import getnews from '../Service/getnews';
import moment from 'moment';
import alanBtn from '@alan-ai/alan-sdk-web';

function NewsData() {
  const [news, setNews] = useState([]);
  const [opt, setOpt] = useState("General");
  const alan_key = '269af757c49a57202efea3643d8c656c2e956eca572e1d8b807a3e2338fdd0dc/stage';

  const selectCat = (event) => {
    setOpt(event.target.value);
  };

  useEffect(() => {
    // Initialize Alan AI
    alanBtn({
      key: alan_key,
      onCommand: (commandData) => {
          console.log(commandData.data);
          setOpt(commandData.data);
      }
    });

    
  }); 
  useEffect(() => {
    const getAllNews = async () => {
      try {
        const response = await getnews(opt);
        setNews(response.data.articles);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getAllNews();
  }, [opt]); // Dependency added to run the effect when opt changes

  return (
    <div className="main">
       <div style={{ marginTop: '17200px' }}></div> {/* Adjusted marginTop */}
      <h1>News</h1>
      <div className="select">
        <label htmlFor="category">Choose a category:</label>
        <select className="select-box" name="category" id="category" onChange={selectCat} value={opt}>
          <option value="General">General</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
          <option value="Sports">Sports</option>
        </select>
      </div>
      <div className="grid-main">
        {news.map((article, index) => (
          <div className="grid-child" key={index}>
            <img className="news-image" src={article.urlToImage} alt="News" />
            <p className="news-tit">{article.title}</p>
            <p className="new-content">{article.content}</p>
            <div className="space-bet">
              <p className="news-author">Author : {article.author}</p>
              <p className="news-date">Date : {moment(article.publishedAt).format('LL')}</p>
            </div>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Get More About This...</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsData;
