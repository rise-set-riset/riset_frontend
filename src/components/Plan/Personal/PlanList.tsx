import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { GoPlusCircle } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";

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

interface PlanDataType {
  employeeId: number;
  name: string;
  department?: string;
  position?: string;
  image: string;
  editablePlan: PlanDetailType[] | [];
  unEditablePlan: PlanDetailType[] | [];
  rank?: string;
}

interface PlanDetailType {
  [key: string]: string | number;
}

interface PlanListProps {
  allPlanData: PlanDataType[];
  setAllPlanData: React.Dispatch<React.SetStateAction<PlanDataType[]>>;
}

export default function PlanList({
  allPlanData,
  setAllPlanData,
}: PlanListProps) {
  /* 
  memberListRef, planListRef, lineHeight: 중간 구분선 길이 조정 위해 필요
  allPlanData: 근무 일정 페이지의 모든 데이터
  planComponents: Plan 컴포넌트 목록
  */
  const memberListRef = useRef<HTMLDivElement>(null);
  const planListRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [planComponents, setPlanComponents] = useState<JSX.Element[]>([]);
  const [selectedPlanList, setSelectedPlanList] = useState<any>([]);

  useEffect(() => {
    setSelectedPlanList(allPlanData[0]);
  }, []);

  /* 중간 구분선 길이 조정 */
  useEffect(() => {
    const memberHeight = memberListRef.current?.clientHeight || 0;
    const planHeight = planListRef.current?.clientHeight || 0;
    setLineHeight(Math.max(memberHeight, planHeight));
  }, []);

  /* Plus 버튼 클릭시 새로운 Plan 컴포넌트 추가*/
  const handleAddComponent = () => {
    setPlanComponents((prevComponents) => [
      ...prevComponents,
      <PlanCard
        clickToAdd={true}
        isEditable={true}
        planContent={{
          title: "",
          startTime: "",
          endTime: "",
        }}
      />,
    ]);
  };

  const handleCardClick = (employeeId: number) => {
    const selectMemberData = allPlanData.filter(
      (data) => data.employeeId === employeeId
    )[0];
    setSelectedPlanList(selectMemberData);
  };

  return (
    <Layout>
      <MemberCardList ref={memberListRef}>
        {allPlanData &&
          allPlanData.map((memberData) => (
            <MemberCardStyle
              key={memberData.employeeId}
              onClick={() => handleCardClick(memberData.employeeId)}
            >
              <MemberCard
                memberInfo={{
                  // employeeId: memberData.employeeId,
                  name: memberData.name,
                  department: memberData.department || "",
                  position: memberData.position || "",
                  image: memberData.image,
                  rank: memberData.rank || "",
                }}
              />
            </MemberCardStyle>
          ))}
      </MemberCardList>

      <Divider $lineHeight={lineHeight}></Divider>

      {/* 나중에 isEditable에 본인 일정인지 확인 로직 필요 */}
      <PlanCardList ref={planListRef}>
        {Object.keys(selectedPlanList).length !== 0 &&
          selectedPlanList.editablePlan?.map((planData: any) => (
            <PlanCard
              key={uuidv4()}
              clickToAdd={false}
              isEditable={true}
              planContent={{
                id: planData.id,
                title: planData.title || "",
                startTime: planData.startTime || "",
                endTime: planData.endTime || "",
              }}
            />
          ))}

        {Object.keys(selectedPlanList).length !== 0 &&
          selectedPlanList.unEditablePlan?.map((planData: any) => (
            <PlanCard
              key={uuidv4()}
              clickToAdd={false}
              isEditable={false}
              planContent={{
                id: planData.id,
                title: planData.title || "",
                startTime: planData.startTime || "",
                endTime: planData.endTime || "",
              }}
            />
          ))}

        <PlusPlanButton>
          <GoPlusCircle onClick={handleAddComponent} />
        </PlusPlanButton>
      </PlanCardList>

      {planComponents}
    </Layout>
  );
}
