import { Col, Row, Typography } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamp = [];

  if (!coinHistory || !coinPrice || !coinName) return <Loader />;

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
    console.log(coinHistory.data.history[i].timestamp);
  }
  console.log(coinHistory);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  return (
    <>
      <Row className='chart-header'>
        <Typography.Title level={2} className='chart-title'>
          {coinName} price Chart
        </Typography.Title>
        <Col className='price-container'>
          <Typography.Title level={5} className='price-change'>
            {coinHistory?.data?.change}
          </Typography.Title>
          <Typography.Title level={5} className='current-price'>
            Current {coinName} Price: {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}

export default LineChart;
