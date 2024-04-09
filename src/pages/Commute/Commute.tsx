import { useState } from "react";
import styled from "styled-components";
import Modal from "../../common/Modal";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Test = styled.div`
  width: 50vw;
  height: 50vh;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--color-white);
`;

const Button = styled.button`
  width: 200px;
  padding: 1rem;
`;

export default function Commute() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Layout>
      <main className="main">
        <h1 className="title">출퇴근</h1>
        <Button onClick={() => setIsModalOpen((prev) => !prev)}>버튼</Button>
        <Modal isModalOpen={isModalOpen} handleIsModalOpen={setIsModalOpen}>
          <Test>
            <div>테스트입니다</div>
          </Test>
        </Modal>
      </main>
    </Layout>
  );
}
