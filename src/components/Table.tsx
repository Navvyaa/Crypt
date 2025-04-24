import cryptodata from '../data/cryptodata';
import { useSelector } from 'react-redux';


const Table = () => {
  const cryptos = useSelector((state: { crypto: any[] }) => state.crypto);
  

  return (
    <>
    
    <table className='md:min-w-[80vw] m-auto'>
      <thead className=' text-lg py-3 gap-10 '>
        <tr className=' bg-gray-50 gap-10 mt-6 mb-6 text-center'>
          <th className='px-8 py-3'>S.No. </th>
          {/* <th>Logo</th> */}
          <th className='w-[220px] text-center'>Name</th>
          {/* <th>Symbol</th> */}
          <th className='px-12'>Price</th>
          <th>1h%</th>
          <th>24h %</th>
          <th>7d%</th>
          <th className='w-[100px]'>Market Cap</th>
          <th className='px-12'>Volume (24h)</th>
          <th>Circulating Supply</th>
          <th>Last 7 days</th>
        </tr>
      </thead>
      <tbody className='text-lg gap-12'>
        {cryptos.map((c, idx) => {
          const data = cryptodata[c.symbol as keyof typeof cryptodata] || {};
          return (
            <tr key={c.symbol} className={`gap-10 mt-6 mb-6 text-center py-4 ${idx%2==0? 'bg-white-50': 'bg-white-100'}`}>
              <td className='py-4'>{idx + 1}</td>
              {/* <td></td> */}
              <td className="flex pl-2 items-center justify-start gap-2 py-4">
                <img src={data.logo} alt="" width={24} />
                <p className='font-semibold'>{data.name}</p>
                <p className='text-gray-400'>{c.symbol.slice(0, -4)}</p>
              </td>
              {/* <td>{c.symbol}</td> */}
              <td className='px-3'>${Number(c.price).toLocaleString()}</td>
              <td className='px-3' style={{ color: parseFloat(data.Oh) > 0 ? 'green' : 'red' }}>{data.Oh}%</td>
              <td className='px-3' style={{ color: c.change > 0 ? 'green' : 'red' }}>{c.change}%</td>
              <td className='px-3' style={{ color: parseFloat(data.sevenD) > 0 ? 'green' : 'red' }}>{data.sevenD}%</td>
              <td className='px-3'>{data.marketCap}</td>
              <td className='px-3'>{Number(c.volume).toLocaleString()}</td>
              <td className='px-3'>{data.circulatingSupply}</td>
              <td className='px-3'><img src={data.graph} alt="" width={200} /></td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
};

export default Table;
