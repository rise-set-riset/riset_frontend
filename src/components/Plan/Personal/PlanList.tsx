import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { GoPlusCircle } from "react-icons/go";

/* 전체 레이아웃 */
const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

/* 직원 리스트 */
const MemberCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > div:active {
    border-radius: 16px;
    outline: 4px solid var(--color-brand-main);
  }

  > div:nth-child(1) {
    border-radius: 16px;
    outline: 4px solid var(--color-brand-main);
  }
`;

const MemberCardStyle = styled.div`
  > div {
    border-radius: 16px;
    padding: 1.7rem 1.5rem;
  }
`;

/* 일정 리스트 */
const PlanCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* 일정 추가 버튼 */
const PlusPlanButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: var(--color-black);
`;

/* 중간 구분선 */
const Divider = styled.div<{ $lineHeight: number }>`
  width: 2px;
  height: ${(props) => props.$lineHeight}px;
  background-color: var(--color-brand-lightgray);
`;

interface MembersDataType {
  [key: string]: string;
}

interface PlanListProps {
  currentDate: Date;
}

export default function PlanList({ currentDate }: PlanListProps) {
  /* 
  memberListRef, planListRef, lineHeight: 중간 구분선 길이 조정 위해 필요
  allPlanData: 근무 일정 페이지의 모든 데이터
  planComponents: Plan 컴포넌트 목록
  */
  const memberListRef = useRef<HTMLDivElement>(null);
  const planListRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [allPlanData, setAllPlanData] = useState<MembersDataType[]>([]);
  const [planComponents, setPlanComponents] = useState<JSX.Element[]>([]);

  /* 중간 구분선 길이 조정 */
  useEffect(() => {
    const memberHeight = memberListRef.current?.clientHeight || 0;
    const planHeight = planListRef.current?.clientHeight || 0;
    setLineHeight(Math.max(memberHeight, planHeight));
  }, []);

  /* 현재 날짜의 모든 데이터 받아오기 */
  useEffect(() => {
    // currentData 같이 보내기
    // fetch("url", )
    //   .then((res) => res.json())
    //   .then((data) => setAllPlanData(data));
  }, []);

  /* Plus 버튼 클릭시 새로운 Plan 컴포넌트 추가*/
  const handleAddComponent = () => {
    setPlanComponents((prevComponents) => [
      ...prevComponents,
      <PlanCard
        clickToAdd={true}
        planContent={{
          title: "",
          startTime: "",
          endTime: "",
        }}
      />,
    ]);
  };

  const memberInfo = {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
    alt: "프로필이미지",
    name: "홍길동",
    rank: "사원",
    department: "개발팀",
    position: "프론트",
  };

  const planContent = {
    title: "회사근무",
    startTime: "09:00",
    endTime: "18:00",
  };

  return (
    <Layout>
      <MemberCardList ref={memberListRef}>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard memberInfo={memberInfo} />
        </MemberCardStyle>
      </MemberCardList>

      <Divider $lineHeight={lineHeight}></Divider>

      <PlanCardList ref={planListRef}>
        <PlanCard clickToAdd={false} planContent={planContent} />
        <PlanCard clickToAdd={false} planContent={planContent} />
        <PlanCard clickToAdd={false} planContent={planContent} />
        <PlanCard clickToAdd={false} planContent={planContent} />
        <PlanCard clickToAdd={false} planContent={planContent} />
        <PlanCard clickToAdd={false} planContent={planContent} />

        {planComponents}
        <PlusPlanButton>
          <GoPlusCircle onClick={handleAddComponent} />
        </PlusPlanButton>
      </PlanCardList>
    </Layout>
  );
}
