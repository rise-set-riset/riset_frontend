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
`;

const FindIdHeaderWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 40px;

  p:first-child {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    letter-spacing: 0.5px;
    color: #353535;
  }

  p:last-child {
    font-size: 16px;
    letter-spacing: 0.1px;
    color: #545454;
  }
`;
const FindIdBtn = styled.div`
  width: 100%;
  height: 50px;
  padding: 13px 20px;
  margin-top: 24px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: #ff7f50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function FindId() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // 입력 필드의 값이 변경되면 해당값을 name에 반영
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 입력 필드의 값이 변경되면 해당값을 email에 반영
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 입력된 이름과 이메일을 서버에 POST 요청으로 전송
  const sendEmail = async () => {
    const data = {
      name: name,
      email: email,
    };

    try {
      const response = await fetch("https://dev.risetconstruction.net/auth/find-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("이메일 전송에 실패했습니다.");
      }

      const responseData = await response.json();
    } catch (error: any) {
      console.error("이메일 전송 중 오류가 발생했습니다.", error.message);
    }
  };

  sendEmail();

  return (
    <FindIdContainer>
      <FindIdHeaderWrapper>
        <p>아이디 찾기</p>
        <p>입력한 이메일로 아이디가 발송됩니다.</p>
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
      <FindIdBtn onClick={sendEmail}>이메일 발송</FindIdBtn>
    </FindIdContainer>
  );
}
