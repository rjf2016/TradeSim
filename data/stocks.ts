export const Investments = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    price: 145.86,
    change: 0.45,
    changePercent: 0.31,
  },
  {
    id: '2',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    price: 678.9,
    change: -12.45,
    changePercent: 1.83,
  },
  {
    id: '3',
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    price: 195.32,
    change: 0.45,
    changePercent: 0.23,
  },
  {
    id: '4',
    name: 'Alphabet Inc.',
    symbol: 'GOOGL',
    price: 2756.32,
    change: 0.45,
    changePercent: 0.23,
  },
];

export const Watchlist = [
  {
    id: '5',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    price: 278.32,
    change: 0.45,
    changePercent: 0.23,
  },
  {
    id: '6',
    name: 'Meta Platforms Inc.',
    symbol: 'FB',
    price: 345.32,
    change: 2.45,
    changePercent: 0.73,
  },
  {
    id: '7',
    name: 'Netflix Inc.',
    symbol: 'NFLX',
    price: 678.32,
    change: -12.45,
    changePercent: 1.83,
  },
];

export const Stocks = [...Investments, ...Watchlist];
