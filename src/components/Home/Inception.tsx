import styled from "styled-components";
import OfficialCard from "./OfficialCard";
import CommuteRecord from "../Commute/CommuteRecord";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanCard from "../Plan/Personal/PlanCard";
import { Link } from "react-router-dom";
import PostCard from "../Board/PostCard";
import { useEffect, useState } from "react";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const FirstSection = styled.section`
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TotalCntAbbr = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 1rem;
  padding: 0.5rem;
  font-weight: bold;
  overflow: hidden;
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: 20px;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`;

const WorkCnt = styled.div`
  text-align: center;

  p:last-child {
    color: var(--color-brand-main);
    margin-top: 7px;
  }
`;

const MidLine = styled.div`
  width: 1px;
  height: 100%;
  background-color: var(--color-brand-lightgray);
`;

const LeftAnnual = styled.div`
  text-align: center;

  p:last-child {
    color: var(--color-brand-main);
    margin-top: 7px;
  }

  p > span {
    font-size: 0.9rem;
    color: var(--color-brand-lightgray);
  }
`;

const OfficialPlanAbbr = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: var(--color-white);
  overflow: hidden;

  @media screen and (max-width: 1023px) {
    width: 100%;
  }
`;

const OfficialTitle = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--color-white);
  text-align: center;
  background-color: var(--color-brand-main);

  span:first-child {
    font-weight: bold;
  }

  span:last-child {
    font-size: 0.9rem;
  }
`;

const OfficialInfo = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  padding: 0 0.5rem;

  @media screen and (max-width: 1023px) {
    justify-content: flex-start;
  }
`;

const SecondSection = styled.section`
  display: flex;
  gap: 1rem;

  .commute-record {
    padding: 0;
    justify-content: space-between;
    gap: 1rem;
  }

  .commute-map {
    width: 50%;
    min-width: 300px;
    height: auto;

    @media screen and (max-width: 1023px) {
      width: 100%;
    }
  }

  .commute-calendar {
    width: 50%;
    min-width: 300px;
    height: auto;

    @media screen and (max-width: 1023px) {
      width: 100%;
    }
  }
`;

const ThirdSection = styled.section`
  height: 164px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-brand-yellow);
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    gap: 0.5rem;
    border: none;
    outline: none;
    font-size: 1rem;
    transition: transform 0.3s;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const FourthSection = styled.section`
  padding: 1rem;
`;

const Posts = styled.div`
  margin-top: 1rem;

  > div {
    margin-bottom: 1rem;
  }
`;

const SwiperCustom = styled(Swiper)`
  margin-top: 1rem;
  cursor: grab;
`;

export default function Inception() {
  const [posts, setPosts] = useState<any>([]);

  /* 게시글 3개만 가져오기 */
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    fetch("https://dev.risetconstruction.net/board?size=3&page=0&searchWord=''", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  /* 댓글 등록 시 처리 함수 */
  const handleComment = (comment: any, postId: number) => {
    setPosts((prevPosts: any) =>
      prevPosts.map((post: any) => {
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

  return (
    <Layout>
      <FirstSection>
        <TotalCntAbbr>
          <WorkCnt>
            <p>출근일</p>
            <p>4</p>
          </WorkCnt>
          <MidLine />
          <LeftAnnual>
            <p>잔여연차</p>
            <p>
              12<span>/15</span>
            </p>
          </LeftAnnual>
        </TotalCntAbbr>
        <OfficialPlanAbbr>
          <OfficialTitle>
            <span>Today</span>
            <span>회사일정</span>
          </OfficialTitle>
          <OfficialInfo>
            <OfficialCard />
            <OfficialCard />
            <OfficialCard />
            <OfficialCard />
            <OfficialCard />
            <OfficialCard />
          </OfficialInfo>
        </OfficialPlanAbbr>
      </FirstSection>

      <SecondSection>
        <CommuteRecord />
      </SecondSection>

      <ThirdSection>
        <SectionTitle>
          <h2>근무일정</h2>
          <Link to="/plan/official">
            <button type="button">
              <span>더보기</span>
              <IoIosArrowForward />
            </button>
          </Link>
        </SectionTitle>
        <SwiperCustom
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{ 600: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {Array.from({ length: 10 }, (_, idx) => (
            <SwiperSlide key={idx}>
              <PlanCard
                clickToAdd={false}
                isEditable={false}
                planContent={{ id: idx, startTime: "10:00", endTime: "12:00", title: "테스트" }}
              />
            </SwiperSlide>
          ))}
        </SwiperCustom>
      </ThirdSection>

      <FourthSection>
        <SectionTitle>
          <h2>게시판</h2>
          <Link to="/board/postlist">
            <button type="button">
              <span>더보기</span>
              <IoIosArrowForward />
            </button>
          </Link>
        </SectionTitle>
        <Posts>
          {posts &&
            posts.map((post: any) => (
              <PostCard
                key={post.post.id}
                post={post}
                isManageClick={false}
                isAllPosts={false}
                handleIconClick={() => {}}
                handleComment={handleComment}
              />
            ))}
        </Posts>
      </FourthSection>
    </Layout>
  );
}
