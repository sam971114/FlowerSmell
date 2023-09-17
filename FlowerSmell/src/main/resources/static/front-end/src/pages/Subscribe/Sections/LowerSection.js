import React from 'react';
import styled from 'styled-components';

const LowerSectionContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const CheckmarkEmoji = styled.span`
  margin-right: 0.5rem;
`;

const LowerSection = () => {
  return (
    <LowerSectionContainer>
      <Title>주문 전 읽어주세요!</Title>
      <List>
        <ListItem>
          <CheckmarkEmoji role="img" aria-label="checkmark">
            ✔️
          </CheckmarkEmoji>
          보유 하고 있는 꽃을 확인해주세요.
        </ListItem>
        <ListItem>
          <CheckmarkEmoji role="img" aria-label="checkmark">
            ✔️
          </CheckmarkEmoji>
          용도를 선택 해주세요.
        </ListItem>
        <ListItem>
          <CheckmarkEmoji role="img" aria-label="checkmark">
            ✔️
          </CheckmarkEmoji>
          예약 시간 변경은 24시간 전까지만 가능합니다.
        </ListItem>
      </List>
    </LowerSectionContainer>
  );
};

export default LowerSection;
