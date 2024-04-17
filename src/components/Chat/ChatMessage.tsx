import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import { IoIosArrowBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

const Layout = styled.div`
  height: 100%;
`;

const TitleBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 500px) {
    padding: 0 1rem;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
`;

const VerticalIcon = styled(FiMoreVertical)`
  font-size: 1.5rem;
  position: relative;
`;

/* 채팅방 삭제 및 이름 수정 드롭다운 메뉴 */
const DropdownMenu = styled.ul`
  z-index: 5000;
  position: absolute;
  top: 3.5rem;
  right: 1px;
  width: 7.5rem;
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

const SearchNavBox = styled.div`
  height: 5.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 0 1.5rem;

  input {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 500px) {
    padding: 0 1rem;
    height: 3.7rem;
    div {
      height: 2.2rem;

      input {
        font-size: 1rem;
      }
    }
  }
`;

const DialogueBox = styled.main`
  margin-top: 1.2rem;
  /* height: calc(100% - 200px); */
  height: calc(100% - 280px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

const ArrowIconStyle = styled.div`
  font-size: 1.2rem;
  border-radius: 50%;
  border: 1px solid var(--color-brand-lightgray);
  width: 2.5rem;
  height: 2.5rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: var(--color-brand-main);
    border: var(--color-brand-main);
    color: var(--color-white);
  }

  @media screen and (max-width: 430px) {
    width: 2.2rem;
    height: 2.2rem;
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

const PartnerMessage = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  > div:nth-child(1) {
    padding: 0.8rem 1rem;
    background-color: var(--color-gray-1);
    border-radius: 0 1rem 1rem 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  > div:nth-child(2) {
    color: var(--color-brand-lightgray);
    font-size: 0.8rem;
  }
`;

const MyMessage = styled(PartnerMessage)`
  flex-direction: row-reverse;

  > div:nth-child(1) {
    background-color: var(--color-brand-yellow);
    border-radius: 1rem 1rem 0 1rem;
  }
`;

const PartnerFileIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border: 1px solid var(--color-brand-lightgray);
  cursor: pointer;
  svg path {
    stroke: var(--color-brand-lightgray);
  }
`;

const MyFileIcon = styled(PartnerFileIcon)`
  border: 1px solid var(--color-white);
  cursor: pointer;
  svg path {
    stroke: var(--color-white);
  }
`;

const SendFileIcon = styled(PartnerFileIcon)`
  border: 1px solid var(--color-brand-main);
  background-color: var(--color-brand-main);
  cursor: pointer;
  svg path {
    stroke: var(--color-white);
  }
`;

const SendMessageBox = styled.form`
  width: 100%;
  height: 100px;
  padding: 1.5rem;
  position: absolute;
  left: 0;
  bottom: 0px;
  flex: 1;
  border-radius: 0 0 16px 16px;
  box-shadow: 1px 1px 1px -1px var(--color-brand-lightgray);
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-white);
  z-index: 1000;
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  @media screen and (max-width: 500px) {
    border-radius: 0px;
  }
  @media screen and (max-width: 430px) {
    padding: 1rem;
  }
`;

const SendInputBox = styled.div`
  flex: 1;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
  border: 2px solid var(--color-brand-main);
  input {
    width: 100%;
    border: none;
    font-size: 1.2rem;
    &:focus {
      outline: none;
    }
  }
`;

const SendButtonIcon = styled.button`
  color: var(--color-white);
  background-color: var(--color-brand-main);
  font-size: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid var(--color-brand-main);
`;

interface Content {
  content: string;
  sender?: string;
}

interface ResponseDataType {
  chatRoomId: number;
  date: string; //"2024-04-17T08:23:25.875"
  fileNames: string;
  members: any; // memberId, memberName, memberNo(고유아이디), profileImg.profilePath
  msg: string;
  sender: any; // employeeId, name, myImage
}

interface ChatMainProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  currentRoomId: number;
}

export default function ChatMain({
  handlePageChange,
  handleChatClose,
  currentRoomId,
}: ChatMainProps) {
  /* 통신 */
  const userId = 2;
  // const userId = 11;
  const jwt = localStorage.getItem("jwt");
  const client = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sendText, setSendText] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [messages, setMessages] = useState<Content[]>([]);
  const [responseMessage, setResponseMessage] = useState<ResponseDataType[]>(
    []
  );
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(true);
  const [showProfileState, setShowProfileState] = useState<boolean[]>([]);

  console.log(responseMessage);
  /* 시간 변환 */
  const timeFormat = (date: string) => {
    const sendDate = date.slice(11, 16);
  };

  /* 내용 검색 */
  const handleSearchMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  /* 채팅 메세지 가져오기 */
  useEffect(() => {
    fetch(`https://dev.risetconstruction.net/chatRoom/${currentRoomId}/chat`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseMessage(data);
      });
  }, []);

  console.log(responseMessage);

  useEffect(() => {
    /* 소켓 함수 */
    client.current = new Client({
      brokerURL: "wss://dev.risetconstruction.net/ws-stomp",
      connectHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    /* 채팅방 구독 */
    client.current.activate();
    client.current.onConnect = function () {
      client.current?.subscribe(
        `/sub/chat/message/${currentRoomId}`,
        (frame) => {
          if (frame.body) {
            let parsedMessage = JSON.parse(frame.body);
            setResponseMessage((prevMessages) => [
              ...prevMessages,
              parsedMessage,
            ]);
            console.log("mes", messages);
          }
        }
      );
    };

    return () => {
      client.current?.deactivate();
    };
  }, [responseMessage]);

  /* 메세지 전송시 */
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(
      JSON.stringify({
        roomId: currentRoomId,
        msg: sendText,
        members: [2, 13, 22],
        sender: 2,
        base64File: [base64String],
      })
    );
    if (sendText.trim() !== "") {
      client.current?.publish({
        destination: `/send/chat/message/${currentRoomId}`,
        body: JSON.stringify({
          roomId: currentRoomId,
          msg: sendText,
          members: [2, 13, 22],
          sender: 2,
          base64File: [base64String],
        }),
      });

      setMessages((prevMSList) => [
        ...prevMSList,
        {
          content: sendText.trim(),
        },
      ]);
      setSendText("");
    }
  };

  /* 채팅방 삭제 */
  const handleRemoveChatRoom = () => {
    fetch(`https://dev.risetconstruction.net/chatRoom/${currentRoomId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        handlePageChange("list");
      }
    });
  };

  /* 스크롤 최하단 */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [responseMessage]);

  /* 1분이 지났는지 확인 */
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 16);
    const dateState: boolean[] = [];

    responseMessage.map((data, index) => {
      if (index === 0) {
        dateState.push(true);
      }
      {
        console.log("check", responseMessage[index - 1]);
        // const sendDate = responseMessage[index - 1].date.slice(0, 16);
        // if (
        //   data.sender.employeeNo ===
        //     responseMessage[index - 1].sender.employeeNo &&
        //   today === sendDate
        // ) {
        //   dateState.push(false);
        // } else {
        //   dateState.push(true);
        // }
      }
    });
    setShowProfileState(dateState);
  }, [responseMessage]);

  const handleSendSearch = () => {
    fetch(
      `https://dev.risetconstruction.net/chatRoom/${currentRoomId}/chatOne?msg=${searchWord}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const [base64String, setBase64String] = useState<any>("");

  // 파일 선택(input) 이벤트 핸들러
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0]; // 첫 번째 파일만 처리
    const reader = new FileReader();

    reader.onloadend = () => {
      // 파일을 Base64 문자열로 변환하여 state에 저장
      setBase64String(reader.result);
    };

    if (file) {
      // 파일을 읽어들임
      reader.readAsDataURL(file);
    }
  };

  console.log("base64", base64String);

  return (
    <Layout>
      <TitleBox>
        <div>
          <ArrowBackIcon onClick={() => handlePageChange("list")} />
          <ChatPartner>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
              alt="대화상대"
            />
            <h2>박씨</h2>
          </ChatPartner>
        </div>
        <div>
          <VerticalIcon onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)} />
          {isMoreMenuOpen && (
            <DropdownMenu>
              <li>이름 수정</li>
              <li onClick={handleRemoveChatRoom}>나가기</li>
            </DropdownMenu>
          )}
          <CloseIcon onClick={handleChatClose} />
        </div>
      </TitleBox>

      {isSearchBarOpen && (
        <SearchNavBox>
          <SearchBar
            placeholder="내용 검색"
            value={searchWord}
            onChange={handleSearchMessage}
          />
          <button onClick={handleSendSearch}>찾기</button>
          <ArrowIconStyle>
            <IoIosArrowDown />
          </ArrowIconStyle>
          <ArrowIconStyle>
            <IoIosArrowUp />
          </ArrowIconStyle>
        </SearchNavBox>
      )}

      <DialogueBox ref={messagesEndRef}>
        {responseMessage.map((data, index) => {
          return (
            <div key={uuidv4()}>
              {data.sender.employeeNo === userId ? (
                <MyMessage>
                  <div>{data.msg}</div>
                  <div>오전 8:40</div>
                </MyMessage>
              ) : (
                <div>
                  {showProfileState[index] && (
                    <ChatPartner>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
                        alt="대화상대"
                      />
                      <h2>{data.sender.name}</h2>
                      <h2></h2>
                    </ChatPartner>
                  )}
                  <PartnerMessage>
                    <div>{data.msg}</div>
                    <div>오전 8:40</div>
                  </PartnerMessage>
                </div>
              )}
            </div>
          );
        })}
      </DialogueBox>

      {/* <ChatPartner>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
            alt="대화상대"
          />
          <h2>박씨</h2>
        </ChatPartner>

        <PartnerMessage>
          <div>안녕하세요?</div>
          <div>오전 8:40</div>
        </PartnerMessage>

        <PartnerMessage>
          <div>
            <PartnerFileIcon>
              <FiPaperclip />
            </PartnerFileIcon>
            <span>파일명.pdf</span>
          </div>
          <div>오전 8:40</div>
        </PartnerMessage>

        <MyMessage>
          <div>안녕하세요?</div>
          <div>오전 8:40</div>
        </MyMessage>

        <MyMessage>
          <div>
            <MyFileIcon>
              <FiPaperclip />
            </MyFileIcon>
            <span>파일명.pdf</span>
          </div>
          <div>오전 8:40</div>
        </MyMessage> */}

      <SendMessageBox onSubmit={handleSendMessage}>
        {/* <SendFileIcon>
          <FiPaperclip />
        </SendFileIcon> */}
        <input type="file" onChange={handleFileInputChange} />

        <SendInputBox>
          <input
            type="text"
            placeholder="내용을 입력해주세요"
            value={sendText}
            onChange={(e) => setSendText(e.target.value)}
          />
          <SendButtonIcon>
            <IoMdArrowRoundUp />
          </SendButtonIcon>
        </SendInputBox>
      </SendMessageBox>
    </Layout>
  );
}
