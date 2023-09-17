import React, { useRef } from "react";
import styled, { css } from "styled-components";

const Input = styled.input`
  resize: none;
  border: solid;
  border-color: #d9d9d9;
  border-radius: 10px;
  background: #ffffff;
  width: 220px;
  height: 50px;
  margin: 10px 0;
  background: transparent;
  /* 포커스 스타일 설정 */
  &:focus {
    outline: none;
  }
`;

const SearchBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 300px;
`;

const SearchBox = ({ input_type, comment, onChange }) => {
  const handleInputChange = (event) => {
    const value = event.target.value;
    onChange(value); // 상위 컴포넌트로 입력값 전달
  };

  return (
    <SearchBoxContainer>
      <Input
        type={input_type}
        placeholder={comment}
        onChange={handleInputChange}
      />
    </SearchBoxContainer>
  );
};

export default SearchBox;
