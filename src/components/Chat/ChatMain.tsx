import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import { PiChatCircleDots } from "react-icons/pi";

const Layout = styled.div`
  padding: 1.5rem;
  height: 100%;

  @media screen and (max-width: 500px) {
    padding: 1rem;
  }
`;

const TitleBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CloseIcon = styled(CgClose)`
  font-size: 1.2rem;
  cursor: pointer;
`;

const MemberCardList = styled.main`
  margin-top: 1rem;
  height: calc(100% - 180px);
  overflow-y: auto;
`;

const MemberCardBox = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-brand-lightgray);
  cursor: pointer;

  @media screen and (max-width: 500px) {
    padding: 1.5rem 0.5rem;
  }

  @media screen and (max-width: 430px) {
    padding: 1rem 0.5rem;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const SearchBox = styled.div`
  input {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    div {
      height: 2.2rem;

      input {
        font-size: 1rem;
      }
    }
  }
`;

const PlusChatIcon = styled(FiPlusCircle)`
  font-size: 1.2rem;
  cursor: pointer;
`;

const ChatBubbleIcon = styled(PiChatCircleDots)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonBox = styled.footer`
  width: 100%;
  height: 100px;
  padding: 1.5rem;
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-white);
  border-radius: 0 0 16px 16px;
  box-shadow: 5px 5px 5px -5px var(--color-brand-lightgray);

  @media screen and (max-width: 430px) {
    padding: 1rem;
  }

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

    @media screen and (max-width: 430px) {
      padding: 0.8rem 1rem;
    }
  }

  button:nth-child(2) {
    background-color: var(--color-white);
    color: var(--color-brand-main);
  }
`;

interface ChatMainProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
}
export default function ChatMain({
  handlePageChange,
  handleChatClose,
}: ChatMainProps) {
  const TestInfo = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
    name: "홍길동",
    rank: "사원",
    department: "개발팀",
    position: "프론트",
  };

  const handleAddChatRoot = () => {
    handlePageChange("message");
  };

  return (
    <Layout>
      <TitleBox>
        <h2>채팅</h2>
        <CloseIcon onClick={handleChatClose} />
      </TitleBox>

      <SearchBox>
        <SearchBar placeholder="이름 검색" />
      </SearchBox>

      <MemberCardList>
        {[...Array(20)].map((_, index) => (
          <MemberCardBox>
            <MemberCard memberInfo={TestInfo} />
            <ChatBubbleIcon />
          </MemberCardBox>
        ))}
      </MemberCardList>

      <ButtonBox>
        <button onClick={handleAddChatRoot}>
          <PlusChatIcon />
          <div>새 채팅</div>
        </button>
        <button onClick={() => handlePageChange("list")}>
          <ChatBubbleIcon />
          <div>채팅목록</div>
        </button>
      </ButtonBox>
    </Layout>
  );
}
