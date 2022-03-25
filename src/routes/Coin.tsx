import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { IPrice, IInfo } from "./interface";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
`;
const Header = styled.header`
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor_02};
`;
const rotateLoader = keyframes` {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`;
const LoaderBox = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateLoader} 2s linear infinite;
`;
const ContentBox = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 95vw;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

function Coin() {
  const { coinId } = useParams();
  // eslint-disable-next-line
  const location = useLocation();

  const [info, setInfo] = useState<IInfo>();
  const [price, setPrice] = useState<IPrice>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      .then((res) => res.json())
      .then((info) => {
        setInfo(info);
        setIsLoading(false);
      });
    fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      .then((res) => res.json())
      .then((price) => {
        setPrice(price);
        setIsLoading(false);
      });
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{info?.name}</Title>
      </Header>
      {isLoading ? (
        <LoaderBox>
          <FiLoader size={30} />
        </LoaderBox>
      ) : (
        <ContentBox>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
        </ContentBox>
      )}
    </Container>
  );
}

export default Coin;
