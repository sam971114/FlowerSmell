import React, { useRef } from "react";
import styled, { css } from "styled-components";

const InputContainer = styled.div`
  width: 100%;
  height: 70px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  border: solid;
  border-color: #d9d9d9;
  background: #ffffff;
  cursor: pointer; /* 마우스 커서 모양을 변경하여 클릭 가능한 것을 나타냄 */
  p {
    color: #ff0707;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Inter;
    font-size: 14px;
    font-style: bold;
    font-weight: 500;
    line-height: 22px; /* 55% */
    margin: 10px 10px 0 10px;
  }
`;
const Input = styled.input`
  resize: none;
  width: 95%;
  height: 50px;
  border: none;
  margin: 0 10px;
  background: transparent;
  /* 포커스 스타일 설정 */
  &:focus {
    outline: none;
  }
`;

const InputBox = ({ input_type, title, comment, value, onChange }) => {
  const inputRef = useRef(null);

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <>
      <InputContainer onClick={handleContainerClick}>
        <p>{title}</p>
        <Input
          ref={inputRef}
          type={input_type}
          placeholder={comment}
          value={value}
          onChange={onChange}
        />
      </InputContainer>
    </>
  );
};

export default InputBox;
