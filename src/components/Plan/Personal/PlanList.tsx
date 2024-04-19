import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { GoPlusCircle } from "react-icons/go";
import { ResponsiveContext } from "../../../contexts/ResponsiveContext";
import MobilePlanCard from "./MobilePlanCard";
import { v4 as uuidv4 } from "uuid";

/* 전체 레이아웃 */
const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const AreaBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
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
  }
`;

const MemberCardStyle = styled.div<{ $isSelected: boolean }>`
  > div {
    border-radius: 16px;
    padding: 1.7rem 1.5rem;
  }

  border-radius: 16px;
  outline: ${(props) => (props.$isSelected ? "4px solid var(--color-brand-main);" : "none")};
`;

/* 일정 리스트 */
const PlanCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;

const PlanCardStyle = styled.div`
  position: relative;
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
  /* height: ${(props) => props.$lineHeight}px; */
  height: 100%;
  background-color: var(--color-brand-lightgray);
`;

interface PlanDataType {
  employeeId: number;
  name: string;
  department?: string;
  position?: string;
  image: string;
  unEditablePlan?: PlanDetailType[];
  planList?: PlanDataType[];
  rank?: string;
}

interface PlanDetailType {
  [key: string]: string | number;
}

interface PlanListProps {
  userPlanData: PlanDataType;
  setUserPlanData: React.Dispatch<React.SetStateAction<any>>;
  otherPlanData: PlanDataType[];
  setOtherPlanData: React.Dispatch<React.SetStateAction<any>>;
  currentDate: Date;
  selectedMemberId: number;
  setSelectedMemberId: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlanList({
  userPlanData,
  setUserPlanData,
  otherPlanData,
  setOtherPlanData,
  currentDate,
}: PlanListProps) {
  /* 
  memberListRef, planListRef, lineHeight: 중간 구분선 길이 조정 위해 필요
  allPlanData: 근무 일정 페이지의 모든 데이터
  planComponents: Plan 컴포넌트 목록
  */
  const userId = Number(localStorage.getItem("userId"));
  const isMobile = useContext(ResponsiveContext);
  const planListRef = useRef<HTMLDivElement>(null);
  const memberListRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);
  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);
  const [planComponents, setPlanComponents] = useState<JSX.Element[]>([]);
  const [selectedMemberPlan, setSelectedMemberPlan] = useState<any>({});

  const [myPlanList, setMyPlanList] = useState<any>([]);

  /* 중간 구분선 길이 조정 */
  useEffect(() => {
    if (!isMobile) {
      const memberHeight = memberListRef.current?.clientHeight || 0;
      const planHeight = planListRef.current?.clientHeight || 0;
      setLineHeight(Math.max(memberHeight, planHeight));
    }
  }, []);

  /* Plus 버튼 클릭시 새로운 Plan 컴포넌트 추가*/
  const handleAddComponent = () => {
    setPlanComponents((prevComponents) => [
      ...prevComponents,
      <PlanCardStyle key={uuidv4()}>
        <PlanCard
          clickToAdd={true}
          isEditable={true}
          currentDate={currentDate}
          planContent={{
            title: "",
            startTime: "",
            endTime: "",
          }}
        />
      </PlanCardStyle>,
    ]);
  };

  useEffect(() => {
    setSelectedMemberId(userId);
    setSelectedMemberPlan(userPlanData);
  }, []);

  useEffect(() => {
    if (selectedMemberId === userId) {
      setSelectedMemberPlan(userPlanData);
    } else {
      setSelectedMemberPlan(
        otherPlanData.filter((data: any) => data.employeeId === selectedMemberId)[0]
      );
    }
  }, [selectedMemberId]);

  // console.log("planList", currentDate);
  // console.log(userId, "userId");
  // console.log("user", userPlanData);
  // console.log("other", otherPlanData);
  // console.log("sel", selectedMemberPlan);
  // console.log(selectedMemberId ? selectedMemberId === userId : "없음");
  return (
    <>
      {!isMobile.isMobile ? (
        <Layout>
          <AreaBox ref={planListRef}>
            <MemberCardList ref={memberListRef}>
              <MemberCardStyle
                onClick={() => setSelectedMemberId(userId)}
                $isSelected={selectedMemberId === userId}
              >
                <MemberCard
                  memberInfo={{
                    name: userPlanData.name,
                    department: userPlanData.department || "false",
                    position: userPlanData.position || "false",
                    image: userPlanData.image || "false",
                    rank: userPlanData.rank || "false",
                  }}
                />
              </MemberCardStyle>
            </MemberCardList>

            <MemberCardList>
              {otherPlanData.length !== 0 &&
                otherPlanData.map((othersPlan) => (
                  <MemberCardStyle
                    key={othersPlan.employeeId}
                    onClick={() => setSelectedMemberId(othersPlan.employeeId)}
                    $isSelected={selectedMemberId === othersPlan.employeeId}
                  >
                    <MemberCard
                      memberInfo={{
                        name: othersPlan.name,
                        department: othersPlan.department || "false",
                        position: othersPlan.position || "false",
                        image: othersPlan.image || "false",
                        rank: othersPlan.rank || "false",
                      }}
                    />
                  </MemberCardStyle>
                ))}
            </MemberCardList>
          </AreaBox>

          <Divider key={uuidv4()} $lineHeight={lineHeight}></Divider>

          {/* 일정 리스트 */}
          <AreaBox ref={memberListRef}>
            <PlanCardList>
              {selectedMemberPlan?.unEditablePlan &&
                selectedMemberPlan?.unEditablePlan?.map((planData: any) => (
                  <PlanCardStyle key={uuidv4()}>
                    <PlanCard
                      clickToAdd={false}
                      isEditable={false}
                      planContent={{
                        startTime: planData.startTime,
                        endTime: planData.endTime,
                        title: planData.title,
                      }}
                    />
                  </PlanCardStyle>
                ))}
              {selectedMemberPlan?.planList?.length !== 0 &&
                selectedMemberPlan?.planList?.map((planData: any) => (
                  <PlanCardStyle key={uuidv4()}>
                    <PlanCard
                      key={uuidv4()}
                      clickToAdd={false}
                      isEditable={selectedMemberId === userId}
                      setMyPlanList={setMyPlanList}
                      planContent={{
                        id: planData.id,
                        startTime: planData.startTime,
                        endTime: planData.endTime,
                        title: planData.title,
                      }}
                      currentDate={currentDate}
                    />
                  </PlanCardStyle>
                ))}
            </PlanCardList>
            {selectedMemberId === userId && planComponents}
            {selectedMemberId === userId && (
              <PlusPlanButton>
                <GoPlusCircle onClick={handleAddComponent} />
              </PlusPlanButton>
            )}
          </AreaBox>
        </Layout>
      ) : (
        <MobileAreaBox>
          <MobilePlanCard
            whos="my"
            memberPlanData={userPlanData}
            currentDate={currentDate}
          />
          {otherPlanData.map((otherPlan) => (
            <MobilePlanCard
              key={otherPlan.employeeId}
              whos="others"
              memberPlanData={otherPlan}
              currentDate={currentDate}
            />
          ))}
        </MobileAreaBox>
      )}
    </>
  );
}
