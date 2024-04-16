import React, { useState } from "react";
import styled from "styled-components";
import DayoffCard from "../../components/Dayoff/DayoffCard";
import { CiCirclePlus } from "react-icons/ci";


const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ApplyDayoffContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 27px;
  gap: 27px;

@media screen and (max-width: 1023px) {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
`;

const BtnContainer = styled.div`
  width: 100%;
  max-width: 977px; /* 변경된 부분 */
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center; /* 변경된 부분 */
  margin-top: 20px; /* 변경된 부분 */

  @media screen and (max-width: 1023px) {
  margin-top: 0; /* 변경된 부분 */
  justify-content: space-around; /* 변경된 부분 */
}
`;

const DayoffBtn = styled.button<{isDisabled: boolean}>`
  width: 320.33px;
  height: 50px;
  padding: 13px 20px;
  border-radius: 8px;
  margin-right: 8px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  background-color: ${({ isDisabled }) => (isDisabled ? ' #c4c4c4' : '#ff7f50')};
`

const CustomCiCirclePlus = styled(CiCirclePlus)`
  width: 50px;
  height: 50px;
  margin: auto;
`


export default function ApplyDayoff() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isPending , setIsPending] = useState<boolean>(false);
  const [isApproved , setIsApproved] = useState<boolean>(true);
  const [isRejected , setIsRejected] = useState<boolean>(true);
  const [isDayoffCardVisible, setIsDayoffCardVisible] = useState(false);


  const handleButtonClick = () =>{
    setIsDayoffCardVisible(true)
  }

  const handleHideDayoffCard = () => {
    setIsDayoffCardVisible(false);
  };

  return (
   <Layout>
     <main className="main">
    <h2 className="title">휴가 신청</h2>
  <ApplyDayoffContainer>
      <BtnContainer>
        <DayoffBtn
          isDisabled={isPending}
          onClick={()=>{setIsPending(false); setIsApproved(true); setIsRejected(true)}}>대기중</DayoffBtn>
         <DayoffBtn
          isDisabled={isApproved}
          onClick={()=>{setIsPending(true); setIsApproved(false); setIsRejected(true)}}>승인</DayoffBtn>
         <DayoffBtn
          isDisabled={isRejected}
          onClick={()=>{setIsPending(true); setIsApproved(true); setIsRejected(false)}}>반려</DayoffBtn>
      </BtnContainer>
  </ApplyDayoffContainer>


    {isDayoffCardVisible && <DayoffCard onClick={handleHideDayoffCard}/>}
   

    <CustomCiCirclePlus onClick={handleButtonClick}/>
    
    </main>
  </Layout>
  )
}
