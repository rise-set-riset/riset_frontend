import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-white);
  cursor: pointer;

  &:active {
    border: 2px solid var(--color-brand-main);
  }
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
  font-size: 22px;
  font-weight: bold;

  span {
    font-size: 14px;
    color: var(--color-brand-main);
  }
`;

const MoreInfo = styled.div`
  color: var(--color-brand-lightgray);
  font-size: 14px;
`;

export default function MemberCard() {
  return (
    <Layout>
      <ImageBox>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
          alt="member"
        />
      </ImageBox>
      <MemberInfoBox>
        <MemberName>
          <div>홍길동</div>
          <span>사원</span>
        </MemberName>
        <MoreInfo>개발팀 / 프론트</MoreInfo>
      </MemberInfoBox>
    </Layout>
  );
}
