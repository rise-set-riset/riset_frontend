import styled from "styled-components";
import { ReactComponent as Profile } from "../assets/header/profile.svg";
import { useContext } from "react";
import { DarkModeContext } from "../contexts/DarkmodeContext";

const Layout = styled.div<{ $isDarkmode: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isDarkmode ? "var(--color-brand-darkgray)" : "var(--color-white)"};
`;

const ImageBox = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MemberInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MemberName = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5px;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-black);
  span {
    font-size: 0.8rem;
    color: var(--color-brand-main);
  }
`;

const MoreInfo = styled.div`
  color: var(--color-brand-lightgray);
  font-size: 14px;
`;

interface MemberCardProps {
  memberInfo: {
    image: string;
    alt?: string;
    name: string;
    rank: string;
    department?: string;
    position?: string;
  };
}

export default function MemberCard({ memberInfo }: MemberCardProps) {
  const { isDarkmode } = useContext(DarkModeContext);
  return (
    <Layout $isDarkmode={isDarkmode}>
      <ImageBox>
        {JSON.parse(memberInfo.image) ? (
          <img src={memberInfo.image} alt={memberInfo.alt} />
        ) : (
          <Profile />
        )}
      </ImageBox>
      <MemberInfoBox>
        <MemberName>
          <div>{memberInfo.name}</div>
          <span>{memberInfo.rank}</span>
        </MemberName>
        <MoreInfo>
          {memberInfo.department} / {memberInfo.position}
        </MoreInfo>
      </MemberInfoBox>
    </Layout>
  );
}
