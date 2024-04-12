import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MemberCard from "../../common/MemberCard";
import PlanCard from "./PlanCard";

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
  /* overflow-y: scroll; */
`;

const MemberCardStyle = styled.div`
  > div {
    border-radius: 16px;
  }
`;

const PlanCardList = styled.div`
  /* overflow-y: scroll; */
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

export default function PlanList() {
  const [isFixed, setIsFixed] = useState<boolean>(true);

  const memberListRef = useRef<HTMLDivElement>(null);
  const planListRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState<number>(0);

  useEffect(() => {
    const memberHeight = memberListRef.current?.clientHeight || 0;
    const planHeight = planListRef.current?.clientHeight || 0;
    setLineHeight(Math.max(memberHeight, planHeight));
  }, []);

  return (
    <Layout>
      <MemberCardList ref={memberListRef}>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
        <MemberCardStyle>
          <MemberCard />
        </MemberCardStyle>
      </MemberCardList>

      <Divider $lineHeight={lineHeight}></Divider>

      <PlanCardList ref={planListRef}>
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
        <PlanCard isFixed={isFixed} />
      </PlanCardList>
    </Layout>
  );
}
