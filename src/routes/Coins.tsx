import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../Api";

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
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.colors.textColor_02};
  color: white;
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
const CoinList = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 95vw;
  }
`;
const Coin = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.colors.textColor_01};
  background-color: ${(props) => props.theme.colors.bgColor_02};
  a {
    display: block;
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.colors.hoverColor};
    }
  }
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoins[]>("allcoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      {isLoading ? (
        <LoaderBox>
          <FiLoader size={30} />
        </LoaderBox>
      ) : (
        <CoinList>
          {coins?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}/chart`} state={{ name: coin.name }}>
                {/* <img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.symbol}
                /> */}
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
