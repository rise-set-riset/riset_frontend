import { useState } from "react";
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
    font-size: 1rem;
    &:focus {
      outline: 1px solid var(--color-brand-main);
    }
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

export default function SettingInvite() {
  const jwt = localStorage.getItem("jwt");
  const [employeeName, setEmployeeName] = useState<string>("");
  const [employeeEmail, setEmployeeEmail] = useState<string>("");
  const [isSend, setIsSend] = useState<boolean>(false);

  /* 초대코드 이메일 발송 */
  const handleSendEmail = () => {
    // fetch(`https://dev.risetconstruction.net/preset/mail?email=${employeeEmail}`, {
    fetch(`http://43.203.11.249:8080/preset/mail?email=${employeeEmail}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    setIsSend(false);
  };

  return (
    <Layout>
      <main className="main">
        <h2 className="title">초대코드</h2>
        <MainContentLayout>
          <h3>초대코드를 발송할 직원의 정보를 입력하세요</h3>
          <MainInputBox>
            <InputLayout>
              <label htmlFor="employee-name">직원 이름</label>
              <input
                type="text"
                id="employee-name"
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
                id="employee-email"
                name="employee-email"
                placeholder="이메일을 입력하세요"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
              />
            </InputLayout>
          </MainInputBox>
          <SendButton onClick={handleSendEmail} disabled={isSend}>
            발송하기
          </SendButton>
        </MainContentLayout>
      </main>
    </Layout>
  );
}
