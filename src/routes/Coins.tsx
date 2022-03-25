import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.header``;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor_02};
`;
const CoinList = styled.div``;
const Coin = styled.div``;

function Coins() {
  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      <CoinList>
        <Coin></Coin>
      </CoinList>
    </Container>
  );
}

export default Coins;
