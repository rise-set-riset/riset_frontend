import { useContext, useEffect, useRef, useState } from "react";
import { ResponsiveContext } from "../contexts/ResponsiveContext";

export default function usePosts(url: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const { isTablet, isMobile } = useContext(ResponsiveContext);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  /* 게시글 조회 + 무한 스크롤 */
  useEffect(() => {
    const fetchMorePosts = async () => {
      const jwt = localStorage.getItem("jwt");
      const fullUrl = `${url}?size=5&page=${skip}${searchWord ? `&title=${searchWord}` : ""}`;

      const datas = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => res.json());

      // 추가 게시글이 있는지 확인
      if (datas.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...datas]);
        setSkip((prevSkip) => prevSkip + 1);
      }
    };

    // 관찰자 지정
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) fetchMorePosts();
    });

    if (observer && lastItemRef.current) observer.observe(lastItemRef.current);

    // 관찰자 해제
    return () => {
      if (observer) observer.disconnect();
    };
  }, [skip, hasMore, isTablet, isMobile, searchWord, url]);

  /* 댓글 등록 */
  const handleCommentRegist = (comment: any, postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.post.id === postId) {
          return {
            ...post,
            post: {
              ...post.post,
              comment: [comment, ...post.post.comment],
            },
          };
        } else {
          return post;
        }
      })
    );
  };

  /* 게시글 등록 */
  const handlePostRegist = (post: any) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  /* 게시글 삭제 */
  const handlePostDelete = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.post.id !== postId));
  };

  /* 게시글이 즐겨찾기에 이미 등록되어있는지 확인 */
  const handleIsPostExists = (postId: number) => {
    return posts.some((post) => post.post.id === postId);
  };

  /* 검색 시 초기화 */
  useEffect(() => {
    setHasMore(true);
    setSkip(0);
    setPosts([]);
  }, [searchWord]);

  return {
    posts,
    hasMore,
    lastItemRef,
    searchWord,
    setPosts,
    setSearchWord,
    handleCommentRegist,
    handlePostRegist,
    handlePostDelete,
    handleIsPostExists,
  };
}
