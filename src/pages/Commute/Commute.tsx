import styled from "styled-components";
import CommuteRecord from "../../components/Commute/CommuteRecord";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default function Commute() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">출퇴근</h2>
        <CommuteRecord />
      </main>
    </Layout>
  );
}
