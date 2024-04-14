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
  const urlFull = `${url}?size=10&page=${skip}${searchWord ? `&searchTitle=${searchWord}` : ""}`;

  /* 게시글 조회 */
  useEffect(() => {
    const fetchMorePosts = async () => {
      const data = await fetch(urlFull, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => res.json());

      console.log(data);
      // 추가 게시글이 있는지 확인
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
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

  return { posts, hasMore, lastItemRef, searchWord, setPosts, setSearchWord };
}
