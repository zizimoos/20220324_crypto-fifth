import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor_02};
`;

function Coin() {
  const { coinId } = useParams();
  return <Title>COIN : {coinId}</Title>;
}

export default Coin;
