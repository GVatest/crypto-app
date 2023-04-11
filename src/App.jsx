import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Cryptocurrencies,
  Home,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path={"/"} element={<Home />}></Route>
              <Route
                exact
                path={"/cryptocurrencies"}
                element={<Cryptocurrencies />}
              ></Route>
              <Route
                exact
                path={"/crypto/:coinId"}
                element={<CryptoDetails />}
              ></Route>
              <Route exact path={"/news"} element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        <footer>
          <Typography.Title
            level={5}
            style={{ color: "#fff", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserverd
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/news'>News</Link>
          </Space>
        </footer>
      </div>
    </div>
  );
};

export default App;
