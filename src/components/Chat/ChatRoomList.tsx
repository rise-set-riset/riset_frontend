import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../common/SearchBar";
import ChatRoomCard from "./ChatRoomCard";
import { CgClose } from "react-icons/cg";
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

const ChatRoomCardList = styled.main`
  margin-top: 0.5rem;
  height: calc(100% - 150px);
  overflow-y: auto;
`;

const ChatRoomCardBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const ChatRoomContent = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ChatSide = styled.div`
  position: relative;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 1.2rem;
  padding-right: 1rem;
`;

const VerticalIcon = styled(FiMoreVertical)`
  font-size: 1.5rem;
  position: relative;
  &:hover {
    color: var(--color-brand-main);
  }
`;

/* 채팅방 삭제 및 이름 수정 드롭다운 메뉴 */
const DropdownMenu = styled.ul`
  z-index: 5000;
  position: absolute;
  top: 2rem;
  right: 4px;
  width: 7rem;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  li {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

interface ChatRoomDataType {
  chatRoomId: number;
  chatRoomName: string;
  createAt: string;
  lastChat: any;
  members: MembersType[];
}

interface MembersType {
  [key: string]: string | number;
}

interface ChatRoomListProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  setCurrentRoomId: React.Dispatch<React.SetStateAction<number>>;
  setClickCreateRoom: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ChatRoomList({
  handlePageChange,
  handleChatClose,
  setCurrentRoomId,
  setClickCreateRoom,
}: ChatRoomListProps) {
  const userId = 2;
  const jwt = localStorage.getItem("jwt");
  const [chatRoomData, setChatRoomData] = useState<ChatRoomDataType[]>([]);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ChatRoomDataType[]>([]);

  /* 채팅방 클릭시 */
  const handleRoomClick = (roomId: number) => {
    setCurrentRoomId(roomId);
    handlePageChange("message");
  };

  /* 새 채팅 클릭시 */
  const handleCreateRoom = () => {
    setClickCreateRoom(true);
    handlePageChange("main");
  };

  /* 이름 검색 */
  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    const currentSearchWord = e.target.value.trim();
    if (currentSearchWord === "") {
      setSearchResult(chatRoomData);
    } else {
      setSearchResult(
        chatRoomData.filter((room) =>
          room.chatRoomName
            ?.toLowerCase()
            .includes(currentSearchWord.toLowerCase())
        )
      );
    }
  };

  /* 채팅방 삭제 */
  const handleRemoveChatRoom = (selectedRoomId: number) => {
    fetch(`https://dev.risetconstruction.net/chatRoom/${selectedRoomId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        setChatRoomData((prevList) =>
          prevList.filter((roomData) => roomData.chatRoomId !== selectedRoomId)
        );
      }
    });
  };

  /* 채팅방 리스트 불러오기 */
  useEffect(() => {
    fetch(`https://dev.risetconstruction.net/chatRoom`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChatRoomData(data));
  }, []);

  useEffect(() => {
    setSearchResult(chatRoomData);
  }, [chatRoomData]);

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
        <SearchBar
          placeholder="이름 검색"
          value={searchWord}
          onChange={handleSearchName}
        />
      </SearchBox>

      <ChatRoomCardList>
        {searchResult.map((roomData) => (
          <ChatRoomCardBox key={roomData.chatRoomId}>
            <ChatRoomContent
              onClick={() => handleRoomClick(roomData.chatRoomId)}
            >
              <ChatRoomCard
                chatMemberData={roomData.members.filter(
                  (member) => member.memberNo !== userId
                )}
                chatRoomName={roomData.chatRoomName}
                lastChat={roomData.lastChat}
              />
            </ChatRoomContent>
            <ChatSide onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}>
              <VerticalIcon />
              {isMoreMenuOpen && (
                <DropdownMenu>
                  <li>이름 수정</li>
                  <li onClick={() => handleRemoveChatRoom(roomData.chatRoomId)}>
                    나가기
                  </li>
                </DropdownMenu>
              )}
            </ChatSide>
          </ChatRoomCardBox>
        ))}
      </ChatRoomCardList>
    </Layout>
  );
}
