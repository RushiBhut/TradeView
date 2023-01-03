import React, { useState } from 'react';
import Axios from 'axios';
import Chart from 'chart.js/auto';

function ExploreStocks() {
    const API_Key = "cem68dqad3if4v5vip70cem68dqad3if4v5vip7g";
    const API_Key_2 = "b849b2664d646c12e59d7fe1fbd1f98e";
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [price, setPrice] = useState("");
    const [exchange, setExchange] = useState("");
    const [chart, setChart] = useState(new Chart());
    let dates = [];
    let closingPrices = [];

    const getSearch = (event) => {
        event.preventDefault();
        if (search.length !== 0) {
            Axios.get(`https://finnhub.io/api/v1/quote?symbol=${search.toUpperCase()}&token=${API_Key}`)
            .then((response) => {
                if (response.data['d'] === null) {
                    document.querySelector(".card").style.display = "none";
                    document.querySelector(".invalid").style.display = "block";
                }

                else {
                    document.querySelector(".card").style.display = "block";
                    document.querySelector(".invalid").style.display = "none";
                    setSymbol(search.toUpperCase());
                    setPrice(response.data['c']);
                    
                    Axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${search.toUpperCase()}&token=${API_Key}`)
                    .then((response) => {
                        setName(response.data['name']);
                        setExchange(response.data['exchange']);
                    });

                    Axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${search.toUpperCase()}?serietype=line&apikey=${API_Key_2}`)
                    .then((response) => {
                        for (let i = 6; i >= 0; i--) {
                            dates.push(response.data['historical'][i]['date']);
                            closingPrices.push(response.data['historical'][i]['close']);
                        }

                        let config = {
                            type: 'line',
                            data: {
                                labels: dates,
                                datasets: [{
                                    label: 'Weekly Performance',
                                    data: closingPrices,
                                    fill: true,
                                    borderColor: 'rgb(255, 0, 0)',
                                    tension: 0.1
                                }]
                            },
                            options: {
                                plugins: {
                                    legend: {
                                        labels: {
                                            boxWidth: 0
                                        }
                                    }
                                }
                            }
                        };

                        setChart(new Chart(
                            document.getElementById('chart'),
                            config
                        ));
                    });
                }
            });
        }

        dates = [];
        closingPrices = [];
        if (search.length !== 0) {
            chart.destroy();
        }
        setSearch("");
    };

    return(
        <div>
            <h2 className="title">Search for Any Stock on the Market</h2>
            <form className="search" onSubmit={getSearch}>
                <input type="text" placeholder="Enter ticker symbol" onChange = {(event) => setSearch(event.target.value)} value={search}></input>
                <button type="submit">Search</button>
            </form>
            <div className="invalid">
                <h1>Please enter a valid ticker symbol!</h1>
            </div>
            <div className="card">
                <div className="stockinfo">
                    <h2>{name} ({symbol})</h2>
                    <h4>Exchange: {exchange}</h4>
                    <h1>${price} per share</h1>
                </div>
                <canvas id="chart"></canvas>
            </div>
        </div>
    );
}

export default ExploreStocks;
