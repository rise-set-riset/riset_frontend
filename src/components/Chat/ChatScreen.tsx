import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";
import styled, { css } from "styled-components";
import ChatMain from "./ChatMain";
import ChatRoomList from "./ChatRoomList";
import ChatMessage from "./ChatMessage";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";

const Layout = styled.div`
  z-index: 1000;
  position: fixed;
  right: 24px;
  bottom: 41px;
`;

const ChatPageLayout = styled.div<{ $state: string }>`
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

  transition: opacity 0.3s;
  ${(props) => {
    switch (props.$state) {
      case "entering":
        return css`
          &:first-child {
            opacity: 1;
          }
        `;
      case "entered":
        return css`
          &:first-child {
            opacity: 1;
          }
        `;
      case "exiting":
        return css`
          &:first-child {
            opacity: 0;
          }
        `;
      case "exited":
        return css`
          &:first-child {
            opacity: 0;
          }
        `;
    }
  }};

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
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [currentChatPage, setCurrentChatPage] = useState<string>("main");
  const [currentRoomId, setCurrentRoomId] = useState<number>(0);
  const [selectToCreate, setSelectToCreate] = useState<boolean>(false);
  const [clickCreateRoom, setClickCreateRoom] = useState<boolean>(false);
  const [currentMembersId, setCurrentMembersId] = useState<any>([]);

  // 마저 확인 필요
  const handlePageChange = (name: string) => {
    setCurrentChatPage(name);
    if (clickCreateRoom) {
      setSelectToCreate(true);
      setClickCreateRoom(false);
    } else {
      setSelectToCreate(false);
    }
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
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
            <div>
              {isChatOpen && (
                <ChatPageLayout ref={chatRef} $state={state}>
                  {currentChatPage === "main" && (
                    <ChatMain
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                      setCurrentRoomId={setCurrentRoomId}
                      selectToCreate={selectToCreate}
                      setSelectToCreate={setSelectToCreate}
                      setCurrentMembersId={setCurrentMembersId}
                    />
                  )}
                  {currentChatPage === "list" && (
                    <ChatRoomList
                      setCurrentRoomId={setCurrentRoomId}
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                      setClickCreateRoom={setClickCreateRoom}
                      setCurrentMembersId={setCurrentMembersId}
                    />
                  )}
                  {currentChatPage === "message" && (
                    <ChatMessage
                      currentRoomId={currentRoomId}
                      handlePageChange={handlePageChange}
                      handleChatClose={handleChatClose}
                      currentMembersId={currentMembersId}
                    />
                  )}
                </ChatPageLayout>
              )}
            </div>,
            document.getElementById("modal-root") as HTMLDivElement
          )
        }
      </Transition>
    </Layout>
  );
}
