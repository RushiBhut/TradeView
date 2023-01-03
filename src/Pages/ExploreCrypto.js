import React, { useState } from 'react';
import Axios from 'axios';
import Chart from 'chart.js/auto';

function ExploreCrypto() {
    const API_Key = "b849b2664d646c12e59d7fe1fbd1f98e";
    const [search, setSearch] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [price, setPrice] = useState("");
    const [chart, setChart] = useState(new Chart());
    let dates = [];
    let closingPrices = [];

    const getSearch = (event) => {
        event.preventDefault();
        if (search.length !== 0) {
            Axios.get(`https://api.coingecko.com/api/v3/search?query=${search.toUpperCase()}`)
            .then((response) => {
                if (response.data['coins'].length === 0) {
                    document.querySelector(".card").style.display = "none";
                    document.querySelector(".invalid").style.display = "block";
                }
                
                else {
                    document.querySelector(".card").style.display = "block";
                    document.querySelector(".invalid").style.display = "none";
                    setName(response.data['coins'][0]['name']);
                    setSymbol(response.data['coins'][0]['symbol']);
                    
                    Axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${search.toUpperCase()}&tsyms=USD`)
                    .then((response) => {
                        setPrice(response.data['USD']);
                    });

                    Axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${search.toUpperCase() + "USD"}?serietype=line&apikey=${API_Key}`)
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
            <h2 className="title">Search for Any Cryptocurrency on the Market</h2>
            <form className="search" onSubmit={getSearch}>
                <input type="text" placeholder="Enter ticker symbol" onChange = {(event) => setSearch(event.target.value)} value={search}></input>
                <button type="submit">Search</button>
            </form>
            <div className="invalid">
                <h1>Please enter a valid ticker symbol!</h1>
            </div>
            <div className="card">
                <div className="cryptoinfo">
                    <h2>{name} ({symbol})</h2>
                    <h1>${price} per coin</h1>
                </div>
                <canvas id="chart"></canvas>
            </div>
        </div>
    );
}

export default ExploreCrypto;
