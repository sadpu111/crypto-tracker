import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {useParams, useLocation, Outlet, Link, useMatch} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./Api";

const HomeBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 10px;
`;

const Container = styled.div`
  padding: 0px 10px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vp;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  margin: 20px;
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div` 
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive : boolean}>` // <{isActive : boolean}> => isActive라는 prop을 추가하며 이는 boolean 타입이다. 이를 하단의 priveMatch와 cahrtMatch로 전달할 수 있다.
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 8px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor}; //위에 isActive prop을 추가하여 하단의 <Tab> 컴포넌트에서 값(isActive={chartMatch !== null})을 입력받는다. 입력받는 값이 true이면 theme의 accentColor을, 아니라면 textColor을 적용한다.
  a {
    display: block;
  }
`;

interface LocationState { 
  state: {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }
};

 

interface InfoData { 
  id:string ;
  name: string ;
  symbol: string ;
  rank: number ;
  is_new: boolean ;
  is_active: boolean ;
  type: string ;
  logo: string ;
  description: string ;
  message: string ;
  open_source: boolean ;
  started_at: string ;
  development_status: string ;
  hardware_wallet: boolean ;
  proof_type: string ;
  org_structure: string ; 
  hash_algorithm: string ;
  links: object ;
  links_extended: object ;
  whitepaper: object ;
  first_data_at: string ;
  last_data_at: string ;
}
 
interface PriceData {
  id:string ;
  name: string ;
  symbol: string ;
  rank: number ;
  circulating_supply: number ;
  total_supply: number ;
  max_supply: number ;
  beta_value: number ;
  first_data_at: string ;
  last_updated: string ;
  quotes: {
    USD: {
      price:number ;
      volume_24h:number ;
      volume_24h_change_24h:number ;
      market_cap:number ;
      market_cap_change_24h:number ;
      percent_change_15m:number ;
      percent_change_30m:number ;
      percent_change_1h:number ;
      percent_change_6h:number ;
      percent_change_12h:number ;
      percent_change_24h:number ;
      percent_change_7d:number ;
      percent_change_30d:number ;
      percent_change_1y:number ;
      ath_price:number ;
      ath_date:string ;
      percent_from_price_ath:number ;
    }
  } ;
}

function Coin () {
  const {coinId} = useParams(); 
  const {state} = useLocation() as LocationState;
  const priceMatch = useMatch("/:coinId/price"); // useMatch hook. react-router-dom v6 이전에는 useRouteMatch. 특정 url이 일치하는지를 보여줌. 일치하면 object를, 일치하지 않으면 null.
  const chartMatch = useMatch("/:coinId/chart") 
  /* const [loading, setLoading] = useState(true); 
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {   
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); 
    })();
  }, [coinId]); */
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!)) // coinId는 useParams()로 string || undefined라 오류가 발생하는데, 뒤에 !를 붙여주면 이는 확장 할당 어션셜로 값이 무조건 할당되어있다고 컴파일러에게 전달해 값이 없어도 변수를 사용할 수 있게 한다.
  const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["ticker", coinId], () => fetchCoinTickers(coinId!)); // {isLoading: tickersLoading, data: tickersData} => 그대로 쓰면 서로 겹치니깐 재명명하는 작업.
  const loading = infoLoading || tickersLoading;
  return <Container>
  <Header>
    <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
    <HomeBtn>
      <Link to="/">Home</Link>
    </HomeBtn>
  </Header>
  {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData ?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null }>
              <Link to={`/${coinId}/price`}>price</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
  </Container>;
} 

export default Coin