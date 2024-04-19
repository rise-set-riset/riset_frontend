import styled, { css } from "styled-components";
import SearchBar from "../../../common/SearchBar";
import { ChangeEvent, useContext, useState } from "react";
import PostCard from "../PostCard";
import { Reorder } from "framer-motion";
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

const ContentFavorite = styled.div<{
  $isOpen: boolean;
  $isChangePosts: boolean;
}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  width: 100%;
  li {
    transform: ${(props) => props.$isChangePosts && "none !important"};
  }
`;

const ContentAll = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
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

const HeaderWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.3s;

  @media screen and (max-width: 1023px) {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const HeaderLine = styled.div`
  width: 1px;
  background-color: var(--color-brand-lightgray);
`;

const ManageBtn = styled.button`
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  transition: transform 0.3s;
  color: var(--color-black);
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

  li:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media screen and (max-width: 599px) {
    padding: 0 2rem;
    max-height: 300px;
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
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  // 모바일 화면에서 클릭 시 framer-motion 라이브러리 dragging 상태 판단
  const [isChangePosts, setIsChangePosts] = useState<boolean>(false);
  // 모바일, 태블릿 여부 판단
  const { isTablet, isMobile } = useContext(ResponsiveContext);
  // 전체 게시글
  const {
    posts,
    hasMore,
    lastItemRef,
    setSearchWord,
    handlePostModify,
    handleCommentRegist,
    handleCommentDelete,
    handlePostDelete,
  } = usePosts("https://dev.risetconstruction.net/board");
  // 즐겨찾기 게시글
  const {
    posts: favoritePosts,
    hasMore: favoriteHasMore,
    lastItemRef: favoriteLastItemRef,
    setPosts: setFavoritePosts,
    setSearchWord: setFavoriteSearchWord,
    handlePostModify: handleFavoritePostModify,
    handleCommentRegist: handleFavoriteCommentRegist,
    handleCommentDelete: handleFavoriteCommentDelete,
    handlePostRegist: handleFavoritePostRegist,
    handlePostDelete: handleFavoritePostDelete,
    handleIsPostExists: handleFavoriteIsPostExists,
  } = usePosts("https://dev.risetconstruction.net/board/favorite");
  // 즐겨찾기, 전체 게시물 열리는 조건
  const isFavoriteOpen = ((isMobile || isTablet) && !isMenuClick) || (!isMobile && !isTablet);
  const isAllOpen = ((isMobile || isTablet) && isMenuClick) || (!isMobile && !isTablet);
  // jwt
  const jwt = localStorage.getItem("jwt");

  /* 검색창 검색 */
  const handleSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTitle(value);
    setSearchWord(value);
    setFavoriteSearchWord(value);
  };

  /* 즐겨찾기, 전체 게시글 모두 삭제 */
  const handleAllPostDelete = (postId: number) => {
    handlePostDelete(postId);
    handleFavoritePostDelete(postId);
  };

  /* 휴대폰 화면에서 상단 메뉴 탭 전환 */
  const handleMenuClick = async (type: string) => {
    // framer-motion 라이브러리의 dragging 이펙트 일시중지하기 (화면 전환 시 멀리서부터 끌려오는 현상 방지)
    setIsChangePosts(true);
    setTimeout(() => {
      setIsChangePosts(false);
    }, 1000);

    if (type === "favorite") {
      setIsMenuClick(false);
    } else {
      setIsMenuClick(true);
    }
  };

  /* 즐겨찾기 드래그 앤 드랍 */
  const handleDragUp = (idx: number) => {
    if (idx > 0) {
      const beforePostIdx = favoritePosts[idx - 1].indexNumber;
      const movedPostId = favoritePosts[idx].post.id;

      fetch(`https://dev.risetconstruction.net/board/favorite/update/${movedPostId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beforePostIdx),
      });
    }
  };

  return (
    <Layout>
      <Search>
        <SearchBar
          name="search"
          value={searchTitle}
          placeholder="제목 검색"
          autoComplete="false"
          onChange={handleSearchTitle}
        />
      </Search>

      <Contents>
        <ContentFavorite $isOpen={isFavoriteOpen} $isChangePosts={isChangePosts}>
          <ContentHeader>
            <HeaderWrapper>
              {isTablet || isMobile ? (
                <>
                  <HeaderTitle onClick={() => handleMenuClick("favorite")}>즐겨찾기</HeaderTitle>
                  <HeaderLine />
                  <HeaderTitle onClick={() => handleMenuClick("posts")}>게시물</HeaderTitle>
                </>
              ) : (
                <HeaderTitle>즐겨찾기</HeaderTitle>
              )}
            </HeaderWrapper>
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
                favoritePosts.map((post, idx) => (
                  <Reorder.Item
                    value={post}
                    key={post.post.id}
                    drag="y"
                    onPointerUp={() => handleDragUp(idx)}
                  >
                    <PostCard
                      post={post}
                      isAllPosts={false}
                      isManageClick={isFavoriteManageClick}
                      handleCommentRegist={handleFavoriteCommentRegist}
                      handleCommentDelete={handleCommentDelete}
                      handlePostModify={handleFavoritePostModify}
                      handleAllPostDelete={handleAllPostDelete}
                      handleFavoritePostDelete={handleFavoritePostDelete}
                    />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
            {favoriteHasMore && <Loading ref={favoriteLastItemRef} />}
          </Favorites>
        </ContentFavorite>

        {!isMobile && !isTablet && <MidLine />}

        <ContentAll $isOpen={isAllOpen}>
          <ContentHeader>
            <HeaderWrapper>
              {isTablet || isMobile ? (
                <>
                  <HeaderTitle onClick={() => handleMenuClick("favorite")}>즐겨찾기</HeaderTitle>
                  <HeaderLine />
                  <HeaderTitle onClick={() => handleMenuClick("posts")}>게시물</HeaderTitle>
                </>
              ) : (
                <HeaderTitle>게시물</HeaderTitle>
              )}
            </HeaderWrapper>
            <ManageBtn type="button" onClick={() => setIsManageClick(!isManageClick)}>
              관리
            </ManageBtn>
          </ContentHeader>

          <Posts>
            {posts &&
              posts.map((post) => (
                <PostCard
                  key={post.post.id}
                  post={post}
                  isAllPosts={true}
                  isManageClick={isManageClick}
                  handleCommentRegist={handleCommentRegist}
                  handleCommentDelete={handleFavoriteCommentDelete}
                  handlePostModify={handlePostModify}
                  handleAllPostDelete={handleAllPostDelete}
                  handleFavoritePostRegist={handleFavoritePostRegist}
                  handleFavoriteIsPostExists={handleFavoriteIsPostExists}
                />
              ))}

            {hasMore && <Loading ref={lastItemRef} />}
          </Posts>
        </ContentAll>
      </Contents>
    </Layout>
  );
}
