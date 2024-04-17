import React from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../assets/header/profile.svg";

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
  return (
    <Layout>
      <ImageBox>
        {memberInfo.image ? (
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
