import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Api";
import {useOutletContext} from "react-router-dom"
import ApexCahrt from "react-apexcharts"; // 공식문서에서는 Chart를 import하라고 하지만 Chart 컴포넌트와 겹치기 떄문에 ApexChart로 improt 


interface ChartProps {
  coinId: string;
}

interface IHistoricalData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
// useQuery<IHistoricalData[]> => data는 IHistoricalData interface의 배열
function Chart() {
  const {coinId} = useOutletContext<ChartProps>()
  const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  console.log(data);
  return <div>{isLoading ? "Loading Chart..." : 
    <ApexCahrt 
    type="line" 
    series={[
      {
        name: "hello",
        data: [1,2,3,4,5,6], 
      },
      {
        name: "sales",
        data: [11,12,17,16,19,20], 
      }
    ]}
    options={{
      chart: {
        height: 500,
        width: 500,
    }}}>
    </ApexCahrt>
  }
  </div>
}

export default Chart;