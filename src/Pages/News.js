import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function News() {
    const API_Key = "cem68dqad3if4v5vip70cem68dqad3if4v5vip7g";
    const [news, setNews] = useState([]);

    useEffect(() => {
        Axios.get(`https://finnhub.io/api/v1/news?category=general&token=${API_Key}`)
        .then((response) => {
            setNews(response.data.splice(0, 20));
        });
    }, [])

    return(
        <>
            <h2 className="newstitle">Explore Trending Financial News Articles</h2>
            {news.map(item => {
                return(
                    <div id="newscard">
                        <img src={item['image']} alt="C:\Users\rushi\Documents\tradeview\public\alt.jpg"></img>
                        <a id="url" href={item['url']}>View Article</a>
                        <h3 id="headline">{item['headline']}</h3>
                        <h5 id="source">By: {item['source']}</h5>
                        <p id="summary">{item['summary']}</p>
                    </div>
                )
            })}
        </>
    );
}

export default News;
