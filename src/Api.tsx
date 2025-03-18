import { useEffect, useState, useRef } from "react";
import "./index.css"

const Api = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailsRef = useRef(null); 

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );

        if (!response.ok) {
          throw new Error(`HTTP-fout! Status: ${response.status}`);
        }

        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message || "Onbekende fout");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const handleClick = (coin) => {
    setSelectedCoin(coin);

    // Scroll naar het details-gedeelte
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading) return <p>Gegevens laden...</p>;
  if (error) return <p className="error">Fout: {error}</p>;

  return (
    <div className="container">
      <h2>Cryptocurrency Lijst</h2>
      <div className="coins-container">
        {coins.map((coin) => (
          <div key={coin.id} className="coin-card" onClick={() => handleClick(coin)}>
            <img src={coin.image} alt={coin.name} className="coin-image" />
            <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
            <p>Prijs: ${coin.current_price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {selectedCoin && (
        <div className="coin-details" ref={detailsRef}>
          <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
          <img src={selectedCoin.image} alt={selectedCoin.name} className="coin-details-image" />
          <p><strong>Huidige prijs:</strong> ${selectedCoin.current_price.toLocaleString()}</p>
          <p><strong>Marktkapitalisatie:</strong> ${selectedCoin.market_cap.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Api;
