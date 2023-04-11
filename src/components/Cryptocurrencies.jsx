import { Card, Col, Input, Row } from "antd";
import millify from "millify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

function Cryptocurrencies({ simplified }) {
  const limit = simplified ? 10 : 100;
  const { data: cryptoList } = useGetCryptosQuery(limit);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (!cryptos) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className='cryto-card-container'>
        {cryptos?.map((currency) => (
          <Col
            cs={24}
            cm={12}
            lg={6}
            className='crypto-card'
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img className='crypto-image' src={currency.iconUrl}></img>
                }
                hoverable
              >
                <p>
                  Price: <b>{millify(currency.price)}</b>
                </p>
                <p>
                  Market Cap: <b>{millify(currency.marketCap)}</b>
                </p>
                <p>
                  Daily Change: <b>{millify(currency.change)}%</b>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrencies;
