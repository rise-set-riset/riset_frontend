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

interface MembersDataType {
  [key: string]: string | number;
}

interface ChatRoomCardProps {
  chatMemberData: MembersDataType[];
  chatRoomName: string;
  lastChat: any;
}

export default function ChatRoomCard({
  chatMemberData,
  chatRoomName,
  lastChat,
}: ChatRoomCardProps) {
  const settingChatRoomName = chatMemberData
    .map((member) => member.memberName)
    .join(", ");
  console.log(settingChatRoomName);

  return (
    <Layout>
      <ImageBox>
        {chatMemberData.slice(0, 4).map((data: any) => (
          <MemberImg
            key={data.memberNo}
            $memberCount={chatMemberData.slice(0, 4).length}
          >
            {data.profileImg.profileImgPath ? (
              <img src={data.profileImg.profileImgPath} alt="data.name" />
            ) : (
              <Profile />
            )}
          </MemberImg>
        ))}
      </ImageBox>
      <ChatInfoBox>
        <ChatName>
          {/* <div>{chatRoomName ? chatRoomName : settingChatRoomName}</div> */}
          <div>{settingChatRoomName}</div>
          {/* {chatMemberData.length > 1 && <span>{chatMemberData.length}명</span>} */}
          <span>{chatMemberData.length}명</span>
        </ChatName>
        <MoreInfo>{lastChat?.msg || lastChat?.fileNames}</MoreInfo>
      </ChatInfoBox>
    </Layout>
  );
}
