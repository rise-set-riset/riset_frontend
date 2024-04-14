import React, { useState } from "react";
import styled from "styled-components";
import ChatMain from "./ChatMain";
import ChatList from "./ChatRoomList";
import ChatMessage from "./ChatMessage";

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
  /* bottom: 41px; */
  bottom: 50px;
  max-width: 500px;
  max-height: 842px;
  width: 100%;
  height: 100%;
  /* padding: 1.5rem; */
  border-radius: 16px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ChatButton = styled.button`
  z-index: 1000;
  position: fixed;
  right: 24px;
  /* bottom: 41px; */
  bottom: 30px;
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
        <ChatPageLayout>
          {/* <ChatMain /> */}
          {/* <ChatList /> */}
          <ChatMessage />
        </ChatPageLayout>
      )}
    </Layout>
  );
}

// /* Event Form 팝업창 외 클릭 감지 */
// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (formRef.current && !formRef.current.contains(event.target as Node)) {
//       /* Form 팝업창 닫기 */
//       setIsFormOpen(false);
//       /* 이벤트 삭제 */
//       if (calendarRef.current) {
//         const calendarApi = calendarRef.current.getApi();
//         const unfixedEventObj = calendarApi.getEventById("unfixed");
//         if (unfixedEventObj) {
//           unfixedEventObj.remove();
//         }
//       }
//     }
//   };
//   document.body.addEventListener("click", handleClickOutside);

//   return () => {
//     document.body.removeEventListener("click", handleClickOutside);
//   };
// }, []);
