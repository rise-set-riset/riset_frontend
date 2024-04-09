import styled from "styled-components";

export default function Commute() {
  const Layout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `;

  return (
    <Layout>
      <main className="main">
        <h1 className="title">출퇴근</h1>
      </main>
    </Layout>
  );
}
