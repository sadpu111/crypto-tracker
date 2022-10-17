import { useEffect, useState } from "react";
import {useParams, useLocation, Outlet} from "react-router"
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

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
const Overview = styled.div` // 검은색 박스
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div` // 검은색 박스 안 아이템
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

interface LocationState { // object의 interface 정의.
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

 

interface InfoData { // object의 key들을 가져오기 위해 콘솔에 출력 후(console.log(infoData)) 우클릭하여 "store object as global variable"을 선택하면 temp1로 브라우저에 저장. 이를 다시 object.keys(temp1).join() 메서드로 key만 호출. value는 map과 typeof 메서드를 활용하여 추출. "Object.values(temp1).map(v => typeof v)"
  id:string ;
  name: string ;
  symbol: string ;
  rank: number ;
  is_new: boolean ;
  is_active: boolean ;
  type: string ;
  logo: string ;
//  tags: object ; 이 둘은 실제로 object로 구성된 array. array의 경우 object로 출력되므로, array인 경우 추가로 interface를 정의해야 한다. ex) tags: Itag[]; -> ITag라는 inteface의 array라는 의미.
//  team: object ;
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
  const [loading, setLoading] = useState(true);
  const {state} = useLocation() as LocationState; 
  const [info, setInfo] = useState<InfoData>(); // typescript에 info가 InfoData interfac를 따른다는 것을 알린다. <InfoData>를 추가하지 않으면 typescript는 info가 뭔지 모른다.
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {   
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false); // API로부터 request하고나서는 setLoading을 false 처리해줘야 한다.
    })();
  }, [coinId]); // [coinId] -> coinId가 변할 때만 함수 실행. hook의 최고 성능을 이끌어내기 위해서는 hook 안에 사용된 것은 dependency([]) 안에 넣어줘야 한다. 현재 코드에서는 비어도 된다([]). coinId는 url에 위치하므로 절대 변하지 않기 때문에..
  return <Container>
  <Header>
    <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title> 
  </Header>
  {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Outlet />
        </>
      )}
  </Container>;
} 

export default Coin