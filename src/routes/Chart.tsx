import { useQuery } from "react-query";
import { fetchCoinHistory } from "../Api";
import ApexChart from "react-apexcharts";
import { Helmet } from "react-helmet-async";

interface IChart {
  coinId: string;
}
interface IHistory {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

function Chart({ coinId }: IChart) {
  const { isLoading, data } = useQuery<IHistory[]>(
    "history",
    () => fetchCoinHistory(coinId!),
    { refetchInterval: 1000 }
  );
  return (
    <>
      {isLoading ? (
        <div>isLoading ...</div>
      ) : (
        <>
          <Helmet>Chart</Helmet>
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((ohlc) => ({
                    x: new Date(ohlc.time_open),
                    y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
                  })) ?? [],
              },
            ]}
            options={{
              theme: { mode: "dark" },
              chart: {
                width: "100%",
                height: "100%",
                background: "transparent",
              },
              title: {
                text: "CandleStick Chart",
                align: "left",
                style: {
                  fontSize: "14px",
                  // fontFamily: "Helvetica, Arial, sans-serif",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: "light",
                  color: "silver",
                },
              },
              xaxis: {
                type: "datetime",
                labels: {
                  show: true,
                  datetimeUTC: true,
                  datetimeFormatter: {
                    year: "yyyy",
                    month: "MMM 'yy",
                    day: "dd MMM",
                    hour: "HH:mm",
                  },
                },
              },
              yaxis: {
                show: true,
                tooltip: {
                  enabled: true,
                },
                labels: {
                  show: true,
                  formatter: (value) => {
                    return value.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      // maximumFractionDigits: 4,
                    });
                  },
                },
              },
            }}
          />
        </>
      )}
    </>
  );
}

export default Chart;
