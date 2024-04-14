import styled from "styled-components";
import { ReactComponent as File } from "../../assets/board/file-yellow.svg";
import { ReactComponent as Download } from "../../assets/board/file-download.svg";

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--color-brand-yellow);
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileIcon = styled(File)`
  path {
    stroke: var(--color-white);
  }
`;

const FileName = styled.span`
  margin-left: 1rem;
`;

const DownLoadIcon = styled(Download)``;

export default function FileCard() {
  return (
    <Layout>
      <FileInfo>
        <FileIcon />
        <FileName>첨부된 파일.pdf</FileName>
      </FileInfo>
      <DownLoadIcon />
    </Layout>
  );
}
