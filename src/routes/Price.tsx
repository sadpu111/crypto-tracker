import styled from "styled-components";
import {useOutletContext} from "react-router-dom"
import { PriceData } from "./Coin";


interface PriceProps { // import한 interface를 바로 적용할 수 있다.
  tickersData: PriceData;

}

const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const AthInfo = styled.div`
	display: flex;
  padding: 40px 20px;
	align-items: center;
	flex-direction: row;
	grid-column: 1 / 3;
	grid-row: 1 / 3;
	justify-content: space-between;
  background-color:${(props) => props.theme.cardBgColor};
  border-radius: 0.7rem;
  border: 1px solid white;
  span {
    &:first-child {
      text-align: center;
      line-height: 20px;
      text-transform: uppercase;
      font-weight: 600;
      padding-left: 20px;
    }
    &:last-child {
      font-size: 30px;
      padding-right: 20px;
    }
  }
`;


const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color:${(props) => props.theme.cardBgColor};
  padding: 30px 20px;
  border-radius: 10px;
  border: 1px solid white;
  color: ${(props) => props.theme.bgColor};
  span {
    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      color: ${(props) => props.theme.textColor};;
    }
    &:last-child {
      margin-top: 20px;
      font-size: 30px;
      color: ${props => props.theme.textColor};
    }
  }
`;

const Percentage = styled.div<{value:number}>`
  margin-top: 20px;
  font-size: 30px;
  color: ${props => props.value > 0 ? "green" : "red"};
`;

function Price() {
  const { tickersData } = useOutletContext<PriceProps>();
  const USD = tickersData.quotes.USD;
  const athDate = new Date(USD.ath_date);
	const athDateString = athDate.toLocaleDateString("ko-KR");
	const athTimeString = athDate.toLocaleTimeString("ko-KR");
  return (
    
    <PriceInfoContainer>
      <AthInfo>
        <span>{athDateString} {athTimeString}<br />
				최고가 달성</span>
        <span>${USD.ath_price.toFixed(3)}</span>
      </AthInfo>
      <PriceInfo>
        <span>최고가(ATH) 대비(%)</span>
        <Percentage value={USD.percent_from_price_ath}>{USD.percent_from_price_ath}</Percentage>
      </PriceInfo>
      <PriceInfo>
        <span>1년 전 대비(%)</span>
        <Percentage value={USD.percent_change_1y}>{USD.percent_change_1y}</Percentage>
      </PriceInfo>
      <PriceInfo>
        <span>24시간 전(%)</span>
        <Percentage value={USD.percent_change_24h}>{USD.percent_change_24h}</Percentage>
      </PriceInfo>
      <PriceInfo>
        <span>1시간 전 대비(%)</span>
        <Percentage value={USD.percent_change_1h}>{USD.percent_change_1h}</Percentage>
      </PriceInfo>
      <PriceInfo>
        <span>30분 전 대비(%)</span>
        <Percentage value={USD.percent_change_30m}>{USD.percent_change_30m}</Percentage>
      </PriceInfo>
      <PriceInfo>
        <span>15분 전 대비(%)</span>
        <Percentage value={USD.percent_change_15m}>{USD.percent_change_15m}</Percentage>
      </PriceInfo>
    </PriceInfoContainer>
  );}

export default Price;
