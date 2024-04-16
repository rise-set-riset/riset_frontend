import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import CustomCheckbox from "../../common/CustomCheckbox";
import { ReactComponent as Chat } from "../../assets/bottomMenu/bottom-chat.svg";

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

const ChatBubbleIcon = styled(Chat)`
  font-size: 1.5rem;
  cursor: pointer;
  path {
    stroke: var(--color-brand-main);
  }
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

  @media screen and (max-width: 500px) {
    border-radius: 0px;
  }

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

const CheckboxLayout = styled.button`
  border: none;
  background-color: var(--color-white);
  margin-right: 1rem;
`;

interface SelectedMemberType {
  // [key: number]: boolean;
  [key: number | string]: boolean;
}
interface ChatMainProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  setCurrentRoomId: React.Dispatch<React.SetStateAction<number>>;
  selectToCreate: boolean;
  setSelectToCreate: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ChatMain({
  handlePageChange,
  handleChatClose,
  setCurrentRoomId,
  selectToCreate,
  setSelectToCreate,
}: ChatMainProps) {
  const TestInfo = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
    name: "홍길동",
    rank: "사원",
    department: "개발팀",
    position: "프론트",
  };

  const jwt = localStorage.getItem("jwt");
  const [selectedMember, setSelectedMember] = useState<string[]>([]);
  const [memberState, setMemberState] = useState<SelectedMemberType>({});

  /* 체크박스 상태 */
  const handleSelectToCreate = (memberId: string) => {
    setSelectToCreate(true);
    setMemberState((prev) => {
      return { ...prev, [memberId]: true };
    });
  };

  /* 채팅방 생성 */
  const handleCreateChatRoom = () => {
    /* 선택한 사람들의 ID */
    // const finalSelectedMember = Object.keys(memberState).filter(
    //   (id) => memberState[id]
    // );
    // console.log(finalSelectedMember);
    // setSelectedMember(finalSelectedMember);

    const finalSelectedMember = [2, 11];
    console.log(
      JSON.stringify({
        members: finalSelectedMember,
      })
    );
    fetch("https://dev.risetconstruction.net/chatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        members: finalSelectedMember,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentRoomId(data.RoomId);
        handlePageChange("message");
      });
  };

  useEffect(() => {
    const initialState: SelectedMemberType = Object.fromEntries(
      Array.from({ length: 20 }, (_, index) => [`member-${index}`, false])
    );
    setMemberState(initialState);
  }, []);

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
          <MemberCardBox
            key={index}
            onClick={() => handleSelectToCreate(`member-${index}`)}
          >
            {/* 체크박스 */}
            {selectToCreate && (
              <CheckboxLayout>
                <CustomCheckbox
                  isChecked={memberState[`member-${index}`]}
                  onChange={() => handleSelectToCreate(`member-${index}`)}
                />
              </CheckboxLayout>
            )}
            {/* 멤버 */}
            <MemberCard memberInfo={TestInfo} />
            <ChatBubbleIcon />
          </MemberCardBox>
        ))}
      </MemberCardList>

      {!selectToCreate ? (
        <ButtonBox>
          <button onClick={() => setSelectToCreate(true)}>
            <PlusChatIcon />
            <div>새 채팅</div>
          </button>
          <button onClick={() => handlePageChange("list")}>
            <ChatBubbleIcon />

            <div>채팅목록</div>
          </button>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <button onClick={handleCreateChatRoom}>
            <div>초대</div>
          </button>
          <button onClick={() => setSelectToCreate(false)}>
            <div>취소</div>
          </button>
        </ButtonBox>
      )}
    </Layout>
  );
}
