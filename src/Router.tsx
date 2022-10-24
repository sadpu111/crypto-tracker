import {BrowserRouter, Routes, Route} from "react-router-dom"
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"
import Chart from "./routes/Chart"
import Price from "./routes/Price"

// <Route path="/:coinId" => url이 변수값을 갖는다. 해당 파라미터를 잡기 위해 useParams hook을 import한다.

function Router () {
  return (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<Coins />}>
      </Route>
      <Route path="/:coinId" element={<Coin />}>
        <Route path="/:coinId/chart" element={<Chart />}></Route> 
        <Route path="price" element={<Price />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default Router