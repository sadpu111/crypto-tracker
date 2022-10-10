import { useEffect, useState } from "react";
import {useParams} from "react-router"
import { useLocation } from "react-router-dom";
import styled from "styled-components";

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
  }, [coinId]);
  return <Container>
  <Header>
    <Title>{state?.name || "Loding..."}</Title> 
  </Header>
  {loading ? <Loader>Loading...</Loader> : null}
  </Container>;
} 

export default Coin