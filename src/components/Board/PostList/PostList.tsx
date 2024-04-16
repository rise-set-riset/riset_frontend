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

const ContentFavorite = styled.div<{
  $isOpen: boolean;
  $isChangeMenu: boolean;
}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  width: 100%;
  li {
    transform: ${(props) => props.$isChangeMenu && "none !important"};
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
  const [isFavoriteManageClick, setIsFavoriteManageClick] =
    useState<boolean>(false);
  const [isManageClick, setIsManageClick] = useState<boolean>(false);
  const [isMenuClick, setIsMenuClick] = useState<boolean>(false);
  const [isChangeMenu, setIsChangeMenu] = useState<boolean>(false);
  // 모바일, 태블릿 여부 판단
  const { isTablet, isMobile } = useContext(ResponsiveContext);
  // Hook 사용
  const { posts, hasMore, lastItemRef, setSearchWord } = usePosts(
    "https://dev.risetconstruction.net/board"
  );
  const {
    posts: favoritePosts,
    hasMore: hasFavoriteMore,
    lastItemRef: lastFavoriteItemRef,
    setPosts: setFavoritePosts,
    setSearchWord: setFavoriteSearchWord,
  } = usePosts("https://dev.risetconstruction.net/board/favorite");
  // 즐겨찾기, 게시물 열리는 조건
  const isFavoriteOpen =
    ((isMobile || isTablet) && !isMenuClick) || (!isMobile && !isTablet);
  const isAllOpen =
    ((isMobile || isTablet) && isMenuClick) || (!isMobile && !isTablet);
  // jwt
  const jwt = localStorage.getItem("jwt");

  /* 검색창 검색 */
  const handleSearchtitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTitle(value);
    setSearchWord(value);
    setFavoriteSearchWord(value);
  };

  /* 즐겨찾기 삭제 */
  const handleRemoveFavorite = async (
    e: React.MouseEvent<SVGElement>,
    postId: number
  ) => {
    e.stopPropagation();
    await fetch(
      `https://dev.risetconstruction.net/board/favorite/delete/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setFavoritePosts(data));
  };

  /* 즐겨찾기 추가 */
  const handleAddFavorite = (e: React.MouseEvent<SVGElement>, post: any) => {
    e.stopPropagation();
    fetch(`https://dev.risetconstruction.net/board/favorite/${post.post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFavoritePosts(data));
  };

  /* 휴대폰 화면에서 클릭 시 */
  const handleMenuClick = async (type: string) => {
    // 메뉴 변경 시 Framer-motion의 dragging 이펙트 일시중지하기 (화면 전환 시 멀리서부터 끌려오는 현상 방지)
    setIsChangeMenu(true);
    setTimeout(() => {
      setIsChangeMenu(false);
    }, 500);

    if (type === "favorite") {
      setIsMenuClick(false);
    } else {
      setIsMenuClick(true);
    }
  };

  /* 즐겨찾기 드랍 후 실행될 함수 */
  const handleDragUp = (idx: number) => {
    if (idx > 0) {
      const beforePostIdx = favoritePosts[idx - 1].indexNumber;
      const movedPostId = favoritePosts[idx].post.id;

      fetch(
        `https://dev.risetconstruction.net/board/favorite/update/${movedPostId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(beforePostIdx),
        }
      );
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
          onChange={handleSearchtitle}
        />
      </Search>

      <Contents>
        <ContentFavorite $isOpen={isFavoriteOpen} $isChangeMenu={isChangeMenu}>
          <ContentHeader>
            <HeaderWrapper>
              {isTablet || isMobile ? (
                <>
                  <HeaderTitle onClick={() => handleMenuClick("favorite")}>
                    즐겨찾기
                  </HeaderTitle>
                  <HeaderLine />
                  <HeaderTitle onClick={() => handleMenuClick("posts")}>
                    게시물
                  </HeaderTitle>
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
                    key={post.id}
                    drag="y"
                    onPointerUp={() => handleDragUp(idx)}
                  >
                    <PostCard
                      post={post}
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
        </ContentFavorite>

        {!isMobile && !isTablet && <MidLine />}

        <ContentAll $isOpen={isAllOpen}>
          <ContentHeader>
            <HeaderWrapper>
              {isTablet || isMobile ? (
                <>
                  <HeaderTitle onClick={() => handleMenuClick("favorite")}>
                    즐겨찾기
                  </HeaderTitle>
                  <HeaderLine />
                  <HeaderTitle onClick={() => handleMenuClick("posts")}>
                    게시물
                  </HeaderTitle>
                </>
              ) : (
                <HeaderTitle>게시물</HeaderTitle>
              )}
            </HeaderWrapper>
            <ManageBtn
              type="button"
              onClick={() => setIsManageClick(!isManageClick)}
            >
              관리
            </ManageBtn>
          </ContentHeader>
          <Posts>
            {posts &&
              posts.map((post) => (
                <PostCard
                  key={post.post.id}
                  post={post}
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
        </ContentAll>
      </Contents>
    </Layout>
  );
}
