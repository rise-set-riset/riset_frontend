import { useContext, useEffect, useRef, useState } from "react";
import { ResponsiveContext } from "../contexts/ResponsiveContext";

export default function usePosts(url: string) {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const { isTablet, isMobile } = useContext(ResponsiveContext);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    /* 게시글 조회 */
    const fetchMorePosts = async () => {
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
  }, [skip, hasMore, isTablet, isMobile]);

  /* 댓글 등록 시 처리 함수 */
  const handleComment = (comment: any, postId: number) => {
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

  /* 검색 시 초기화 */
  useEffect(() => {
    setHasMore(true);
    setSkip(0);
    setPosts([]);
  }, [searchWord]);

  return { posts, hasMore, lastItemRef, searchWord, setPosts, setSearchWord, handleComment };
}
