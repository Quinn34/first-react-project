import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
// ^benodigde imports

interface Coin {
  id: string;
  name: string;
  market_cap: number;
}
// benodigde variabelen
const MarketShareChart: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false'
        );
        // haalt een cicrle diagram op van de top 12 munten.
        if (!response.ok) throw new Error(`HTTP-fout! Status: ${response.status}`);
        const data: Coin[] = await response.json();
        setCoins(data);
      } catch (err: any) {
        setError(err.message || 'Onbekende fout');
      } finally {
        setLoading(false);
        // geeeft een error als het fout is
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p>Gegevens laden...</p>;
  if (error) return <p className="error">Fout: {error}</p>;

  // Pie chart data preparation
  const chartData = coins.map(coin => ({
    name: coin.name,
    value: coin.market_cap,
  }));

  // Kleuren van de coins in de diagram
  const COLORS = ['#ff8c00', '#ffbb33', '#ffcc00', '#66ccff', '#00cc99', '#ff6666', '#9966cc', '#33cc33', '#ff3399', '#66cc66'];

  return (
    <div className="chart-container">
      <h2>Marktaandeel van de top 10 cryptocurrencies</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    // display van de diagram^
  );
};

export default MarketShareChart;
