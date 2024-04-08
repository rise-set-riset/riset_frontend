import styled from "styled-components";

export default function Commute() {
  const Layout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
  `;
  return (
    <Layout>
      <main>
        <h1>출퇴근</h1>
      </main>
    </Layout>
  );
}
