import styled from "styled-components";
import PlanList from "../../components/Plan/PlanList";
import DateSlider from "../../components/Plan/DateSlider";

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
  return (
    <Layout>
      <main className="main">
        <h2 className="title">근무일정</h2>
        <MainContentLayout>
          <DateSlider />
          <div>검색</div>
          <PlanList />
        </MainContentLayout>
      </main>
    </Layout>
  );
}
