// 판매자, 소비자 토글
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import MyPageC from '../pages/MyPage/MyPageC';
import MyPageS from '../pages/MyPage/MyPageS';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const ToggleBtn = styled.button`
  width: 65px;
  height: 25px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.isMypageS ? 'rgb(120, 199, 255)' : 'rgb(107, 255,119)')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.5s ease-in-out;
  font-size: 10px;
  overflow: visible; // visible로 변경
`;

const Circle = styled.div`
  background-color: white;
  width: 19px;
  height: 19px;
  border-radius: 50px;
  position: absolute;
  left: ${(props) => (props.isMypageS ? 'calc(100% - 19px - 3px)' : '3px')};
  transition: left 0.5s ease-in-out;
  z-index: 2;
`;

const ButtonText = styled.span`
  position: absolute;
  top: 45%; // 위치 조절 --- 이 부분이 여전히 필요하다면 유지해주세요.
  transition: all 0.5s ease-in-out;
  white-space: nowrap;
  z-index: 1;

  ${(props) =>
    props.isMypageS
      ? css`
          left: 13%; // 판매자 위치
          transform: translateY(-50%); // translateY만 적용

        `
      : css`
          left: 42%; // 소비자 위치
          transform: translateY(-50%); // translateY만 적용
        `}
`;


const FadeWrapper = styled.div`
  animation: ${(props) => (props.fadeIn ? fadeIn : fadeOut)} 0.5s;
`;

export default function Toggle() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMypageS = location.pathname === '/mypages';
  const [toggle, setToggle] = useState(isMypageS);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setToggle(isMypageS);
  }, [location]);

  const handleAnimationEnd = () => {
    if (!fadeIn) {
      navigate(isMypageS ? '/mypagec' : '/mypages');
    }
    setFadeIn(true);
  };

  const clickedToggle = () => {
    setToggle(!toggle);
    setFadeIn(false);
  };

  return (
    <Wrapper>
      <ToggleBtn onClick={clickedToggle} isMypageS={toggle}>
        <Circle isMypageS={toggle} />
        <ButtonText isMypageS={toggle}>{!toggle ? '소비자' : '판매자'}</ButtonText>
      </ToggleBtn>
      <FadeWrapper onAnimationEnd={handleAnimationEnd} fadeIn={fadeIn}>
        <Routes>
          <Route path="/mypagec" element={<MyPageC />} />
          <Route path="/mypages" element={<MyPageS />} />
        </Routes>
      </FadeWrapper>
    </Wrapper>
  );
}
