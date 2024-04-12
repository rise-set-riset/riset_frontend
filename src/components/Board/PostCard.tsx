import styled from "styled-components";
import { ReactComponent as File } from "../../assets/board/file.svg";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 1.5rem;
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
  width: 250px;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  margin: 1rem;
`;

interface PostCardType {
  title: string;
  writer: string;
  date: string;
  fileCnt: string;
}

export default function PostCard({ title, writer, date, fileCnt }: PostCardType) {
  return (
    <Layout>
      <div>
        <Header>
          <EmojiIcon src="/assets/default-emoji.png" />
          <Title>{title}</Title>
        </Header>
        <Writer>{writer}</Writer>
        <Date>{date}</Date>
      </div>
      {+fileCnt > 0 && <FileIcon />}
    </Layout>
  );
}
