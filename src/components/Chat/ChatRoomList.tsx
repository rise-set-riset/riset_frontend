import React, { useEffect } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";

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

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
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

const CloseIcon = styled(CgClose)`
  font-size: 1.2rem;
  cursor: pointer;
`;

const ArrowBackIcon = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const MemberCardList = styled.main`
  margin-top: 0.5rem;
  height: calc(100% - 150px);
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

const PlusChatIcon = styled(FiPlusCircle)`
  font-size: 1.2rem;
  cursor: pointer;
`;

const ButtonStyle = styled.button`
  width: 126px;
  height: 44px;
  padding: 0.5rem;
  margin: 1rem 0 1rem auto;
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

// const NumberCircle = styled.div`
//   background-color: var(--color-brand-main);
//   color: var(--color-white);
//   width: 1.5rem;
//   height: 1.5rem;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 14px;
//   font-weight: bold;
// `;

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

interface ChatRoomListProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  setCurrentRoomId: React.Dispatch<React.SetStateAction<number>>;
  setSelectToCreate: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ChatRoomList({
  handlePageChange,
  handleChatClose,
  setCurrentRoomId,
  setSelectToCreate,
}: ChatRoomListProps) {
  const TestInfo = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
    name: "홍길동",
    rank: "사원",
    department: "개발팀",
    position: "프론트",
  };

  /* 채팅방 클릭시 */
  const handleRoomClick = (roomId: number) => {
    setCurrentRoomId(roomId);
    handlePageChange("message");
  };

  /* 새 채팅 클릭시 */
  const handleCreateRoom = () => {
    setSelectToCreate(true);
    handlePageChange("main");
  };

  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    fetch(`https://dev.risetconstruction.net/chatRoom`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("data", data));
  }, []);

  return (
    <Layout>
      <TitleBox>
        <div>
          <ArrowBackIcon onClick={() => handlePageChange("main")} />
          <h2>채팅목록</h2>
        </div>
        <CloseIcon onClick={handleChatClose} />
      </TitleBox>

      <div>
        <ButtonStyle onClick={handleCreateRoom}>
          <PlusChatIcon />
          <div>새 채팅</div>
        </ButtonStyle>
      </div>

      <SearchBox>
        <SearchBar placeholder="이름 검색" />
      </SearchBox>

      <MemberCardList>
        {Array.from({ length: 20 }, (_, index) => (
          <MemberCardBox onClick={() => handleRoomClick(1)}>
            <MemberCard memberInfo={TestInfo} />
            <ChatSide>
              {/* <NumberCircle>5</NumberCircle> */}
              <VerticalIcon />
            </ChatSide>
          </MemberCardBox>
        ))}
      </MemberCardList>
    </Layout>
  );
}
