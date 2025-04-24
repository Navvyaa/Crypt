import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { symbol: 'BTCUSDT', price: 0, change: 0, volume: 0 },
  { symbol: 'ETHUSDT', price: 0, change: 0, volume: 0 },
  { symbol: 'USDTUSDT', price: 1, change: 0, volume: 0 },
  { symbol: 'XRPUSDT', price: 0, change: 0, volume: 0 },
  { symbol: 'SOLUSDT', price: 0, change: 0, volume: 0 },
];

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCrypto: (state, action) => {
      const { symbol, price, change, volume } = action.payload;
      const crypto = state.find(c => c.symbol === symbol);
      if (crypto) {
        crypto.price = price;
        crypto.change = change;
        crypto.volume = volume;
      }
    },
  },
});

export const { updateCrypto } = cryptoSlice.actions;
export default cryptoSlice.reducer;


