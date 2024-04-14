import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import { PiChatCircleDots } from "react-icons/pi";

const Layout = styled.div`
  position: relative;
  padding: 1.5rem;
`;

const TitleBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 1.5rem;
`;

const CloseIcon = styled(CgClose)`
  font-size: 1.2rem;
`;

const MemberCardList = styled.main`
  margin-top: 1rem;
  height: 700px;
  overflow-y: auto;
`;

const MemberCardBox = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const PlusChatIcon = styled(FiPlusCircle)`
  font-size: 1.2rem;
`;

const ChatBubbleIcon = styled(PiChatCircleDots)`
  font-size: 1.5rem;
`;

const ButtonBox = styled.footer`
  width: 100%;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-white);

  button {
    flex-grow: 1;
    padding: 0.8rem 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-white);
    background-color: var(--color-brand-main);
    border: none;
    border-radius: 0.5rem;
    border: 1px solid var(--color-brand-main);
    cursor: pointer;
  }

  button:nth-child(2) {
    background-color: var(--color-white);
    color: var(--color-brand-main);
  }
`;

export default function ChatMain() {
  const TestInfo = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
    name: "홍길동",
    rank: "사원",
    department: "개발팀",
    position: "프론트",
  };

  return (
    <Layout>
      <TitleBox>
        <h2>채팅</h2>
        <CloseIcon />
      </TitleBox>

      <SearchBar />

      <MemberCardList>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatBubbleIcon />
        </MemberCardBox>
      </MemberCardList>

      <ButtonBox>
        <button>
          <PlusChatIcon />
          <div>새 채팅</div>
        </button>
        <button>
          <ChatBubbleIcon />
          <div>채팅목록</div>
        </button>
      </ButtonBox>
    </Layout>
  );
}
