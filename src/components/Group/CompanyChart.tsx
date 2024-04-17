import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const GroupTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 800px;

  svg {
    position: absolute;
    font-size: 2rem;
    right: 0;
  }
`;

const GroupImage = styled.div`
  width: 100%;
  max-width: 800px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 1rem;
  border: 1px solid var(--color-brand-lightgray);
  margin-top: 1rem;

  @media screen and (max-width: 599px) {
    height: 500px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlusIcon = styled(CiCirclePlus)`
  font-size: 4rem;
`;

const FileInput = styled.input`
  display: none;
`;

export default function CompanyChart() {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const [previewImg, setPreviewImg] = useState<string>();

  /* +버튼 클릭 시 이미지 input 클릭 */
  const handleAddClick = () => {
    if (imageRef.current) imageRef.current.click();
  };

  /* 이미지 미리보기 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setFile(files[0]);

      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImg(reader.result as string);
        }
      };
    }
  };

  /* 회사정보 받아오기 (회사명, 이미지) */
  useEffect(() => {}, []);

  /* 이미지 업로드 */
  useEffect(() => {
    // 업로드
    fetch("/url").then((res) => res.json());
    // fetch로 가져오기
  }, []);

  return (
    <Layout>
      <GroupTitle>
        <h2>(주) Riset Company</h2>
        <CiCirclePlus onClick={handleAddClick} />
      </GroupTitle>
      <GroupImage>
        {previewImg ? (
          <ImagePreview src={previewImg} alt="" />
        ) : (
          <>
            <PlusIcon onClick={handleAddClick} />
            <h2>이미지를 업로드하세요</h2>
          </>
        )}
      </GroupImage>
      <FileInput type="file" ref={imageRef} onChange={handleFileChange} />
    </Layout>
  );
}
