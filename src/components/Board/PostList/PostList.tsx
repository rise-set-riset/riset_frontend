import styled, { css } from "styled-components";
import SearchBar from "../../../common/SearchBar";
import { useEffect, useRef, useState } from "react";
import PostCard from "../PostCard";
import { GoPlusCircle } from "react-icons/go";
import { Reorder } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
`;

const Search = styled.div`
  width: 500px;
`;

const Contents = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

const Content = styled.div`
  width: 100%;
`;

const MidLine = styled.div`
  height: calc(100% - 50px);
  width: 1px;
  margin: 0 2rem;
  background-color: var(--color-brand-lightgray);
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ManageBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const CommonSection = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem 0 0;
  overflow-y: scroll;
  li {
    margin-bottom: 1.5rem;
  }
`;

const Favorites = styled.div`
  ${CommonSection}
`;

const Posts = styled.div`
  ${CommonSection}
`;

const PlusIcon = styled(GoPlusCircle)`
  font-size: 30px;
`;

const Loading = styled.div`
  margin: auto;
`;

export default function PostList() {
  // 제목 검색
  const [searchTitle, setSearchTitle] = useState<string>("");
  // 즐겨찾기 게시글
  const [favoritePosts, setFavoritePosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  // 전체 게시글
  const [posts, setPosts] = useState<any[]>([]);
  // observer 탐지용 ref
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  /* 즐겨찾기 게시글 */
  useEffect(() => {
    const fetchMorePosts = async () => {
      const data = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${skip * 10}&searchTitle=${searchTitle}`
      ).then((res) => res.json());

      // 추가 게시글이 있는지 확인
      if (data.posts.length === 0) {
        setHasMore(false);
      } else {
        setFavoritePosts((prevPosts) => [...prevPosts, ...data.posts]);
        setSkip((prevSkip) => prevSkip + 1);
      }
    };

    // 관찰자 지정
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchMorePosts();
    });

    if (observer && lastPostRef.current) observer.observe(lastPostRef.current);

    // 관찰자 해제
    return () => {
      if (observer) observer.disconnect();
    };
  }, [skip, hasMore]);

  return (
    <Layout>
      <Search>
        <SearchBar
          name="search"
          value={searchTitle}
          placeholder="제목 검색"
          autoComplete="false"
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </Search>

      <Contents>
        <Content>
          <ContentHeader>
            <HeaderTitle>즐겨찾기</HeaderTitle>
            <ManageBtn type="button">관리</ManageBtn>
          </ContentHeader>
          <Favorites>
            <Reorder.Group values={favoritePosts} onReorder={setFavoritePosts}>
              {favoritePosts &&
                favoritePosts.map((post) => (
                  <Reorder.Item value={post} key={post.id} drag>
                    <PostCard title={post.title} writer="갱얼쥐" date="2024-04-11" fileCnt="1" />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
            {hasMore && (
              <Loading ref={lastPostRef}>
                <AiOutlineLoading3Quarters />
              </Loading>
            )}
          </Favorites>
        </Content>

        <MidLine />

        <Content>
          <ContentHeader>
            <HeaderTitle>게시글</HeaderTitle>
            <PlusIcon />
          </ContentHeader>
          <Posts>
            {favoritePosts &&
              favoritePosts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  writer="야옹이"
                  date="2024-04-11"
                  fileCnt="1"
                />
              ))}
          </Posts>
        </Content>
      </Contents>
    </Layout>
  );
}
