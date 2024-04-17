import styled from "styled-components";
import Inception from "../../components/Home/Inception";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default function Home() {
  return (
    <Layout>
      <main className="main">
        <Inception />
      </main>
    </Layout>
  );
}
