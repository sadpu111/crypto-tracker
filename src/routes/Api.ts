/* export async function fetchCoins () {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  return json
}  // async await 방법*/

const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins () { // promise 방법
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo (coinId:string) { // info data fetcher
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export function fetchCoinTickers (coinId:string) { // price data fetcher
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export async function fetchCoinHistory (coinId:string) { // cahrt 컴포넌트에 사용될 fetcher
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json()); 
}
