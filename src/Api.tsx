export const fetchCoins = () => {
  return fetch("https://api.coinpaprika.com/v1/coins")
    .then((res) => res.json())
    .then((json) => json);
};

export const fetchInfo = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
    .then((res) => res.json())
    .then((json) => json);
};
export const fetchPrice = (coinId: string) => {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
    .then((res) => res.json())
    .then((json) => json);
};

export const fetchCoinHistory = (coinId: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 150;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  )
    .then((res) => res.json())
    .then((json) => json);
};
