import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/MainPage/Home";
import FlowerShopList from "./pages/ShopList/FlowerShopList";
import MyPageS from "./pages/MyPage/MyPageS";
import MyPageC from "./pages/MyPage/MyPageC";
import SubPage from "./pages/Subscribe/SubPage";
import Board from "./pages/Board/Board";
import DiscardedFlowers from "./pages/Board/DiscardedFlowers";
import SignUp from "./pages/Account/SignUp";
import SignIn from "./pages/Account/SignIn";
import ShopR from "./pages/Registration/ShopRegistration";
import FlowerR from "./pages/Registration/FlowerRegistration";
import Intro from "./pages/Intro/Intro";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shoplist" element={<FlowerShopList />} />
          <Route path="/mypagec" element={<MyPageC />} />
          <Route path="/mypages" element={<MyPageS />} />
          <Route path="/subscribe" element={<SubPage />} />
          <Route path="/board" element={<Board />} />
          <Route path="/discard" element={<DiscardedFlowers />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="flowerR" element={<FlowerR />} />
          <Route path="/shopR" element={<ShopR />} />
          <Route path="/intro" element={<Intro />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
