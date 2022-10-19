/* export async function fetchCoins () {
  const response = await fetch("https://api.coinpaprika.com/v1/coins");
  const json = await response.json();
  return json
}  // async await 방법*/

export function fetchCoins () { // promise 방법
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) => response.json());
}