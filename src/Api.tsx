import { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "./index.css";
// ^benodigde imports

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
};
// ^variabele maken

type ChartData = {
  date: string;
  price: number;
};

const Api: React.FC = () => {
  
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );

        if (!response.ok) throw new Error(`HTTP-fout! Status: ${response.status}`);

        const data: Coin[] = await response.json();
        setCoins(data);
      } catch (err: any) {
        setError(err.message || "Onbekende fout");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const fetchChartData = async (coinId: string) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`

      );

      if (!response.ok) throw new Error(`HTTP-fout! Status: ${response.status}`);

      const data = await response.json();
      
      const formattedData: ChartData[] = data.prices.map((price: [number, number]) => ({
        date: new Date(price[0]).toLocaleDateString(),
        price: price[1],
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("Fout bij ophalen van grafiekgegevens:", err);
    }
  };

  const handleClick = (coin: Coin) => {
    setSelectedCoin(coin);
    fetchChartData(coin.id);

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
          
          <button className="refresh-button" onClick={() => fetchChartData(selectedCoin.id)}>
            Ververs grafiek 🔄
          </button>

          <div className="chart-container">
            <h3>Prijsverloop (7 dagen)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Api;
