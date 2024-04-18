import { useState } from "react";
import styled from "styled-components";
import MemberCard from "../../../common/MemberCard";
import PlanCard from "./PlanCard";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
`;

const MemberCardStyle = styled.div<{ $isPlanOpen: boolean }>`
  width: 100%;
  position: relative;
  > div {
    border-radius: 16px 16px 0 0;
    padding: 1.2rem 1.5rem;

    outline: ${(props) =>
      props.$isPlanOpen ? "4px solid var(--color-brand-yellow);" : "none"};
  }
`;

const ShowLength = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  color: var(--color-white);
  background-color: var(--color-brand-main);
  border-radius: 50%;
`;

/* 일정 리스트 */
const PlanCardList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
`;

const ArrowButton = styled.div<{ $isPlanOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brand-yellow);
  height: 40px;
  cursor: pointer;

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
}
export default function MobilePlanCard({
  memberPlanData,
  whos,
}: MobilePlanCard) {
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);
  // console.log(memberPlanData);

  return (
    <div>
      <MemberCardStyle
        onClick={() => setIsPlanOpen(!isPlanOpen)}
        $isPlanOpen={isPlanOpen}
      >
        <MemberCard
          memberInfo={{
            name: memberPlanData.name,
            department: memberPlanData.department || "",
            position: memberPlanData.position || "",
            image: memberPlanData.image,
            rank: memberPlanData.rank || "",
          }}
        />
        {/* <ShowLength>{memberPlanData.length}개</ShowLength> */}
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

      {/* {isPlanOpen &&
        whos === "my" &&
        memberPlanData.unEditablePlan.length !== 0 &&
        memberPlanData.unEditablePlan?.map(
          <PlanCardList>
            <li>
              <PlanCard
                clickToAdd={false}
                isEditable={false}
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

      {isPlanOpen &&
        memberPlanData.planList.length !== 0 &&
        memberPlanData.planList.map(
          <PlanCardList>
            <li>
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
        )} */}

      {whos === "my" && isPlanOpen && (
        <PlusPlanButton>
          {/* <GoPlusCircle onClick={handleAddComponent} /> */}
          <GoPlusCircle />
        </PlusPlanButton>
      )}
    </div>
  );
}
