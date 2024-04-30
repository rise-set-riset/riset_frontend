import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import MemberCard from "../../common/MemberCard";
import { FiPlusCircle } from "react-icons/fi";
import CustomCheckbox from "../../common/CustomCheckbox";
import { ReactComponent as Chat } from "../../assets/bottomMenu/bottom-chat.svg";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.div`
  padding: 1.5rem;
  height: 100%;

  @media screen and (max-width: 500px) {
    padding: 1rem;
  }

  h2 {
    color: var(--color-black);
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
  color: var(--color-black);
`;

const MemberCardList = styled.main<{ $isDarkmode: boolean }>`
  margin-top: 1rem;
  height: calc(100% - 180px);
  overflow-y: auto;
  border-radius: 16px;
  background-color: ${(props) =>
    props.$isDarkmode ? "var(--color-brand-darkgray)" : "var(--color-white)"};
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
  color: var(--color-black);
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
  [key: number | string]: boolean;
}

interface AllMemberDataType {
  [key: string]: any;
}

interface ChatMainProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  setCurrentRoomId: React.Dispatch<React.SetStateAction<number>>;
  selectToCreate: boolean;
  setSelectToCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentMembersId: React.Dispatch<React.SetStateAction<any>>;
}
export default function ChatMain({
  handlePageChange,
  handleChatClose,
  setCurrentRoomId,
  selectToCreate,
  setSelectToCreate,
  setCurrentMembersId,
}: ChatMainProps) {
  const userId = localStorage.getItem("userId")?.toString();
  const jwt = localStorage.getItem("jwt");
  const [searchWord, setSearchWord] = useState<string>("");
  const [responseData, setResponseData] = useState<AllMemberDataType[]>([]);
  const [searchResult, setSearchResult] = useState<AllMemberDataType[]>([]);
  const [memberState, setMemberState] = useState<SelectedMemberType>({});
  const { isDarkmode } = useContext(DarkModeContext);

  /* 이름 검색 */
  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    const currentSearchWord = e.target.value.trim();
    if (currentSearchWord === "") {
      setSearchResult(responseData);
    } else {
      setSearchResult(
        responseData.filter((member) =>
          member.name?.toLowerCase().includes(currentSearchWord.toLowerCase())
        )
      );
    }
  };

  /* 체크박스 상태 */
  const handleSelectToCreate = (memberId: string | number) => {
    setSelectToCreate(true);
    setMemberState((prev) => {
      return { ...prev, [memberId]: !memberState[memberId] };
    });
  };

  /* 채팅방 생성 */
  const handleCreateChatRoom = () => {
    /* 선택한 사람들의 ID 모은 배열 */
    const finalSelectedMember = Object.keys(memberState).filter(
      (id) => memberState[id]
    );
    setCurrentMembersId([...finalSelectedMember, userId]);

    /* 서버 통신 - 채팅방 생성 */
    // fetch("https://dev.risetconstruction.net/chatRoom", {
    fetch("http://13.124.235.23:8080/chatRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        members: [...finalSelectedMember, userId],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentRoomId(data.chatRoomId);
        handlePageChange("message");
      });
  };

  /* 모든 직원 목록 데이터 받아오기 */
  useEffect(() => {
    // fetch("https://dev.risetconstruction.net/auth/userInfo")
    fetch("http://13.124.235.23:8080/auth/userInfo")
      .then((res) => res.json())
      .then((data) =>
        setResponseData(
          data.filter((member: any) => member.employeeId !== userId)
        )
      );
  }, []);

  /* 직원 선택 상태값 담을 객체 생성 및 초기화 */
  useEffect(() => {
    setSearchResult(responseData);
    if (!selectToCreate) {
      setMemberState(
        Object.fromEntries(
          responseData.map((member) => [member.employeeId, false])
        )
      );
    }
  }, [responseData, selectToCreate]);

  return (
    <Layout>
      <TitleBox>
        <h2>채팅</h2>
        <CloseIcon onClick={handleChatClose} />
      </TitleBox>

      <SearchBox>
        <SearchBar
          placeholder="이름 검색"
          value={searchWord}
          onChange={handleSearchName}
        />
      </SearchBox>

      <MemberCardList $isDarkmode={isDarkmode}>
        {searchResult.length !== 0 &&
          searchResult?.map((member) => (
            <MemberCardBox
              key={member.employeeId}
              onClick={() => handleSelectToCreate(member.employeeId)}
            >
              {selectToCreate && (
                <CheckboxLayout>
                  <CustomCheckbox
                    isChecked={memberState[member.employeeId]}
                    onChange={() => handleSelectToCreate(member.employeeId)}
                  />
                </CheckboxLayout>
              )}
              <MemberCard
                memberInfo={{
                  image: member.profilePath ? member.profilePath : "false",
                  alt: `${member.name}-이미지`,
                  name: member.name ? member.name : "홍해인",
                  rank: ["대리", "사원", "주임", "부장", "사원", "과장"][
                    Math.floor(Math.random() * 6)
                  ],
                  department: ["인사부", "개발부", "개발부"][
                    Math.floor(Math.random() * 3)
                  ],
                  position: ["프론트엔드", "백엔드", "총무"][
                    Math.floor(Math.random() * 3)
                  ],
                }}
                // memberInfo={{
                //   image: member.profilePath ? member.profilePath : "false",
                //   alt: `${member.name}-이미지`,
                //   name: member.name ? member.name : "",
                //   rank: member.jobGrade,
                //   department: member.depart,
                //   position: member.jobTitle,
                // }}
              />
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
