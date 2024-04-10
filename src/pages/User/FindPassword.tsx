import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";

const FindIdContainer = styled.div`
  width: 90%;
  max-width: 380px;
  max-height: 346px;
  margin: 70px auto; 
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

`

const FindIdHeaderWrapper = styled. div`
  width: 100%;
  height: 50px;
  margin-bottom: 40px;

  p:first-child{  
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    color: #353535
  };

  p:last-child{
    font-size: 16px;
    letter-spacing: 0.1px;
    color: #545454
  }
`
const FindIdBtn = styled.div`
  width: 100%;
  height: 50px;
  padding : 13px 20px;  
  margin-top : 24px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: #ff7f50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function FindPassword() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return <FindIdContainer>
    <FindIdHeaderWrapper>
      <p>비밀번호 찾기</p>
      <p>입력한 이메일로 임시 비밀번호가 발송됩니다.</p>
    </FindIdHeaderWrapper>
    <TextInput
            label="이름"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="이름을 입력하세요"
          />
      <TextInput
            label="이메일"
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
          />
    <FindIdBtn>이메일 발송</FindIdBtn>

  </FindIdContainer>
}
