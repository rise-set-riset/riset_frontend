import { useState } from "react";
import TestChat from "../../components/Chat/TestChat";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MainContentLayout = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  gap: 4rem;
`;

const MainInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-weight: bold;
    font-size: 0.8rem;
  }

  input {
    width: 100%;
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-brand-lightgray);
  }
`;

const SendButton = styled.button`
  width: 100%;
  padding: 0.8rem 4rem;
  background-color: var(--color-brand-main);
  border: 1px solid var(--color-brand-main);
  color: var(--color-white);
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
`;

export default function Setting() {
  const jwt = localStorage.getItem("jwt");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeEmail, setEmployeeEmail] = useState<string>("");

  /* 초대코드 이메일 발송 */
  const handleSendEmail = () => {
    fetch(
      "https://dev.risetconstruction.net/preset/mail?email=jinsung8782@naver.com",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("ok");
      }
    });
  };

  return (
    <Layout>
      {/* <TestChat /> */}
      <main className="main">
        <h2 className="title">초대코드</h2>
        <MainContentLayout>
          <h3>초대코드를 발송할 직원의 정보를 입력하세요</h3>
          <MainInputBox>
            <InputLayout>
              <label htmlFor="employee-name">직원 이름</label>
              <input
                type="text"
                name="employee-name"
                placeholder="이름을 입력하세요"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </InputLayout>
            <InputLayout>
              <label htmlFor="employee-email">이메일</label>
              <input
                type="email"
                name="employee-email"
                placeholder="이메일을 입력하세요"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
              />
            </InputLayout>
          </MainInputBox>
          <SendButton onClick={handleSendEmail}>발송하기</SendButton>
        </MainContentLayout>
      </main>
    </Layout>
  );
}
