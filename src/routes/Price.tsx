import styled from "styled-components";
import { PriceData } from "./Coin";

const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color:rgba(0, 0, 0, 0.5);
  padding: 30px 20px;
  border-radius: 5px;
  color: ${(props) => props.theme.bgColor};
  span {
    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      color: white;
    }
    &:last-child {
      margin-top: 20px;
      font-size: 30px;
      color: ${props => props.theme.textColor};
    }
  }
`;

function Price() {
  return (
    <PriceInfoContainer>
      <PriceInfo>
        <span>1 year(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>30 days(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>24 hour(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>12 hour(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>6 hour(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>1 hour</span>
        <span>percent change</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>30 min(%)</span>
        <span>값</span>
      </PriceInfo>

      <PriceInfo>
        <span>15 min(%)</span>
        <span>값</span>
      </PriceInfo>
    </PriceInfoContainer>
  );}

export default Price;
