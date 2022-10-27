import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "./Api";
import { Helmet } from "react-helmet";

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right:20px;
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 10px;
  a { // Coin 컴포넌트 내의 anchor는 아래와 같은 스타일 적용
    display: flex; 
    align-items: center;
    transition: color 0.2s ease-in; // 색이 전환(변화)되는데 0.2초 지연 및 ease-in 효과
    padding: 15px;
  }
  &:hover { // event 추가문법.
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  margin: 20px;
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
`
// typescript에 데이터의 shape을 알려주기 위한 interface.
interface ICoin {  
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


// coin 컴포넌트를 클릭하면 <Link>태그를 통해 {`/${coin.id}`}라는 주소로 이동 -> Routers.tsx의 Router 컴포넌트에서 /:coinId 경로는 Coin.tsx의 Coin 컴포넌트를 랜더링하는 것으로 정의. 정리하면, Coin.tsx의 Coin 컴포넌트의 coinId와 Router.tsx의 Router 컴포넌트의 coinId는 useParams()로 연결되어있고, 이 coinId 자리에 Coins.tsx의 coin array의 id값을 전달하는 것.
function Coins () {
/*   const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState<ICoin[]>([]); // <ICoin[]>를 추가하여 coins state가 해당 interface로 구성된 array라는 정보 전달. 이를 통해 하단의 coin.id, coin.name에서 오류 발생X. coins 전체는 배열, 각 coin의 데이터는 객체.
  useEffect(() => {
    // useEffect 안에 함수 만들 때 팁. useEffect(() => {()()}). 첫 번째 양괄호 안에 함수를 입력하면 바로 실행된다.
      (async() => {
        const response = await fetch("https://api.coinpaprika.com/v1/coins");
        const json = await response.json();
        setCoins(json.slice(0, 100));
        setLoding(false);
      })();
    }, []);  // react query를 사용하면서 api.ts에 fetchCoins 함수로 대체*/
  const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins); // useQuery를 통해 fetcher함수(여기서는 fetchCoins)를 전달인자로 받아 실행하는데, isLoading으로 읽어오는 중인지 여부를 판단하고, 로딩이 끝나면 해당 데이터(json)을 data로 받아온다. 얘도 마찬가지로 typescript에 데이터의 타입을 전달하기 위해 ICoin이라는 interface 적용. react qeury는 cahce에 로딩된 데이터를 저장하여 한번 로딩하면 저장했던 cache애서 바로 불러온다.
  return (
    <Container>
      <Helmet>
        <title>Crypto Currency</title>
       </Helmet>
      <Header>
        <Title>Crypto Currency</Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : 
        <CoinsList>
        {data?.slice(0, 100).map((coin) => (
        <Coin key={coin.id}>
          <Link to={`/${coin.id}/chart`} state={coin}> 
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
            {coin.name} &rarr;</Link> 
        </Coin>))}
      </CoinsList>}
    </Container>
  )
}
// <Link state={} /> => 브라우저가 이미 갖고 있는 데이터를 다른 화면으로 전달. 이를 통해 api를 읽는 시간동안 화면에 전달받은 데이터를 표시할 수 있다. 로딩화면 생략 가능.

export default Coins