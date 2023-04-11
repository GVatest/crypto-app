import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImg =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  const [news, setNews] = useState([]);
  const { data: cryptoList } = useGetCryptosQuery(100);

  useEffect(() => {
    setNews(cryptoNews);
  }, [cryptoNews]);

  if (!news?.value) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {cryptoList?.data?.coins.map((coin, i) => (
              <Option key={i} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {news.value.map((post, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={post.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {post.name.length > 80
                    ? `${post.name.substring(0, 80)}...`
                    : post.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={post?.image?.thumbnail?.contentUrl || demoImg}
                  alt='news'
                />
              </div>
              <p>
                {post.description.length > 100
                  ? `${post.description.substring(0, 100)}...`
                  : post.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar
                    src={
                      post.provider[0]?.image?.thumbnail?.contentUrl ?? demoImg
                    }
                    alt='news'
                  ></Avatar>
                  <Text className='provider-name'>
                    {post.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(post.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
