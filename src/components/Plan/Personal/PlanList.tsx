import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { GoPlusCircle } from "react-icons/go";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const MemberCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  > div:active {
    outline: 4px solid var(--color-brand-main);
    border-radius: 16px;
  }

  > div:nth-child(1) {
    outline: 4px solid var(--color-brand-main);
    border-radius: 16px;
  }
`;

const MemberCardStyle = styled.div`
  > div {
    border-radius: 16px;
    padding: 1.7rem 1.5rem;
  }
`;

const PlanCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Divider = styled.div<{ $lineHeight: number }>`
  width: 2px;
  background-color: var(--color-brand-lightgray);
  height: ${(props) => props.$lineHeight}px;
`;

const PlusPlanButton = styled.div`
  color: var(--color-black);
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface MembersDataType {
  [key: string]: string;
}

interface PlanListProps {
  currentDate: Date;
}

export default function PlanList({ currentDate }: PlanListProps) {
  const memberListRef = useRef<HTMLDivElement>(null);
  const planListRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    const memberHeight = memberListRef.current?.clientHeight || 0;
    const planHeight = planListRef.current?.clientHeight || 0;
    setLineHeight(Math.max(memberHeight, planHeight));
  }, []);

  /* 현재 날짜의 모든 데이터 받아오기 */
  const [allPlanData, setAllPlanData] = useState<MembersDataType[]>([]);
  useEffect(() => {
    // currentData 같이 보내기
    // fetch("url", )
    //   .then((res) => res.json())
    //   .then((data) => setAllPlanData(data));
  }, []);

  // 추가된 컴포넌트 목록을 저장하는 상태
  const [components, setComponents] = useState<JSX.Element[]>([]);

  // Plus 버튼을 클릭할 때마다 새로운 컴포넌트 추가
  const handleAddComponent = () => {
    setComponents((prevComponents) => [
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

        {components}
        <PlusPlanButton>
          <GoPlusCircle onClick={handleAddComponent} />
        </PlusPlanButton>
      </PlanCardList>
    </Layout>
  );
}
