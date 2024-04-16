import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React from "react";
import MemberCard from "../../common/MemberCard";
import FileCard from "./FileCard";
import { BsChatDots } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Layout = styled.form`
  width: 90%;
  max-width: 900px;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--color-white);
`;

const PostWrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

const CommentWrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
`;

const EmojiIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const CloseIcon = styled(IoClose)`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const ModifyIcon = styled(BsThreeDotsVertical)`
  font-size: 1.5rem;
`;

const Date = styled.p`
  color: var(--color-brand-lightgray);
  margin-top: 8px;
  letter-spacing: 1px;
`;

const Member = styled.div`
  height: 83px;
  margin-top: 1rem;
  border-top: 1px solid var(--color-brand-lightgray);
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const Content = styled.div`
  padding: 2rem 1rem;
`;

const TotalChat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-brand-main);

  span {
    font-weight: bold;
  }
`;

const ChatIcon = styled(BsChatDots)`
  font-size: 1.5rem;
`;

const MyComment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--color-brand-lightgray);

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

const CommentInput = styled.input`
  flex: 1;
  border: 1px solid var(--color-brand-lightgray);
  border-radius: 8px;
  padding: 0.7rem;
`;

interface Post {
  post: any;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostShow({ post, setIsFormOpen }: Post) {
  const { user, post: postItem } = post;

  return (
    <Layout>
      <PostWrapper>
        <Header>
          <Title>
            <EmojiIcon src="/assets/default-emoji.png" alt="emoji" />
            {postItem.title}
          </Title>
          <div>
            <ModifyIcon />
            <CloseIcon onClick={() => setIsFormOpen(false)} />
          </div>
        </Header>
        <Date>{postItem.date.split("T")[0]}</Date>
        <Member>
          <MemberCard
            memberInfo={{
              image: "/assets/default-emoji.png",
              alt: "이미지",
              name: user.name,
              rank: user.jobGrade,
              department: user.department,
              position: user.position,
            }}
          />
        </Member>
        <Content dangerouslySetInnerHTML={{ __html: postItem.content }} />
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{ 600: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {postItem?.files &&
            postItem.files.map((file: any, idx: number) => (
              <SwiperSlide key={idx}>
                <FileCard fileName={file.fileName} fileUrl={file.fileUrl} />
              </SwiperSlide>
            ))}
        </Swiper>
      </PostWrapper>
      <CommentWrapper>
        <TotalChat>
          <ChatIcon />
          <span> 댓글 {postItem.comment.length}개</span>
        </TotalChat>
      </CommentWrapper>
      <MyComment>
        <img src="/assets/default-emoji.png" alt="" />
        <CommentInput placeholder="내용을 입력해주세요" />
      </MyComment>
    </Layout>
  );
}
