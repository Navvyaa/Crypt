import cryptodata from '../data/cryptodata';
import { useSelector } from 'react-redux';

const Table = () => {
  const cryptos = useSelector((state: { crypto: any[] }) => state.crypto);

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Logo</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>24h %</th>
          <th>24h Volume</th>
          <th>Circulating Supply</th>
          <th>Max Supply</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((c, idx) => {
          const data = cryptodata[c.symbol as keyof typeof cryptodata] || {};
          return (
            <tr key={c.symbol}>
              <td>{idx + 1}</td>
              <td><img src={data.logo} alt={c.symbol} width={20} /></td>
              <td>{data.name}</td>
              <td>{c.symbol}</td>
              <td>${Number(c.price).toLocaleString()}</td>
              <td style={{ color: c.change > 0 ? 'green' : 'red' }}>{c.change}%</td>
              <td>{Number(c.volume).toLocaleString()}</td>
              <td>{data.circulatingSupply}</td>
              <td>{data.maxSupply}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
