import styled from "styled-components";
import MyPost from "../../components/Board/MyPost/MyPost";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export default function MyBoard() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">내 게시글</h2>
        <MyPost />
      </main>
    </Layout>
  );
}
