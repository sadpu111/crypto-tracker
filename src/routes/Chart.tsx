import { useQuery } from "react-query";
import { fetchCoinHistory } from "./Api";
import {useOutletContext} from "react-router-dom"
import ApexCahrt from "react-apexcharts"; // 공식문서에서는 Chart를 import하라고 하지만 Chart 컴포넌트와 겹치기 떄문에 ApexChart로 improt 


interface ChartProps {
  coinId: string;
  isDark: boolean;
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
interface ICandleChartItem {
  x: Date;
  y: number[];
}

// useQuery<IHistoricalData[]> => data는 IHistoricalData interface의 배열
function Chart() {
  const {coinId, isDark} = useOutletContext<ChartProps>()
  const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <div>{isLoading ? "Loading Chart..." : <>
    <ApexCahrt 
    type="line" 
    series={[
      {
        name: "Price",
        data: data?.map(price => Number(price.close)) as number[], // data prop은 number 타입을 받아야되는데, 못읽어올 경우 undefined가 되는 문제로 오류 발생. 그래서 후단의 as number[] 로 강제 타입 변형.
      },
    ]}
    options={{
      
      theme: {
        mode: isDark? "dark" : "light"
      },
      chart: {
        height: 500,
        width: 500,
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      yaxis: {
        title: {
          text: "Price($)"
        }
      },
      
      xaxis: {
        
         type: "datetime",
         categories: data?.map(date => new Date(Number(date.time_close) * 1000).toISOString()) // 지금 활용하는 API의 time_close는 초단위 & string 타입이므로, 먼저 Number로 형변환 후 날짜로 변환.
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      fill : {
        type: "gradient", gradient: {
          gradientToColors: ["#0be881"],
          stops: [1, 100]
        }
      },
      colors: ["#0fbcf9"],
      tooltip: {
        y: {
          formatter: (value) => `$${value.toFixed(1)}`
        }
      }
    }}>
    </ApexCahrt>
    <hr></hr>
    <ApexCahrt
      type="candlestick"
      series={[
        {
          name: "Price",
          data: data?.map((props) => {
                  return {
                    x: new Date(Number(props.time_open) * 1000),
                    y: [
                      parseFloat(props.open),
                      parseFloat(props.high),
                      parseFloat(props.low),
                      parseFloat(props.close),
                    ],
                  };
                }) as ICandleChartItem[],
              },
            ]}
            options={{
            
      theme: {
        mode: isDark? "dark" : "light"
      },
      chart: {
        height: 500,
        width: 500,
        toolbar: {
          show: false,
        },
        background: "transparent",
      },
      yaxis: {
        title: {
          text: "Price($)"
        }
      },
      xaxis: {
        type: "datetime",
        categories: data?.map(date => new Date(Number(date.time_close) * 1000).toISOString())
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#ff009d",
            downward: "#0be881",
            },
        },
      },
      tooltip: {
        y: {
          formatter: (value) => `$${value.toFixed(2)}`,
        },
      },
    }}
   />

    </>
    
  }
  </div>
}

export default Chart;