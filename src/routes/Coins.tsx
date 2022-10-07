import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"

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
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 10px;
  a { // Coin 컴포넌트 내의 anchor는 아래와 같은 스타일 적용
    display: flex; // 링크뿐만 아니라 영역을 눌러도 이동
    align-items: center;
    transition: color 0.2s ease-in; // 색이 전환(변화)되는데 0.2초 지연 및 ease-in 효과
    padding: 20px;
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
interface CoinInterface {  
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
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState<CoinInterface[]>([]); // <CoinInterface[]>를 추가하여 coins state가 해당 interface로 구성된 array라는 정보 전달. 이를 통해 하단의 coin.id, coin.name에서 오류 발생X. coins 전체는 배열, 각 coin의 데이터는 객체.
  useEffect(() => {
    // useEffect 안에 함수 만들 때 팁. useEffect(() => {()()}). 첫 번째 양괄호 안에 함수를 입력하면 바로 실행된다.
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoding(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Crypto Currency</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : 
        <CoinsList>
        {coins.map((coin) => (
        <Coin key={coin.id}>
          <Link to={`/${coin.id}`} state={coin}> 
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></Img>
            {coin.name} &rarr;</Link> 
        </Coin>))}
      </CoinsList>}
    </Container>
  )
}
// <Link state={} /> => 브라우저가 이미 갖고 있는 데이터를 다른 화면으로 전달. 이를 통해 api를 읽는 시간동안 화면에 전달받은 데이터를 표시할 수 있다. 로딩화면 생략 가능.

export default Coins