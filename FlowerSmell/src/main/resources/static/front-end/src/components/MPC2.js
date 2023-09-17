//내가 찜한 꽃집
import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const FavoriteContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 2px solid black;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const FavoriteText = styled.span`
  font-size: 1.25rem;
`;

const Mpc_2 = () => {
  return (
    <ContentWrapper>
      <FavoriteContainer>
        <FavoriteText>내가 찜한 꽃집 목록</FavoriteText>
      </FavoriteContainer>
      {/* 사용자가 찜한 꽃집 데이터를 반영하는 컴포넌트를 추가 */}
    </ContentWrapper>
  );
};

export default Mpc_2;
