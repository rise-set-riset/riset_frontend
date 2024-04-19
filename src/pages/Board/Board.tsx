import styled from "styled-components";
import PostList from "../../components/Board/PostList/PostList";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  overflow-y: hidden;
`;

export default function Board() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">게시글 목록</h2>
        <PostList />
      </main>
    </Layout>
  );
}
