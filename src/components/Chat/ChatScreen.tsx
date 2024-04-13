import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../common/Modal";
import ChatMain from "./ChatMain";

const Layout = styled.div`
  z-index: 1000;
  position: fixed;
  right: 24px;
  bottom: 41px;
`;

const ChatPageLayout = styled.div`
  z-index: 2000;
  position: fixed;
  right: 24px;
  bottom: 41px;
  max-width: 500px;
  max-height: 842px;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: var(--color-white);
`;

const ChatButton = styled.button`
  z-index: 1000;
  position: fixed;
  right: 24px;
  bottom: 41px;
  border: none;
  background: none;
  cursor: pointer;
`;

export default function ChatScreen() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  return (
    <Layout>
      <ChatButton type="button" onClick={() => setIsChatOpen(!isChatOpen)}>
        <img src="/chatButton.png" alt="채팅버튼" />
      </ChatButton>
      {isChatOpen && (
        <Modal isModalOpen={isChatOpen} handleIsModalOpen={setIsChatOpen}>
          <ChatPageLayout>
            <ChatMain />
          </ChatPageLayout>
        </Modal>
      )}
    </Layout>
  );
}
