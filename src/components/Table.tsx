import cryptodata from '../data/cryptodata';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import Tooltip from './ToolTip';
// import { set } from 'lodash';

const Table = () => {
  const cryptos = useSelector((state: { crypto: any[] }) => state.crypto);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig,setSortConfig]=useState<{key:string; direction:'asc'| 'desc'}|null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Add this after your state declarations
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.filter-dropdown')) {
      setIsFilterOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
  const filteredCryptos=cryptos.filter((crypto)=>{
    const symbol=crypto.symbol.toLowerCase();
    const name=cryptodata[crypto.symbol as keyof typeof cryptodata]?.name?.toLowerCase() || '';
    const search=searchTerm.toLowerCase();
    return symbol.includes(search) || name.includes(search);
  });


  const sortData = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'; // Default to ascending
    
    if (sortConfig && sortConfig.key === key) {
      // If already sorting by this key, toggle direction
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig) return filteredCryptos;

    console.log('Sorting by:', sortConfig.key, 'Direction:', sortConfig.direction);


    return [...filteredCryptos].sort((a, b) => {
      switch (sortConfig.key) {
        case 'price':
          return sortConfig.direction === 'asc' 
            ? Number(a.price) - Number(b.price)
            : Number(b.price) - Number(a.price);
        case 'marketCap': {
          const aMarketCap = parseFloat(cryptodata[a.symbol as keyof typeof cryptodata]?.marketCap?.replace(/[^0-9.]/g, '')) || 0;
          const bMarketCap = parseFloat(cryptodata[b.symbol as keyof typeof cryptodata]?.marketCap?.replace(/[^0-9.]/g, '')) || 0;
          return sortConfig.direction === 'asc' ? aMarketCap - bMarketCap : bMarketCap - aMarketCap;
        }
        case 'volume':
          return sortConfig.direction === 'asc'
            ? Number(a.volume) - Number(b.volume)
            : Number(b.volume) - Number(a.volume);
        // case 'change':
        //   return sortConfig.direction === 'asc'
        //     ? Number(a.change) - Number(b.change)
        //     : Number(b.change) - Number(a.change);
        default:
          return 0;
      }
    });
  }
  const sortedAndFilteredData = getSortedData();



  const toggleRow = (symbol: string) => {
    setExpandedRow(expandedRow === symbol ? null : symbol);
  };



  return (
    <div className="overflow-x-auto w-full px-4">
            <div className=" flex items-center justify-center md:gap-10 gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by symbol or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 my-4 py-2 border border-gray-300 rounded-lg focus:outline-none  focus:ring-none  "
        />
        <div className='relative ml-4'>
        <button
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
      </svg>
      Filter
    </button>
    
    {isFilterOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-200 filter-dropdown">
        <div className="py-2">
          <button
            onClick={() => {
              sortData('price');
              setIsFilterOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Sort by Price {sortConfig?.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              sortData('marketCap');
              setIsFilterOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Sort by Market Cap {sortConfig?.key === 'marketCap' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => {
              sortData('volume');
              setIsFilterOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Sort by Volume {sortConfig?.key === 'volume' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </button>
         
        </div>
      </div>
    )}
        </div>
      </div>
      <table className='min-w-[96vw] mx-auto rounded-lg overflow-hidden shadow-lg'>
        <thead className='text-sm md:text-lg'>
          <tr className='bg-gray-50'>
            <th className='px-2 md:px-8 py-3'>S.No.</th>
            <th className='w-[180px] md:w-[220px] text-left pl-2'>Name</th>
            <th className='px-2 md:px-12'>Price</th>
            <th className='px-2 md:px-3'>24h%</th>
            <th className='lg:hidden w-10'></th>
            <th className='hidden lg:table-cell px-3'>1h%</th>
            <th className='hidden lg:table-cell px-3'>7d%</th>
            <th className='hidden lg:table-cell px-3'>
            <Tooltip
                label="Market Cap" 
                tooltip="Total market value of a cryptocurrency's circulating supply"
              />
            </th>
            <th className='hidden lg:table-cell px-3'>
            <Tooltip
                label="Volume (24h)" 
                tooltip="Total trading volume across all markets in the last 24 hours"
              />
            </th>
            <th className='hidden lg:table-cell px-3'>
            <Tooltip
                label="Circulating Supply" 
                tooltip="Amount of coins that are circulating in the market"
              />
            </th>
            <th className='hidden lg:table-cell px-3'>Last 7 days</th>
          </tr>
        </thead>
        <tbody className='text-sm md:text-lg'>
          {sortedAndFilteredData.map((c, idx) => {
            const data = cryptodata[c.symbol as keyof typeof cryptodata] || {};
            const isExpanded = expandedRow === c.symbol;

            return (
              <>
                <tr
                  key={c.symbol}
                  className={`border-b ${idx % 2 == 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className='px-2 lg:px-8 py-4'>{idx + 1}</td>
                  <td className="flex items-center gap-2 py-4">
                    <img src={data.logo} alt="" className="w-5 lg:w-6" />
                    <p className='font-semibold hidden sm:block'>{data.name}</p>
                    <p className='text-gray-400 text-xs lg:text-sm'>{c.symbol.slice(0, -4)}</p>
                  </td>
                  <td className='px-2 lg:px-3 text-center'>${Number(c.price).toLocaleString()}</td>
                  <td className='px-2 lg:px-3 text-center' style={{ color: c.change > 0 ? 'green' : 'red' }}>{c.change}%</td>
                  <td className='lg:hidden'>
                    <button
                      onClick={() => toggleRow(c.symbol)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded-full transition-colors duration-150"
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  </td>
                  <td className='hidden lg:table-cell px-3 text-center' style={{ color: parseFloat(data.Oh) > 0 ? 'green' : 'red' }}>{data.Oh}%</td>
                  <td className='hidden lg:table-cell px-3 text-center' style={{ color: parseFloat(data.sevenD) > 0 ? 'green' : 'red' }}>{data.sevenD}%</td>
                  <td className='hidden lg:table-cell px-3 text-center'>{data.marketCap}</td>
                  <td className='hidden lg:table-cell px-3 text-center'>{Number(c.volume).toLocaleString()}</td>
                  <td className='hidden lg:table-cell px-3 text-center'>{data.circulatingSupply}</td>
                  <td className='hidden lg:table-cell px-3 mx-auto'>
                    <img src={data.graph} alt="" className="w-[200px]" />
                  </td>
                </tr>
                {/* Mobile Expanded View */}
                {isExpanded && (
                  <tr className="lg:hidden bg-gray-100">
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
                          <img src={data.graph} alt="" className="w-full lg:max-w-[300px] mx-auto" />
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
