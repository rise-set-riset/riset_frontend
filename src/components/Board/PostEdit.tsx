import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import React from "react";

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

interface Post {
  post: any;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostEdit({ post, setIsFormOpen }: Post) {
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
      </PostWrapper>
      <CommentWrapper></CommentWrapper>
    </Layout>
  );
}
