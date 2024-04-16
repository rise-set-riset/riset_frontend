import React from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--color-white);
  cursor: pointer;
`;

const ImageBox = styled.div`
  max-width: 50px;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const MemberImg = styled.div<{ $memberCount: number }>`
  width: ${(props) => (props.$memberCount === 1 ? "50px" : "24px")};
  height: ${(props) => (props.$memberCount === 1 ? "50px" : "24px")};
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;

  svg,
  img {
    width: 100%;
    height: 100%;
  }
`;

const ChatInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChatName = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5px;
  font-size: 1.3rem;
  font-weight: bold;

  span {
    font-size: 0.8rem;
    color: var(--color-brand-main);
  }
`;

const MoreInfo = styled.div`
  color: var(--color-brand-lightgray);
  font-size: 14px;
`;

interface ChatRoomCardProps {
  chatMemberData: any;
}
export default function ChatRoomCard({ chatMemberData }: ChatRoomCardProps) {
  return (
    <Layout>
      <ImageBox>
        {chatMemberData.slice(0, 4).map((data: any) => (
          <MemberImg
            key={data.employeeId}
            $memberCount={chatMemberData.slice(0, 4).length}
          >
            {data.profileImg ? (
              <img src={data.profileImg} alt="data.name" />
            ) : (
              <Profile />
            )}
          </MemberImg>
        ))}
      </ImageBox>
      <ChatInfoBox>
        <ChatName>
          <div>{chatMemberData[1].employeeId}</div>
          {/* {chatMemberData.length > 2 && <span>{chatMemberData.length}명</span>} */}
          <span>{chatMemberData.length}명</span>
        </ChatName>
        <MoreInfo>마지막 메세지입니다.</MoreInfo>
      </ChatInfoBox>
    </Layout>
  );
}
