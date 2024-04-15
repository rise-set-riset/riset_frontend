import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";

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
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
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

const MemberCardList = styled.main`
  margin-top: 1rem;
  height: 620px;
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

const ButtonStyle = styled.button`
  width: 126px;
  height: 44px;
  padding: 0.5rem;
  margin-left: auto;
  margin-bottom: 1.5rem;
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
`;

const NumberCircle = styled.div`
  background-color: var(--color-brand-main);
  color: var(--color-white);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

const ChatSide = styled.div`
  position: relative;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 1.2rem;
`;

const VerticalIcon = styled(FiMoreVertical)`
  font-size: 1.5rem;
`;

export default function ChatMessage() {
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

      <div>
        <ButtonStyle>
          <PlusChatIcon />
          <div>새 채팅</div>
        </ButtonStyle>
      </div>

      <SearchBar placeholder="내용 검색" />

      <MemberCardList>
        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>

        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>

        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>

        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>

        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>

        <MemberCardBox>
          <MemberCard memberInfo={TestInfo} />
          <ChatSide>
            <NumberCircle>2</NumberCircle>
            <VerticalIcon />
          </ChatSide>
        </MemberCardBox>
      </MemberCardList>
    </Layout>
  );
}
