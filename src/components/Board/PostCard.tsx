import styled, { css } from "styled-components";
import { Transition } from "react-transition-group";
import { useContext, useState } from "react";
import Modal from "../../common/Modal";
import PostShow from "./PostShow";
import { FiPaperclip } from "react-icons/fi";
import { TiStarFullOutline } from "react-icons/ti";
import { LuMinus } from "react-icons/lu";
import { FcDocument } from "react-icons/fc";
import PostMake from "./PostMake";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.div<{ $isDarkmode: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.$isDarkmode ? "var(--color-brand-darkgray)" : "var(--color-white)"};
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

const EmojiIcon = styled(FcDocument)`
  font-size: 1.2rem;
  margin-right: 0.3rem;
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
  handleCommentRegist: (comment: any, postId: number) => void;
  handleCommentDelete: (commentId: number) => void;
  handlePostModify: (post: any) => void;
  handleAllPostDelete: (postId: number) => void;
  handlePostRegist?: (post: any) => void;
  handleFavoritePostRegist?: (post: any) => void;
  handleFavoritePostDelete?: (postId: number) => void;
  handleFavoriteIsPostExists?: (postId: number) => boolean;
}

export default function PostCard({
  post,
  isAllPosts,
  isManageClick,
  handleCommentRegist,
  handleCommentDelete,
  handleAllPostDelete,
  handlePostRegist,
  handlePostModify,
  handleFavoritePostRegist,
  handleFavoritePostDelete,
  handleFavoriteIsPostExists,
}: PostCardType) {
  const [isPostShowOpen, setIsPostShowOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
  const { isDarkmode } = useContext(DarkModeContext);
  const { user, post: postItem } = post;
  const jwt = localStorage.getItem("jwt");

  /* 즐겨찾기 추가 */
  const handleRegistFavorite = async (
    e: React.MouseEvent<SVGElement>,
    post: any
  ) => {
    e.stopPropagation();

    if (handleFavoriteIsPostExists) {
      const isExists = handleFavoriteIsPostExists(post.post.id);

      // 즐겨찾기 목록에 없을 경우에만 추가
      if (!isExists) {
        // await fetch(`https://dev.risetconstruction.net/board/favorite/${post.post.id}`, {
        await fetch(
          `http://43.203.11.249:8080/board/favorite/${post.post.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (handleFavoritePostRegist) {
          handleFavoritePostRegist(post);
        }
      }
    }
  };

  /* 즐겨찾기 삭제 */
  const handleDeleteFavorite = async (
    e: React.MouseEvent<SVGElement>,
    post: any
  ) => {
    e.stopPropagation();

    await fetch(
      // `https://dev.risetconstruction.net/board/favorite/delete/${post.id}`,
      `http://43.203.11.249:8080/board/favorite/delete/${post.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (handleFavoritePostDelete) {
      handleFavoritePostDelete(post.post.id);
    }
  };

  return (
    <Layout onClick={() => setIsPostShowOpen(true)} $isDarkmode={isDarkmode}>
      <Transition in={isManageClick} timeout={300} unmountOnExit mountOnEnter>
        {(state) =>
          isAllPosts ? (
            <StarIcon
              $state={state}
              onClick={(e) => handleRegistFavorite(e, post)}
            />
          ) : (
            <MinusWrapper $state={state}>
              <MinusIcon onClick={(e) => handleDeleteFavorite(e, post)} />
            </MinusWrapper>
          )
        }
      </Transition>

      <Info>
        <Header>
          <EmojiIcon />
          <Title>{postItem?.title}</Title>
        </Header>
        <Writer>{user?.name}</Writer>
        <Date>{postItem?.date.split("T")[0]}</Date>
      </Info>

      {postItem?.files.length > 0 && (
        <FileWrapper>
          <FileIcon />
        </FileWrapper>
      )}

      <Modal isModalOpen={isPostShowOpen} handleIsModalOpen={setIsPostShowOpen}>
        <PostShow
          post={post}
          setIsFormOpen={setIsPostShowOpen}
          setIsModifyOpen={setIsModifyModalOpen}
          handleCommentRegist={handleCommentRegist}
          handleCommentDelete={handleCommentDelete}
          handleAllPostDelete={handleAllPostDelete}
        />
      </Modal>

      <Modal
        isModalOpen={isModifyModalOpen}
        handleIsModalOpen={setIsModifyModalOpen}
      >
        <PostMake
          setIsFormOpen={setIsModifyModalOpen}
          handlePostModify={handlePostModify}
          handlePostRegist={handlePostRegist ? handlePostRegist : () => {}}
          post={postItem}
        />
      </Modal>
    </Layout>
  );
}
