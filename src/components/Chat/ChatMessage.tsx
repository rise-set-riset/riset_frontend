import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import { PiChatCircleDots } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

const Layout = styled.div`
  position: relative;
`;

const TitleBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-bottom: 1rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ChatPartner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  h2 {
    font-size: 1.2rem;
  }
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const CloseIcon = styled(CgClose)`
  font-size: 1.2rem;
`;

const ArrowBackIcon = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const DialogueBox = styled.main`
  margin-top: 1rem;
  height: 700px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PartnerMessage = styled.div`
  margin-right: auto;
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  span:nth-child(1) {
    padding: 0.8rem 1rem;
    background-color: var(--color-gray-1);
    border-radius: 0 1rem 1rem 1rem;
  }
  span:nth-child(2) {
    color: var(--color-brand-lightgray);
    font-size: 0.8rem;
  }
`;

const PartnerFile = styled(PartnerMessage)``;

const MyMessage = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  gap: 0.5rem;

  span:nth-child(1) {
    background-color: var(--color-brand-yellow);
    padding: 0.8rem 1rem;
    border-radius: 1rem 1rem 0 1rem;
  }
  span:nth-child(2) {
    color: var(--color-brand-lightgray);
    font-size: 0.8rem;
  }
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
        <div>
          <ArrowBackIcon />
          <ChatPartner>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
              alt="대화상대"
            />
            <h2>박씨</h2>
          </ChatPartner>
        </div>
        <CloseIcon />
      </TitleBox>

      <SearchBar />

      <DialogueBox>
        <ChatPartner>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
            alt="대화상대"
          />
          <h2>박씨</h2>
        </ChatPartner>

        <PartnerMessage>
          <span>안녕하세요?</span>
          <span>오전 8:40</span>
        </PartnerMessage>

        <PartnerFile>
          <div>
            <span>파일명.pdf</span>
            <span>오전 9:03</span>
          </div>
          <div>다운로드</div>
        </PartnerFile>

        <MyMessage>
          <span>안녕하세요?</span>
          <span>오전 8:40</span>
        </MyMessage>
      </DialogueBox>

      <ButtonBox>
        <button>
          <div>새 채팅</div>
        </button>
      </ButtonBox>
    </Layout>
  );
}
