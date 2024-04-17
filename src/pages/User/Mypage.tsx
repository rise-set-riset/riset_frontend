import React from "react";
import styled from "styled-components";
import Table from "../../hooks/useTable"
import { CiCirclePlus } from "react-icons/ci";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MypageContainer = styled.div`
  width: 960px;
`

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: orange;
  border-radius: 50%;
  position: relative;
  margin: auto;
`

const CustomCiCirclePlus = styled(CiCirclePlus)`
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 0;
  right: -10px;
`

const NameandPositionWrapper =styled.div`
  width: 67px;
  height: 48px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 0.1px;

  p:first-child{
    font-size: 24px;
  }

  p:nth-child(2){
    font-size: 14px;
    color: var(--color-brand-main);
  }
`

const SaveBtn = styled.button`

`

export default function Mypage() {
  
  return (
  <Layout>
  <main className="main">
  <h2 className="title">마이페이지</h2>
    <ProfileImg>
    <CustomCiCirclePlus/>
    </ProfileImg>
    
    <NameandPositionWrapper>
      <p>홍길동</p>
      <p>사원</p>
    </NameandPositionWrapper>
    <Table/>
  </main>
  </Layout>
)
}
