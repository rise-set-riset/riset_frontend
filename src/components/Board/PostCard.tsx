import styled, { css } from "styled-components";
import { ReactComponent as File } from "../../assets/board/file-orange.svg";
import { ReactComponent as Minus } from "../../assets/board/minus.svg";
import { ReactComponent as Star } from "../../assets/board/star.svg";
import { Transition } from "react-transition-group";
import { useState } from "react";
import Modal from "../../common/Modal";
import PostShow from "./PostShow";

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

const FileIcon = styled(File)`
  position: absolute;
  right: 0;
  margin: 1.5rem;
  width: 45px;
  height: 45px;

  @media screen and (max-width: 650px) {
    width: 30px;
    height: 30px;
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

const MinusIcon = styled(Minus)<{ $state: string }>`
  ${CommonIcon}
`;

const StarIcon = styled(Star)<{ $state: string }>`
  ${CommonIcon}
`;

interface PostCardType {
  post: any;
  isManageClick: boolean;
  isAllPosts: boolean;
  handleIconClick: (e: React.MouseEvent<SVGElement>, postId: number) => void;
}

export default function PostCard({
  post,
  isManageClick,
  isAllPosts,
  handleIconClick,
}: PostCardType) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, post: postItem } = post;

  /* 날짜 형식 변환 */
  const convertDateTime = (date: string) => {
    return date.split("T")[0];
  };

  return (
    <Layout onClick={() => setIsFormOpen(true)}>
      <Transition in={isManageClick} timeout={300} unmountOnExit mountOnEnter>
        {(state) =>
          isAllPosts ? (
            <StarIcon $state={state} onClick={(e) => handleIconClick(e, post)} />
          ) : (
            <MinusIcon $state={state} onClick={(e) => handleIconClick(e, post.id)} />
          )
        }
      </Transition>
      <Info>
        <Header>
          <EmojiIcon src="/assets/default-emoji.png" />
          <Title>{postItem.title}</Title>
        </Header>
        <Writer>{user.name}</Writer>
        <Date>{convertDateTime(postItem.date)}</Date>
      </Info>
      {postItem.files.length > 0 && <FileIcon />}
      <Modal isModalOpen={isFormOpen} handleIsModalOpen={setIsFormOpen}>
        <PostShow post={post} setIsFormOpen={setIsFormOpen} />
      </Modal>
    </Layout>
  );
}
