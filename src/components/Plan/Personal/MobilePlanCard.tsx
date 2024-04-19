import { useEffect, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";

const Layout = styled.div<{ $isPlanOpen: boolean }>`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: ${(props) =>
    props.$isPlanOpen ? "4px solid var(--color-brand-yellow);" : "none"};
  border-radius: 16px;
  padding-bottom: 1rem;
`;

const MemberCardStyle = styled.div`
  width: 100%;
  position: relative;
  > div {
    border-radius: 16px 16px 0 0;
    padding: 1.2rem 1.5rem;
  }
`;

const ShowLength = styled.div`
  position: absolute;
  border-radius: 50% !important;
  width: 16px;
  height: 16px;
  top: 36px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  background-color: var(--color-brand-main);
  border-radius: 50%;
  padding: 8px !important;
  font-weight: bold;
  font-size: 12px;
`;

/* 일정 리스트 */
const PlanCardList = styled.ul`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ArrowButton = styled.div<{ $isPlanOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brand-yellow);
  height: 40px;
  cursor: pointer;
  font-size: 1.5rem;

  outline: 4px solid
    ${(props) =>
      props.$isPlanOpen ? "4px solid var(--color-brand-yellow);" : "none"};
  border-right: 4px solid
    ${(props) =>
      props.$isPlanOpen ? "4px solid var(--color-brand-yellow);" : "none"};
`;

/* 일정 추가 버튼 */
const PlusPlanButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: var(--color-black);
  margin-top: 1rem;
`;

interface MobilePlanCard {
  whos: string;
  memberPlanData: any;
  currentDate: Date;
}
export default function MobilePlanCard({
  memberPlanData,
  whos,
  currentDate,
}: MobilePlanCard) {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);
  const [planComponents, setPlanComponents] = useState<JSX.Element[]>([]);
  const [allPlanLen, setAllPlanLen] = useState<number>(0);

  useEffect(() => {
    if (Array.isArray(memberPlanData?.planList)) {
      if (memberPlanData?.unEditablePlan) {
        setAllPlanLen(
          memberPlanData.planList.length + memberPlanData.unEditablePlan.length
        );
      } else {
        setAllPlanLen(memberPlanData.planList.length);
      }
    }
  }, []);

  /* Plus 버튼 클릭시 새로운 Plan 컴포넌트 추가*/
  const handleAddComponent = () => {
    setPlanComponents((prevComponents) => [
      ...prevComponents,
      <PlanCardList key={uuidv4()}>
        <li>
          <PlanCard
            clickToAdd={true}
            isEditable={true}
            currentDate={currentDate}
            planContent={{
              id: memberPlanData.id,
              startTime: memberPlanData.startTime,
              endTime: memberPlanData.endTime,
              title: memberPlanData.title,
            }}
          />
        </li>
      </PlanCardList>,
    ]);
  };

  return (
    <Layout $isPlanOpen={isPlanOpen}>
      <MemberCardStyle onClick={() => setIsPlanOpen(!isPlanOpen)}>
        <MemberCard
          memberInfo={{
            name: memberPlanData.name,
            department: memberPlanData.department || "false",
            position: memberPlanData.position || "false",
            image: memberPlanData.image || "false",
            rank: memberPlanData.rank || "false",
          }}
        />
        {allPlanLen !== 0 && <ShowLength>{allPlanLen}</ShowLength>}
      </MemberCardStyle>
      {isPlanOpen ? (
        <ArrowButton $isPlanOpen={isPlanOpen}>
          <IoIosArrowUp />
        </ArrowButton>
      ) : (
        <ArrowButton $isPlanOpen={isPlanOpen}>
          <IoIosArrowDown />
        </ArrowButton>
      )}

      {isPlanOpen &&
        whos === "my" &&
        memberPlanData.unEditablePlan &&
        memberPlanData.unEditablePlan.length !== 0 && (
          <PlanCardList>
            {memberPlanData?.unEditablePlan?.map((plan: any) => (
              <li key={uuidv4()}>
                <PlanCard
                  clickToAdd={false}
                  isEditable={false}
                  planContent={{
                    id: plan.id,
                    startTime: plan.startTime,
                    endTime: plan.endTime,
                    title: plan.title,
                  }}
                />
              </li>
            ))}
          </PlanCardList>
        )}

      {isPlanOpen &&
        memberPlanData.planList &&
        memberPlanData.planList.length !== 0 &&
        memberPlanData.planList.map(
          <PlanCardList>
            <li key={uuidv4()}>
              <PlanCard
                clickToAdd={false}
                isEditable={true}
                planContent={{
                  id: memberPlanData.id,
                  startTime: memberPlanData.startTime,
                  endTime: memberPlanData.endTime,
                  title: memberPlanData.title,
                }}
              />
            </li>
          </PlanCardList>
        )}
      {isPlanOpen && planComponents}
      {whos === "my" && isPlanOpen && (
        <PlusPlanButton>
          <GoPlusCircle onClick={handleAddComponent} />
        </PlusPlanButton>
      )}
    </Layout>
  );
}
