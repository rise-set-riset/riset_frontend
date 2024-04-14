import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import SearchBar from "../../common/SearchBar";
import { FiPlusCircle } from "react-icons/fi";
import { PiChatCircleDots } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi";

const Layout = styled.div`
  position: relative;
  padding: 1.5rem;
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
  /* height: 700px; */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid black;
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
  svg path {
    stroke: var(--color-brand-lightgray);
  }
`;

const MyFileIcon = styled(PartnerFileIcon)`
  border: 1px solid var(--color-white);
  svg path {
    stroke: var(--color-white);
  }
`;

const SendFileIcon = styled(PartnerFileIcon)`
  border: 1px solid var(--color-brand-main);
  background-color: var(--color-brand-main);
  svg path {
    stroke: var(--color-white);
  }
`;

const SendMessageBox = styled.footer`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  position: absolute;
  /* position: fixed; */
  bottom: 0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
  background-color: var(--color-white);
  z-index: 1000;
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
`;

const SendInputBox = styled.div`
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid var(--color-brand-main);
  input {
    width: 100%;
    border: none;
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
        </MyMessage>
      </DialogueBox>

      <SendMessageBox>
        <SendFileIcon>
          <FiPaperclip />
        </SendFileIcon>

        <SendInputBox>
          <input type="text" placeholder="내용을 입력해주세요" />
        </SendInputBox>
      </SendMessageBox>
    </Layout>
  );
}
