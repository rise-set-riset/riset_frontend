import styled, { css } from "styled-components";
import { Transition } from "react-transition-group";
import { useState } from "react";
import Modal from "../../common/Modal";
import PostShow from "./PostShow";
import { FiPaperclip } from "react-icons/fi";
import { TiStarFullOutline } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";

const Layout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  > p {
    color: var(--color-brand-lightgray);
  }

  path {
    stroke: var(--color-white);
  }
`;

const Info = styled.div`
  transition: all;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const EmojiIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Title = styled.h3`
  width: 180px;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (min-width: 800px) and (max-width: 1023px) {
    width: 370px;
  }
`;

const Writer = styled.p`
  font-weight: bold;
  margin-top: 4px;
`;

const Date = styled.p`
  font-size: 14px;
  margin-top: 8px;
`;

const FileWrapper = styled.div`
  position: absolute;
  right: 1rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: var(--color-brand-main);

  @media screen and (max-width: 650px) {
    width: 30px;
    height: 30px;
  }
`;

const FileIcon = styled(FiPaperclip)`
  font-size: 1.5rem;

  @media screen and (max-width: 650px) {
    font-size: 1.1rem;
  }
`;

const CommonIcon = css<{ $state: string }>`
  margin-right: 0.5rem;
  transition: 0.3s;
  ${(props) => {
    switch (props.$state) {
      case "entering":
        return css`
          opacity: 1;
          transform: translateX(0);
        `;
      case "entered":
        return css`
          opacity: 1;
          transform: translateX(0);
        `;
      case "exiting":
        return css`
          opacity: 0;
          transform: translateX(-100%);
        `;
      case "exited":
        return css`
          opacity: 0;
          transform: translateX(-100%);
        `;
    }
  }}
`;

const MinusWrapper = styled.div<{ $state: string }>`
  ${CommonIcon}
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-error);
`;

const MinusIcon = styled(LuMinus)`
  font-size: 1.3rem;
  color: var(--color-white);
`;

const StarIcon = styled(TiStarFullOutline)<{ $state: string }>`
  ${CommonIcon}
  font-size: 1.5rem;
  color: var(--color-brand-yellow);
`;

interface PostCardType {
  post: any;
  isManageClick: boolean;
  isAllPosts: boolean;
  handleIconClick: (e: React.MouseEvent<SVGElement>, postId: number) => void;
  handleComment: (comment: any, postId: number) => void;
}

export default function PostCard({
  post,
  isManageClick,
  isAllPosts,
  handleIconClick,
  handleComment,
}: PostCardType) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, post: postItem } = post;

  return (
    <Layout onClick={() => setIsFormOpen(true)}>
      <Transition in={isManageClick} timeout={300} unmountOnExit mountOnEnter>
        {(state) =>
          isAllPosts ? (
            <StarIcon $state={state} onClick={(e) => handleIconClick(e, post)} />
          ) : (
            <MinusWrapper $state={state}>
              <MinusIcon onClick={(e) => handleIconClick(e, post.id)} />
            </MinusWrapper>
          )
        }
      </Transition>
      <Info>
        <Header>
          <EmojiIcon src="/assets/default-emoji.png" />
          <Title>{postItem.title}</Title>
        </Header>
        <Writer>{user.name}</Writer>
        <Date>{postItem.date.split("T")[0]}</Date>
      </Info>
      {postItem.files.length > 0 && (
        <FileWrapper>
          <FileIcon />
        </FileWrapper>
      )}
      <Modal isModalOpen={isFormOpen} handleIsModalOpen={setIsFormOpen}>
        <PostShow post={post} setIsFormOpen={setIsFormOpen} handleComment={handleComment} />
      </Modal>
    </Layout>
  );
}
