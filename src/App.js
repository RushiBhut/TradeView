import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import ExploreStocks from "./Pages/ExploreStocks";
import ExploreCrypto from "./Pages/ExploreCrypto";
import News from "./Pages/News";

function App() {
    return (
        <Router>
            <nav>
                <div className="container">
                    <h1>TradeView</h1>
                    <div className="menu">
                        <a href="/">Home</a>
                        <a href="/explorestocks">Explore Stocks</a>
                        <a href="/explorecrypto">Explore Crypto</a>
                        <a href="/news">News</a>
                    </div>
                </div>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/explorestocks" element={<ExploreStocks />}/>
                <Route path="/explorecrypto" element={<ExploreCrypto />}/>
                <Route path="/news" element={<News />}/>
            </Routes>
        </Router>
    );
}

export default App;
