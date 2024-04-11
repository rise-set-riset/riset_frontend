import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default function PersonalPlan() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">근무일정</h2>
      </main>
    </Layout>
  );
}
