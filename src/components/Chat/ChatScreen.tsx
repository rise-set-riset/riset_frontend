import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import styled from "styled-components";
import ChatMain from "./ChatMain";
import ChatRoomList from "./ChatRoomList";
import ChatMessage from "./ChatMessage";
import { Client } from "@stomp/stompjs";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";

const Layout = styled.div`
  z-index: 1000;
  position: fixed;
  right: 24px;
  bottom: 41px;
`;

const ModalStyle = styled.div<{ $state: string }>``;

const ChatPageLayout = styled.div`
  z-index: 2000;
  position: fixed;
  right: 24px;
  top: 60px;
  width: 500px;
  min-height: 650px;
  height: calc(100% - 140px);
  border-radius: 16px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  @media screen and (max-width: 500px) {
    width: 100%;
    height: calc(100% - 60px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    border-radius: 0px;
  }
`;

const ChatButton = styled.button`
  z-index: 1000;
  position: fixed;
  right: 24px;
  bottom: 24px;
  border: none;
  background: none;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    position: fixed;
    bottom: 80px;
  }
`;

interface ChatScreenProps {
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChatScreen({
  isChatOpen,
  setIsChatOpen,
}: ChatScreenProps) {
  const { isMobile } = useContext(ResponsiveContext);
  const [currentChatPage, setCurrentChatPage] = useState<string>("main");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<number>(0);
  const [selectToCreate, setSelectToCreate] = useState<boolean>(false);
  const handlePageChange = (name: string) => {
    setCurrentChatPage(name);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  // Overlay 클릭 시 모달 닫힘 X
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) setIsChatOpen(false);
  };

  return (
    <Layout>
      {!isMobile && (
        <ChatButton type="button" onClick={() => setIsChatOpen(!isChatOpen)}>
          <img src="/chat-icon.svg" alt="채팅버튼" />
        </ChatButton>
      )}

      <Transition in={isChatOpen} timeout={500} mountOnEnter unmountOnExit>
        {(state) =>
          createPortal(
            <ModalStyle onClick={handleClick} $state={state}>
              {isChatOpen && (
                <ChatPageLayout ref={chatRef}>
                  {currentChatPage === "main" && (
                    <ChatMain
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                      setCurrentRoomId={setCurrentRoomId}
                      selectToCreate={selectToCreate}
                      setSelectToCreate={setSelectToCreate}
                    />
                  )}
                  {currentChatPage === "list" && (
                    <ChatRoomList
                      setCurrentRoomId={setCurrentRoomId}
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                      setSelectToCreate={setSelectToCreate}
                    />
                  )}
                  {currentChatPage === "message" && (
                    <ChatMessage
                      currentRoomId={currentRoomId}
                      isChatOpen={isChatOpen}
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                    />
                  )}
                </ChatPageLayout>
              )}
            </ModalStyle>,
            document.getElementById("modal-root") as HTMLDivElement
          )
        }
      </Transition>
    </Layout>
  );
}
