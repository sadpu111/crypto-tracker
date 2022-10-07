import { useState } from "react";
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

function Coin () {
  const {coinId} = useParams(); // <Route>의 path에 적용되는 parameter를 호출한다. 강의와 달리 react-router-dom v6에서는 useParams() 호출 시 기본값으로 type이 string or undefined로 지정되므로 interface 또는 type 지정 불필요. {}로 parameter를 열어준다.
  const [loading, setLoading] = useState(true);
/*   const location = useLocation(); // useLocation() => location 관련 객체 전달. 여기서 <Link>안의 state에 입력한 object 확인 가능.
  console.log(location); */
  const {state} = useLocation() as LocationState; // API로부터 데이터를 끌어오는 것이 아니고, 브라우저의 state의 데이터를 그대로 표시하는 것.그런데 해당 coin컴포넌트를 클릭해야 <Link>의 state가 생성이 되므로 바로 특정 코인 url을 입력하여 접근할 경우 빈 페이지가 열린다. state로부터 받아올 데이터가 없기 때문. 따라서 아래 {state?.name || "Loding..."}와 같이 입력 => state가 존재한다면 state.name을 표시하고, 아니라면 "Loding..." 출력.
  return <Container>
  <Header>
    <Title>{state?.name || "Loding..."}</Title> 
  </Header>
  {loading ? <Loader>Loading...</Loader> : null}
  </Container>;
} 

export default Coin