import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React from "react";
import MemberCard from "../../common/MemberCard";
import FileCard from "./FileCard";

const Layout = styled.form`
  width: 900px;
  min-height: 900px;
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
`;

const PostWrapper = styled.div`
  width: 100%;
  padding: 1.5rem;
`;

const CommentWrapper = styled.div`
  width: 100%;
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
  height: 500px;
  padding: 2rem 1rem;
  border: 1px solid black;
`;

interface Post {
  post: any;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostShow({ post, setIsFormOpen }: Post) {
  return (
    <Layout>
      <PostWrapper>
        <Header>
          <Title>
            <EmojiIcon src="/assets/default-emoji.png" alt="emoji" />
            {post.title}
          </Title>
          <div>
            <ModifyIcon />
            <CloseIcon onClick={() => setIsFormOpen(false)} />
          </div>
        </Header>
        <Date>2024.04.10</Date>
        <Member>
          <MemberCard
            memberInfo={{
              image: "/assets/default-emoji.png",
              alt: "이미지",
              name: "손다니엘",
              rank: "사원",
              department: "개발팀",
              position: "프론트",
            }}
          />
        </Member>
        <Content>내용이 들어갈 부분입니다.</Content>
        <FileCard />
      </PostWrapper>
      <CommentWrapper>
        <div>댓글 0개</div>
      </CommentWrapper>
    </Layout>
  );
}
