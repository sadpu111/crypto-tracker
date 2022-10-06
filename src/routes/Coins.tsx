import { Link } from "react-router-dom";
import styled from "styled-components"

const Container = styled.div`
  padding: 0px 10px;
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
    display: block; // 링크뿐만 아니라 영역을 눌러도 이동
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
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
`
const coins = [
  {
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "eth-ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "rank": 2,
    "is_new": false,
    "is_active": true,
    "type": "coin"
  },
  {
    "id": "usdt-tether",
    "name": "Tether",
    "symbol": "USDT",
    "rank": 3,
    "is_new": false,
    "is_active": true,
    "type": "token"
  }
];

// coin 컴포넌트를 클릭하면 <Link>태그를 통해 {`/${coin.id}`}라는 주소로 이동 -> Routers.tsx의 Router 컴포넌트에서 /:coinId 경로는 Coin.tsx의 Coin 컴포넌트를 랜더링하는 것으로 정의. 정리하면, Coin.tsx의 Coin 컴포넌트의 coinId와 Router.tsx의 Router 컴포넌트의 coinId는 useParams()로 연결되어있고, 이 coinId 자리에 Coins.tsx의 coin array의 id값을 전달하는 것.
function Coins () {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
        <Coin key={coin.id}>
          <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link> 
        </Coin>))}
      </CoinsList>
    </Container>
  )
}

export default Coins