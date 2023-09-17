import React from "react";
import introIMG from "../../images/intro/intro.png";
import styled from 'styled-components';
import Header from "../../components/Navi";

const Background = styled.div`
  background-image: url(${introIMG});
  background-size: contain;
  background-position: center;
  height: 120vh;
  background-repeat: no-repeat;
  margin: 50px 0;
`;

const Intro = () => {
    return (
        <>
            <Header />
            {/* 아래 줄의 <introIMG />를 삭제하고 <Background />를 추가하세요. */}
            <Background />
        </>
    );
};

export default Intro;
