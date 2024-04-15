import { useState } from "react";
import styled from "styled-components";
import PlanList from "../../components/Plan/Personal/PlanList";
import DateSlider from "../../components/Plan/Personal/DateSlider";
import PlanSearch from "../../components/Plan/Personal/PlanSearch";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MainContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem;
`;

export default function PersonalPlan() {
  /* 선택한 날짜 상태값 */
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <Layout>
      <main className="main">
        <h2 className="title">근무일정</h2>
        <MainContentLayout>
          <DateSlider setCurrentDate={setCurrentDate} />
          <PlanSearch currentDate={currentDate} />
          <PlanList currentDate={currentDate} />
        </MainContentLayout>
      </main>
    </Layout>
  );
}
