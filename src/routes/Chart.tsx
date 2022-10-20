import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Api";
import {useOutletContext} from "react-router-dom"


interface ChartProps {
  coinId: string;
}


function Chart() {
  const {coinId} = useOutletContext<ChartProps>()
  const {isLoading, data} = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  console.log(data);
  return <h1>Chart</h1>
}

export default Chart;