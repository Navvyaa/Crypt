import cryptodata from '../data/cryptodata';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Table = () => {
  const cryptos = useSelector((state: { crypto: any[] }) => state.crypto);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (symbol: string) => {
    setExpandedRow(expandedRow === symbol ? null : symbol);
  };

  return (
    <div className="overflow-x-auto w-full px-4">
      <table className='min-w-full'>
        <thead className='text-sm md:text-lg'>
          <tr className='bg-gray-50'>
            <th className='px-2 md:px-8 py-3'>S.No.</th>
            <th className='w-[180px] md:w-[220px] text-left'>Name</th>
            <th className='px-2 md:px-12'>Price</th>
            <th className='px-2 md:px-3'>24h%</th>
            <th className='md:hidden w-10'></th>
            <th className='hidden md:table-cell px-3'>1h%</th>
            <th className='hidden md:table-cell px-3'>7d%</th>
            <th className='hidden md:table-cell px-3'>Market Cap</th>
            <th className='hidden md:table-cell px-3'>Volume (24h)</th>
            <th className='hidden md:table-cell px-3'>Circulating Supply</th>
            <th className='hidden md:table-cell px-3'>Last 7 days</th>
          </tr>
        </thead>
        <tbody className='text-sm md:text-lg'>
          {cryptos.map((c, idx) => {
            const data = cryptodata[c.symbol as keyof typeof cryptodata] || {};
            const isExpanded = expandedRow === c.symbol;

            return (
              <>
                <tr
                  key={c.symbol}
                  className={`border-b ${idx % 2 == 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='px-2 md:px-8 py-4'>{idx + 1}</td>
                  <td className="flex items-center gap-2 py-4">
                    <img src={data.logo} alt="" className="w-5 md:w-6" />
                    <p className='font-semibold'>{data.name}</p>
                    <p className='text-gray-400 text-xs md:text-sm'>{c.symbol.slice(0, -4)}</p>
                  </td>
                  <td className='px-2 md:px-3'>${Number(c.price).toLocaleString()}</td>
                  <td className='px-2 md:px-3' style={{ color: c.change > 0 ? 'green' : 'red' }}>{c.change}%</td>
                  <td className='md:hidden'>
                    <button
                      onClick={() => toggleRow(c.symbol)}
                      className="px-2 py-1 text-gray-600"
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  </td>
                  <td className='hidden md:table-cell px-3' style={{ color: parseFloat(data.Oh) > 0 ? 'green' : 'red' }}>{data.Oh}%</td>
                  <td className='hidden md:table-cell px-3' style={{ color: parseFloat(data.sevenD) > 0 ? 'green' : 'red' }}>{data.sevenD}%</td>
                  <td className='hidden md:table-cell px-3'>{data.marketCap}</td>
                  <td className='hidden md:table-cell px-3'>{Number(c.volume).toLocaleString()}</td>
                  <td className='hidden md:table-cell px-3'>{data.circulatingSupply}</td>
                  <td className='hidden md:table-cell px-3'>
                    <img src={data.graph} alt="" className="w-[200px]" />
                  </td>
                </tr>
                {/* Mobile Expanded View */}
                {isExpanded && (
                  <tr className="md:hidden bg-gray-100">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">1h%:</span>
                          <span style={{ color: parseFloat(data.Oh) > 0 ? 'green' : 'red' }}>{data.Oh}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">7d%:</span>
                          <span style={{ color: parseFloat(data.sevenD) > 0 ? 'green' : 'red' }}>{data.sevenD}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Market Cap:</span>
                          <span>{data.marketCap}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Volume (24h):</span>
                          <span>{Number(c.volume).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Circulating Supply:</span>
                          <span>{data.circulatingSupply}</span>
                        </div>
                        <div className="mt-3">
                          <span className="font-semibold block mb-2">Last 7 days:</span>
                          <img src={data.graph} alt="" className="w-full max-w-[300px] mx-auto" />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
