import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import MemberCard from "../../common/MemberCard";
import FileCard from "./FileCard";
import { BsChatDots } from "react-icons/bs";
import { IoMdArrowRoundUp } from "react-icons/io";
import { FcDocument } from "react-icons/fc";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import Modal from "../../common/Modal";
import PostMake from "./PostMake";

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

const UtilWrapper = styled.div`
  position: relative;
`;

const CloseIcon = styled(IoClose)`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const ModifyIcon = styled(BsThreeDotsVertical)`
  font-size: 1.5rem;
`;

const ModDel = styled.div`
  position: absolute;
  background-color: var(--color-white);
  border: 1px solid var(--color-brand-lightgray);
  border-radius: 0.5rem;
  cursor: pointer;

  p {
    padding: 0.5rem 1rem;
  }

  p:first-child {
    border-bottom: 1px solid var(--color-brand-lightgray);
  }

  p:last-child {
    color: var(--color-error);
  }
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
  setIsModifyOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleComment: (comment: any, postId: number) => void;
  handlePost: (postId: number) => void;
}

export default function PostShow({
  post,
  setIsFormOpen,
  handleComment,
  handlePost,
  setIsModifyOpen,
}: Post) {
  const [comment, setComment] = useState<string>("");
  const [isPrevCommentOpen, setIsPrevCommentOpen] = useState(false);
  const [myInfo, setMyInfo] = useState<any>({});
  const [isModify, setIsModify] = useState<boolean>(false);
  const { user, post: postItem } = post;
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt");

  /* 게시글 삭제 */
  const handleDelete = async (postId: number) => {
    await fetch(`https://dev.risetconstruction.net/board/deleted/${postId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    handlePost(postId);
  };

  /* 게시글 수정 */
  const handleModifyClick = () => {
    setIsModifyOpen(true);
    setIsFormOpen(false);
  };

  /* 댓글 등록 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim()) {
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

  /* 내 정보 가져오기 */
  useEffect(() => {
    fetch("https://dev.risetconstruction.net/preset", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyInfo(data));
  }, []);

  return (
    <Layout>
      <PostWrapper>
        <Header>
          <Title>
            <EmojiIcon />
            {postItem.title}
          </Title>
          <UtilWrapper>
            {Number(userId) === user.employeeNo && (
              <ModifyIcon onClick={() => setIsModify(!isModify)} />
            )}
            <CloseIcon onClick={() => setIsFormOpen(false)} />
            {isModify && (
              <ModDel>
                <p onClick={handleModifyClick}>수정</p>
                <p onClick={() => handleDelete(postItem.id)}>삭제</p>
              </ModDel>
            )}
          </UtilWrapper>
        </Header>
        <Date>{postItem.date.split("T")[0]}</Date>
        <Member>
          <MemberCard
            memberInfo={{
              image: `${user.myImage}`,
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
                  {JSON.parse(com.employee.myImage) ? (
                    <CommentImg src={com.employee.myImage} alt="" />
                  ) : (
                    <Profile />
                  )}
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
        {myInfo.myImage ? <img src={myInfo.myImage} alt="myImage" /> : <Profile />}
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
