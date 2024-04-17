import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import MemberCard from "../../common/MemberCard";
import FileCard from "./FileCard";
import { BsChatDots } from "react-icons/bs";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FcDocument } from "react-icons/fc";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Layout = styled.div`
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
  padding: 1.5rem 0 0 0;
`;

const CommentScroll = styled.div<{ $isPrevCommentOpen: boolean }>`
  height: 100%;
  max-height: 185px;
  overflow-y: ${(props) => (props.$isPrevCommentOpen ? "scroll" : "hidden")};
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

const EmojiIcon = styled(FcDocument)`
  font-size: 1.2rem;
  margin-right: 0.3rem;
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
  padding: 1rem 1.5rem;

  span {
    font-weight: bold;
  }
`;

const ChatIcon = styled(BsChatDots)`
  font-size: 1.5rem;
`;

const MyComment = styled.form`
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

const Comment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex: 1;
  border: 1px solid var(--color-brand-lightgray);
  border-radius: 8px;
  padding: 0.7rem;
`;

const CommentInput = styled.input`
  flex: 1;
  font-size: 1rem;
  outline: none;
  border: none;
`;

const SendComment = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  outline: none;
  background-color: var(--color-brand-main);
`;

const SendIcon = styled(IoMdArrowRoundUp)`
  color: var(--color-white);
  font-size: 1.2rem;
`;

const AllComment = styled.div`
  width: 100%;
  text-align: right;
  font-weight: bold;
  color: var(--color-brand-main);
  padding: 1.5rem;
  background-color: var(--color-gray-1);
  cursor: pointer;
`;

const UserComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-gray-1);
  padding: 1.5rem;
`;

const CommentDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CommentImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const CommentUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5px;
`;

const CommentEmployeeID = styled.p`
  font-weight: bold;
`;

const CommentDate = styled.p`
  font-size: 0.8rem;
  color: var(--color-brand-lightgray);
`;

interface Post {
  post: any;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleComment: (comment: any, postId: number) => void;
}

export default function PostShow({ post, setIsFormOpen, handleComment }: Post) {
  const [comment, setComment] = useState<string>("");
  const [isPrevCommentOpen, setIsPrevCommentOpen] = useState(false);
  const { user, post: postItem } = post;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim()) {
      const jwt = localStorage.getItem("jwt");

      fetch(`https://dev.risetconstruction.net/reply/${postItem.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          handleComment(data, postItem.id);
          setComment("");
        });
    }
  };

  return (
    <Layout>
      <PostWrapper>
        <Header>
          <Title>
            <EmojiIcon />
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
        {postItem.comment.length > 2 && (
          <AllComment onClick={() => setIsPrevCommentOpen(true)}>
            이전 댓글 보기 ({postItem.comment.length - 2})
          </AllComment>
        )}
        <CommentScroll $isPrevCommentOpen={isPrevCommentOpen}>
          {postItem.comment.length > 0 &&
            postItem.comment.map((com: any) => (
              <UserComment key={com.id}>
                <CommentDetail>
                  <CommentImg src="" alt="" />
                  <div>
                    <CommentUserInfo>
                      <CommentEmployeeID>{com.employee.name}</CommentEmployeeID>
                      <CommentDate>{com.date.split("T")[0]}</CommentDate>
                    </CommentUserInfo>
                    <p>{com.content}</p>
                  </div>
                </CommentDetail>
                <ModifyIcon />
              </UserComment>
            ))}
        </CommentScroll>
      </CommentWrapper>
      <MyComment onSubmit={handleSubmit}>
        <img src="/assets/default-emoji.png" alt="" />
        <Comment>
          <CommentInput
            placeholder="내용을 입력해주세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <SendComment type="submit">
            <SendIcon />
          </SendComment>
        </Comment>
      </MyComment>
    </Layout>
  );
}
