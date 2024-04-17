import styled from "styled-components";
import CompanyChart from "../../components/Group/CompanyChart";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default function GroupChart() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">출퇴근</h2>
        <CompanyChart />
      </main>
    </Layout>
  );
}
