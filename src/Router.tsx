import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"
import Chart from "./routes/Chart"
import Price from "./routes/Price"

// <Route path="/:coinId" => url이 변수값을 갖는다. 해당 파라미터를 잡기 위해 useParams hook을 import한다.

// App으로부처 함수를 전달받기 위한 interface 작성

interface IRouterProps {
  toggleDark: () => void; // no argument, return nothing
  isDark: boolean;
}

function BrowserRouter ({toggleDark, isDark}: IRouterProps) {
  return ( 
  <Router basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Coins toggleDark={toggleDark} />}>
      </Route>
      <Route path="/:coinId" element={<Coin isDark={isDark} />}>
        <Route path="/:coinId/chart" element={<Chart />}></Route> 
        <Route path="price" element={<Price />}></Route>
      </Route>
    </Routes>
  </Router >
  )
}

export default BrowserRouter