import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCrypto } from '../redux/cryptoSlice';
import { throttle } from 'lodash';
import Table from './Table';

const Tracker = () => {
  const dispatch = useDispatch();

  const throttlers : {[key: string]: Function}={};
  const getThrottler = (symbol:string) => {
    if (!throttlers[symbol]) {
      throttlers[symbol] = throttle((payload) => {
        dispatch(updateCrypto(payload));
      }, 1000); 
    }
    return throttlers[symbol];
  };

  useEffect(() => {
    const stream = [
      'btcusdt@ticker',
      'ethusdt@ticker',
      'usdtusdt@ticker',
      'xrpusdt@ticker',
      'solusdt@ticker',
    ].join('/');

    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);

    ws.onmessage = (event) => {
      const { data } = JSON.parse(event.data);
      const { s: symbol, c: price, P: change, v: volume } = data;

      getThrottler(symbol)({
        symbol,
        price: parseFloat(price),
        change: parseFloat(change),
        volume: parseFloat(volume),
      });
    };

    return () => ws.close();
  }, [dispatch]);

  return (
    <section className='w-full h-full flex-col justify-center items-center'>
      <div className='flex items-center justify-center gap-3'>
      <img src="/assets/logo.png" className="w-9 h-9" alt="" />
        <h3 className='text-3xl font-bold font-mono text-center py-8 '>CrypTracker</h3>
        </div>
        
        <Table />
    </section>
  ); 
};

export default Tracker;
