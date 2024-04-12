import styled, { css } from "styled-components";
import SearchBar from "../../../common/SearchBar";
import { ChangeEvent, useContext, useState } from "react";
import PostCard from "../PostCard";
import { Reorder } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import usePosts from "../../../hooks/usePosts";
import { ResponsiveContext } from "../../../contexts/ResponsiveContext";

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;

  @media screen and (max-width: 599px) {
    padding: 0;
  }
`;

const Search = styled.div`
  width: 100%;
  max-width: 500px;
  @media screen and (max-width: 599px) {
    padding: 1rem 1rem 0 1rem;
  }
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
  margin: 3.5rem 2rem;
  background-color: var(--color-brand-lightgray);
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ManageBtn = styled.button`
  font-weight: bold;
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
  height: 100%;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
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

const Loading = styled.div`
  margin: auto;
`;

export default function PostList() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [isFavoriteManageClick, setIsFavoriteManageClick] = useState<boolean>(false);
  const [isManageClick, setIsManageClick] = useState<boolean>(false);
  const { isTablet } = useContext(ResponsiveContext);
  const { posts, hasMore, lastItemRef, setSearchWord } = usePosts();
  const {
    posts: favoritePosts,
    hasMore: hasFavoriteMore,
    lastItemRef: lastFavoriteItemRef,
    setPosts: setFavoritePosts,
    setSearchWord: setFavoriteSearchWord,
  } = usePosts();

  console.log(isTablet);

  /* 검색창 검색 */
  const handleSearchtitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTitle(value);
    setSearchWord(value);
    setFavoriteSearchWord(value);
  };

  /* 즐겨찾기 삭제 */
  const handleRemoveFavorite = (postId: string) => {
    setFavoritePosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    // API 요청 필요 (서버에서도 삭제)
  };

  /* 즐겨찾기 추가 */
  const handleAddFavorite = (post: any) => {
    setFavoritePosts((prevPosts) => [post, ...prevPosts]);
    // API 요청 필요 (서버에서도 추가)
  };

  return (
    <Layout>
      <Search>
        <SearchBar
          name="search"
          value={searchTitle}
          placeholder="제목 검색"
          autoComplete="false"
          onChange={handleSearchtitle}
        />
      </Search>

      <Contents>
        <Content>
          <ContentHeader>
            <HeaderTitle>즐겨찾기</HeaderTitle>
            <ManageBtn
              type="button"
              onClick={() => setIsFavoriteManageClick(!isFavoriteManageClick)}
            >
              관리
            </ManageBtn>
          </ContentHeader>
          <Favorites>
            <Reorder.Group values={favoritePosts} onReorder={setFavoritePosts}>
              {favoritePosts &&
                favoritePosts.map((post) => (
                  <Reorder.Item value={post} key={post.id} drag>
                    <PostCard
                      postId={post.id}
                      title={post.title}
                      writer="갱얼쥐"
                      date="2024-04-11"
                      fileCnt="1"
                      isManageClick={isFavoriteManageClick}
                      handleIconClick={handleRemoveFavorite}
                      isAllPosts={false}
                    />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
            {hasFavoriteMore && (
              <Loading ref={lastFavoriteItemRef}>
                <AiOutlineLoading3Quarters />
              </Loading>
            )}
          </Favorites>
        </Content>

        {!isTablet && (
          <>
            <MidLine />

            <Content>
              <ContentHeader>
                <HeaderTitle>게시글</HeaderTitle>
                <ManageBtn type="button" onClick={() => setIsManageClick(!isManageClick)}>
                  관리
                </ManageBtn>
              </ContentHeader>
              <Posts>
                {posts &&
                  posts.map((post) => (
                    <PostCard
                      key={post.id}
                      postId={post.id}
                      title={post.title}
                      writer="야옹이"
                      date="2024-04-11"
                      fileCnt="1"
                      isManageClick={isManageClick}
                      handleIconClick={handleAddFavorite}
                      isAllPosts={true}
                    />
                  ))}
                {hasMore && (
                  <Loading ref={lastItemRef}>
                    <AiOutlineLoading3Quarters />
                  </Loading>
                )}
              </Posts>
            </Content>
          </>
        )}
      </Contents>
    </Layout>
  );
}
