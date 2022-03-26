import {
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import { IPrice, IInfo } from "./interface";
import Chart from "./Chart";
import Info from "./Info";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchInfo, fetchPrice } from "../Api";
import { Helmet } from "react-helmet-async";

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
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  a {
    color: ${(props) =>
      props.isActive ? "white" : props.theme.colors.textColor_02};
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams();
  // eslint-disable-next-line
  const location = useLocation();

  const chartMatch = useMatch("/:coinId/chart");
  const infoMatch = useMatch("/:coinId/info");

  const { isLoading: infoLoading, data: info } = useQuery<IInfo>(["info"], () =>
    fetchInfo(coinId!)
  );
  const { isLoading: priceLoading, data: price } = useQuery<IPrice>(
    ["price"],
    () => fetchPrice(coinId!),
    { refetchInterval: 1000 }
  );

  let isLoading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{`${coinId} | Coin`}</title>
      </Helmet>
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
              <span>Price:</span>
              <span>${price?.quotes.USD.price.toFixed(6)}</span>
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

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={infoMatch !== null}>
              <Link to={`/${coinId}/info`}>Info</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="info" element={<Info />} />
          </Routes>
        </ContentBox>
      )}
    </Container>
  );
}

export default Coin;
