import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import React, { ChangeEvent, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { FiPaperclip } from "react-icons/fi";
import "quill/dist/quill.snow.css";
import FileCard from "./FileCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Layout = styled.form`
  width: 90%;
  max-width: 900px;
  border-radius: 1rem;
  padding: 1.5rem;
  overflow: hidden;
  background-color: var(--color-white);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  display: flex;
  align-items: center;
`;

const CloseIcon = styled(IoClose)`
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 8px 0;
  font-size: 1.5rem;
  margin-top: 40px;
  outline: none;
  border: none;
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const Wysiwyg = styled(ReactQuill)`
  margin-top: 5px;

  .ql-container {
    height: 500px;
  }
`;

const SwiperWrapper = styled(Swiper)`
  margin-top: 1rem;
`;

const FileAndSubmit = styled.div`
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  background-color: var(--color-gray-1);
`;

const FileAdd = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: var(--color-brand-main);
`;

const FileIcon = styled(FiPaperclip)`
  font-size: 1.5rem;
  path {
    stroke: var(--color-white);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonSubmit = styled.button`
  height: 50px;
  border: none;
  border-radius: 0.5rem;
  padding: 0 1rem;
  background-color: var(--color-brand-main);
  color: var(--color-white);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

interface PostMakeType {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePostAdd: (post: any) => void;
}

export default function PostMake({ setIsFormOpen, handlePostAdd }: PostMakeType) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  /* react-quill 설정 */
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  /* Custom File Icon 클릭 */
  const handleFileClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  /* 파일 세팅 */
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setFiles(Array.from(files));
  };

  /* 게시글 등록 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dto = {
      title: title,
      content: content,
    };

    const jwt = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("dto", JSON.stringify(dto));

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    fetch("https://dev.risetconstruction.net/board", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => handlePostAdd(data));

    setIsFormOpen(false);
  };

  return (
    <Layout onSubmit={handleSubmit}>
      <Header>
        <HeaderTitle>게시물 작성</HeaderTitle>
        <CloseIcon onClick={() => setIsFormOpen(false)} />
      </Header>

      <TitleInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />

      <Wysiwyg modules={modules} theme="snow" value={content} onChange={setContent} />

      <SwiperWrapper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{ 600: { slidesPerView: 2 }, 900: { slidesPerView: 3 } }}
      >
        {files.length > 0 &&
          files.map((file, idx) => (
            <SwiperSlide key={idx}>
              <FileCard fileName={file.name} />
            </SwiperSlide>
          ))}
      </SwiperWrapper>

      <FileAndSubmit>
        <FileAdd>
          <FileIcon onClick={handleFileClick} />
          <FileInput type="file" ref={fileRef} onChange={handleFileUpload} multiple />
        </FileAdd>
        <ButtonSubmit type="submit">등록하기</ButtonSubmit>
      </FileAndSubmit>
    </Layout>
  );
}
