import {useParams} from "react-router"



function Coin () {
  const {coinId} = useParams(); // <Route>의 path에 적용되는 parameter를 호출한다. 강의와 달리 react-router-dom v6에서는 useParams() 호출 시 기본값으로 type이 string or undefined로 지정되므로 interface 또는 type 지정 불필요. {}로 parameter를 열어준다.
  return <h1>Coin: {coinId}</h1>;
} 

export default Coin