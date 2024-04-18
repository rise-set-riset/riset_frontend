import styled from "styled-components";
import OfficialCard from "./OfficialCard";
import CommuteRecord from "../Commute/CommuteRecord";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanCard from "../Plan/Personal/PlanCard";
import { Link } from "react-router-dom";
import PostCard from "../Board/PostCard";
import { useContext, useEffect, useState } from "react";
import { EventFormType } from "../Plan/Official/OfficialCalendar";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

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

const TotalCntAbbr = styled.div<{ $isDarkmode: boolean }>`
  width: 50%;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 1rem;
  border: ${(props) => (props.$isDarkmode ? "1px solid var(--color-brand-lightgray)" : "none")};
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

const OfficialPlanAbbr = styled.div<{ $isDarkmode: boolean }>`
  width: 50%;
  min-width: 300px;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  border: ${(props) => (props.$isDarkmode ? "1px solid var(--color-brand-lightgray)" : "none")};
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

const ThirdSection = styled.section<{ $isDarkmode: boolean }>`
  height: 164px;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.$isDarkmode ? "var(--color-brand-darkgray)" : "var(--color-brand-yellow)"};
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

const FourthSection = styled.section<{ $isDarkmode: boolean }>`
  padding: 1rem;
  border-radius: 1rem;
  border: ${(props) => (props.$isDarkmode ? "1px solid var(--color-brand-lightgray)" : "none")};
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

interface DaysType {
  [key: string]: number;
}

export default function Inception() {
  const [posts, setPosts] = useState<any>([]);
  const [days, setDays] = useState<DaysType>({});
  const [officialPlan, setOfficialPlan] = useState<EventFormType[]>([]);
  const [personalPlan, setPersonalPlan] = useState<any>([]);
  const jwt = localStorage.getItem("jwt");
  const { isDarkmode } = useContext(DarkModeContext);

  /* 초기 데이터 세팅 */
  useEffect(() => {
    // 출근일, 잔여연차 가져오기
    fetch("https://dev.risetconstruction.net/commute/days", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setDays(data));

    // 게시글 3개 가져오기
    fetch("https://dev.risetconstruction.net/board?size=3&page=0&searchWord=''", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data));

    // 회사 일정 가져오기 (월별)
    fetch(
      `https://dev.risetconstruction.net/api/get?currentMonth=${new Date()
        .toISOString()
        .slice(0, 7)
        .replace("-", "")}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setOfficialPlan(data));

    // 근무 일정 가져오기 (일별)
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);

    fetch(
      `https://dev.risetconstruction.net/api/employees?employeeDate=${
        currentDate.toISOString().split("T")[0]
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPersonalPlan(data));
  }, []);

  /* 댓글 등록 */
  const handleCommentRegist = (comment: any, postId: number) => {
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

  /* 댓글 삭제 */
  const handleCommentDelete = (commentId: number) => {
    setPosts((prevPosts: any) =>
      prevPosts.map((post: any) => post.post.comment.filter((com: any) => com.id !== commentId))
    );
  };

  /* 게시글 삭제 */
  const handlePostDelete = (postId: number) => {
    setPosts((prevPosts: any) => prevPosts.filter((post: any) => post.post.id !== postId));
  };

  /* 게시글 수정 */
  const handlePostModify = (post: any) => {
    setPosts((prevPosts: any) =>
      prevPosts.map((info: any) => {
        if (info.post.id === post.post.id) {
          return post;
        } else {
          return info;
        }
      })
    );
  };

  return (
    <Layout>
      <FirstSection>
        <TotalCntAbbr $isDarkmode={isDarkmode}>
          <WorkCnt>
            <p>출근일</p>
            <p>{days.commuteDays}</p>
          </WorkCnt>
          <MidLine />
          <LeftAnnual>
            <p>잔여연차</p>
            <p>
              {days.restLeaves}
              <span>/{days.totalLeaves}</span>
            </p>
          </LeftAnnual>
        </TotalCntAbbr>
        <OfficialPlanAbbr $isDarkmode={isDarkmode}>
          <OfficialTitle>
            <span>Today</span>
            <span>회사일정</span>
          </OfficialTitle>
          <OfficialInfo>
            {officialPlan.length > 0 &&
              officialPlan.map((plan) => (
                <OfficialCard key={plan.scheduleNo} title={plan.title} color={plan.color} />
              ))}
          </OfficialInfo>
        </OfficialPlanAbbr>
      </FirstSection>

      <SecondSection>
        <CommuteRecord />
      </SecondSection>

      <ThirdSection $isDarkmode={isDarkmode}>
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
          {Array.from({ length: 5 }, (_, idx) => (
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

      <FourthSection $isDarkmode={isDarkmode}>
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
                handleCommentRegist={handleCommentRegist}
                handleCommentDelete={handleCommentDelete}
                handlePostModify={handlePostModify}
                handleAllPostDelete={handlePostDelete}
              />
            ))}
        </Posts>
      </FourthSection>
    </Layout>
  );
}
