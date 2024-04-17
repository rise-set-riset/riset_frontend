import styled from "styled-components";
import { TfiDownload } from "react-icons/tfi";
import { FiPaperclip } from "react-icons/fi";

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

const File = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  border: 2px solid var(--color-white);
`;

const FileIcon = styled(FiPaperclip)`
  font-size: 1.5rem;
  path {
    stroke: var(--color-white);
  }
`;

const FileName = styled.span`
  margin-left: 1rem;
`;

const DownLoadIcon = styled(TfiDownload)`
  font-size: 1.5rem;
`;

interface FileType {
  fileName: string;
  fileUrl?: string;
}

export default function FileCard({ fileName, fileUrl }: FileType) {
  /* 파일 다운로드 */
  const handleDownload = async (fileUrl: string, fileName: string) => {
    const jwt = localStorage.getItem("jwt");

    await fetch(fileUrl, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const aEle = document.createElement("a");

        aEle.href = blobUrl;
        aEle.download = fileName;
        aEle.click();
        aEle.remove();
      });
  };

  return (
    <Layout>
      <FileInfo>
        <File>
          <FileIcon />
        </File>
        <FileName>{fileName}</FileName>
      </FileInfo>
      {fileUrl && (
        <DownLoadIcon onClick={() => handleDownload(fileUrl, fileName)} />
      )}
    </Layout>
  );
}
