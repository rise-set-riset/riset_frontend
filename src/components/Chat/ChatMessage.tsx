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
import { IoSearch } from "react-icons/io5";
import FileCard from "../Board/FileCard";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";

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

  h2 {
    font-size: 1.4rem;
  }
`;

const SearchIcon = styled(IoSearch)`
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: var(--color-brand-main);
  }
`;

const VerticalIcon = styled(FiMoreVertical)`
  font-size: 1.5rem;
  position: relative;
  cursor: pointer;
  &:hover {
    color: var(--color-brand-main);
  }
`;

/* 채팅방 삭제 및 이름 수정 드롭다운 메뉴 */
const DropdownMenu = styled.ul`
  z-index: 5000;
  position: absolute;
  top: 4rem;
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

const SearchNavBox = styled.form`
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

const ArrowBackIcon = styled(IoIosArrowBack)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const CloseIcon = styled(CgClose)`
  font-size: 1.3rem;
  cursor: pointer;
  cursor: pointer;
  &:hover {
    color: var(--color-brand-main);
  }
`;

const DialogueBox = styled.main<{ $isSearchBarOpen: boolean }>`
  position: relative;
  margin-top: 1.2rem;
  height: ${(props) => (props.$isSearchBarOpen ? "calc(100% - 295px)" : "calc(100% - 205px)")};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 500px) {
    padding: 0 1rem;
  }
`;

const ChatPartner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  h2 {
    font-size: 1.2rem;
  }
  img,
  svg {
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

const ContainFileMessageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const SelectFile = styled.div`
  position: absolute;
  bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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

const FileAdd = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: var(--color-brand-main);
`;

const FileIcon = styled(FiPaperclip)`
  font-size: 1.5rem;
  path {
    stroke: var(--color-white);
  }
`;

const FileInput = styled.input`
  display: none;
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

interface ResponseDataType {
  chatId: number;
  chatRoomId: number;
  date: string;
  fileNames: string;
  members: any;
  msg: string;
  sender: any;
}

interface ChatMainProps {
  handlePageChange: (name: string) => void;
  handleChatClose: () => void;
  currentRoomId: number;
  currentMembersId: string[] | number[];
}

export default function ChatMain({
  handlePageChange,
  handleChatClose,
  currentRoomId,
  currentMembersId,
}: ChatMainProps) {
  /* 통신 */
  const userId = Number(localStorage.getItem("userId"));
  const jwt = localStorage.getItem("jwt");
  const client = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sendText, setSendText] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [responseMessage, setResponseMessage] = useState<ResponseDataType[]>([]);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(true);
  const [base64String, setBase64String] = useState<any>("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ResponseDataType[]>();
  const [searchShowIndex, setSearchShowIndex] = useState<number>(0);

  /* 시간 변환 */
  const timeFormat = (date: string) => {
    let hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const divide = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours || 12; // 0시는 12시로 표시
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${divide} ${hours}:${formattedMinutes}`;
  };

  /* 내용 검색 */
  const handleSearchMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    /* 소켓 함수 */
    client.current = new Client({
      brokerURL: "wss://dev.risetconstruction.net/ws-stomp",
      connectHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
      debug: (str: string) => {},
      reconnectDelay: 5000, //자동 재 연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    /* 채팅방 구독 */
    client.current.activate();
    client.current.onConnect = function () {
      client.current?.subscribe(`/sub/chat/message/${currentRoomId}`, (frame) => {
        if (frame.body) {
          let parsedMessage = JSON.parse(frame.body);
          setResponseMessage((prevMessages) => [...prevMessages, parsedMessage]);
        }
      });
    };

    return () => {
      client.current?.deactivate();
    };
  }, [responseMessage]);

  /* 메세지 전송시 */
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sendText.trim() !== "" || base64String !== "") {
      client.current?.publish({
        destination: `/send/chat/message/${currentRoomId}`,
        body: JSON.stringify({
          roomId: currentRoomId,
          msg: sendText,
          members: currentMembersId,
          sender: userId,
          base64File: base64String === "" ? [] : [base64String],
        }),
      });
      setSendText("");
      setBase64String("");
      setSelectedFileName("");
    }
  };

  /* 검색 결과 받아오기 */
  const handleSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isSearchBarOpen) {
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
          setSearchResult(data);
          setSearchShowIndex(data.length - 1);

          if (data.length !== 0) {
            /* 검색 결과로 이동 */
            const targetElement = document.getElementById(
              `msg-${searchResult?.[searchResult.length - 1]?.chatId}`
            );
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
              targetElement.style.backgroundColor = "var(--color-brand-main)";
              targetElement.style.color = "var(--color-white)";
            }
          }
        });
    }
  };

  useEffect(() => {
    /* 검색 결과로 이동 */
    const targetElement = document.getElementById(`msg-${searchResult?.[searchShowIndex]?.chatId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      targetElement.style.backgroundColor = "var(--color-brand-main)";
      targetElement.style.color = "var(--color-white)";
    }
  }, [searchShowIndex]);

  const handleSearchIndex = (name: string) => {
    if (name === "up") {
      setSearchShowIndex(searchShowIndex - 1 < 0 ? searchShowIndex : searchShowIndex - 1);
    } else {
      if (searchResult) {
        setSearchShowIndex(
          searchResult.length - 1 === searchShowIndex ? searchShowIndex : searchShowIndex + 1
        );
      }
    }
  };

  /* Custom File Icon 클릭 */
  const handleFileClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  /* 파일 선택 취소 */
  const handleFileCancel = () => {
    setSelectedFileName("");
    setBase64String("");
  };

  // 파일 선택(input) 이벤트 핸들러
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 첫 번째 파일만 처리
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setSelectedFileName(file.name);
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

  const handleDownload = async (fileUrl: string, fileName: string) => {
    const jwt = localStorage.getItem("jwt");

    await fetch(fileUrl, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const aEle = document.createElement("a");

        aEle.href = blobUrl;
        aEle.download = fileName;
        aEle.click();
        aEle.remove();
      });
  };

  return (
    <Layout>
      <TitleBox>
        <div>
          <ArrowBackIcon onClick={() => handlePageChange("list")} />
          <h2>{currentMembersId.length > 2 ? "그룹채팅" : "채팅"}</h2>
        </div>
        <div>
          <SearchIcon onClick={() => setIsSearchBarOpen(!isSearchBarOpen)} />
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
        <SearchNavBox onSubmit={handleSubmitSearch}>
          <SearchBar placeholder="내용 검색" value={searchWord} onChange={handleSearchMessage} />
          <ArrowIconStyle onClick={() => handleSearchIndex("down")}>
            <IoIosArrowDown />
          </ArrowIconStyle>
          <ArrowIconStyle onClick={() => handleSearchIndex("up")}>
            <IoIosArrowUp />
          </ArrowIconStyle>
        </SearchNavBox>
      )}

      <DialogueBox ref={messagesEndRef} $isSearchBarOpen={isSearchBarOpen}>
        {Array.isArray(responseMessage) &&
          responseMessage.map((data, index) => {
            const prevMsg =
              index === 0
                ? responseMessage[0].date.slice(0, 16)
                : responseMessage[index - 1].date.slice(0, 16);
            return (
              <div key={uuidv4()}>
                {data.sender.employeeNo === userId ? (
                  <ContainFileMessageBox>
                    {data.msg !== "" && (
                      <MyMessage>
                        <div id={`msg-${data.chatId}`}>{data.msg}</div>
                        {(index === 0 || data.date.slice(0, 16) !== prevMsg) && (
                          <div>{timeFormat(data.date)}</div>
                        )}
                      </MyMessage>
                    )}
                    {data.fileNames !== "null" && (
                      <MyMessage onClick={() => handleDownload(data.fileNames, data.fileNames)}>
                        <div>
                          <MyFileIcon>
                            <FiPaperclip />
                          </MyFileIcon>
                          <span id={`msg-${data.chatId}`}>
                            {data.fileNames.slice(0, 20)}
                            {data.fileNames.length > 20 ? "..." : ""}
                          </span>
                        </div>
                        {(index === 0 || data.date.slice(0, 16) !== prevMsg) && (
                          <div>{timeFormat(data.date)}</div>
                        )}
                      </MyMessage>
                    )}
                  </ContainFileMessageBox>
                ) : (
                  <div>
                    {(index === 0 || data.date.slice(0, 16) !== prevMsg) && (
                      <ChatPartner>
                        {data.sender.myImage ? (
                          <img src={data.sender.myImage} alt="대화상대" />
                        ) : (
                          <Profile />
                        )}
                        <h2>{data.sender.name}</h2>
                      </ChatPartner>
                    )}
                    <ContainFileMessageBox>
                      {data.msg !== "" && (
                        <PartnerMessage>
                          <div id={`msg-${data.chatId}`}>{data.msg}</div>
                          {(index === 0 || data.date.slice(0, 16) !== prevMsg) && (
                            <div>{timeFormat(data.date)}</div>
                          )}
                        </PartnerMessage>
                      )}
                      {data.fileNames !== "null" && (
                        <PartnerMessage
                          onClick={() => handleDownload(data.fileNames, data.fileNames)}
                        >
                          <div>
                            <PartnerFileIcon>
                              <FiPaperclip />
                            </PartnerFileIcon>
                            <span id={`msg-${data.chatId}`}>
                              {data.fileNames.slice(0, 20)}
                              {data.fileNames.length > 20 ? "..." : ""}
                            </span>
                          </div>
                          {(index === 0 || data.date.slice(0, 16) !== prevMsg) && (
                            <div>{timeFormat(data.date)}</div>
                          )}
                        </PartnerMessage>
                      )}
                    </ContainFileMessageBox>
                  </div>
                )}
              </div>
            );
          })}
      </DialogueBox>

      <SendMessageBox onSubmit={handleSendMessage}>
        {selectedFileName !== "" && (
          <SelectFile>
            <FileCard fileName={selectedFileName} />
            <div>
              <CloseIcon onClick={handleFileCancel} />
            </div>
          </SelectFile>
        )}
        <FileAdd>
          <FileIcon onClick={handleFileClick} />
          <FileInput type="file" ref={fileRef} onChange={handleFileInputChange} multiple />
        </FileAdd>

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
