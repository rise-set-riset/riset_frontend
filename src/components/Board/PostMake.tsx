import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { FiPaperclip } from "react-icons/fi";
import "quill/dist/quill.snow.css";
import FileCard from "./FileCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.form<{ $isDarkmode: boolean }>`
  width: 90%;
  max-width: 900px;
  border-radius: 1rem;
  border: 1px solid ${(props) => (props.$isDarkmode ? "var(--color-brand-lightgray)" : "none")};
  padding: 1.5rem;
  overflow: hidden;
  background-color: var(--color-white);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-black);
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
  background-color: var(--color-white);
  color: var(--color-black);
`;

const Wysiwyg = styled(ReactQuill)`
  margin-top: 5px;

  .ql-container {
    height: 500px;
  }

  .ql-snow .ql-stroke {
    stroke: var(--color-black) !important;
  }

  .ql-snow .ql-picker {
    color: var(--color-black);
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

const FileIcon = styled(FiPaperclip)<{ $isDarkmode: boolean }>`
  font-size: 1.5rem;
  path {
    stroke: ${(props) => (props.$isDarkmode ? "var(--color-black)" : "var(--color-white)")};
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ButtonSubmit = styled.button<{ $isDarkmode: boolean }>`
  height: 50px;
  border: none;
  border-radius: 0.5rem;
  padding: 0 1rem;
  background-color: var(--color-brand-main);
  font-weight: bold;
  color: ${(props) => (props.$isDarkmode ? "var(--color-black)" : "var(--color-white)")};
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

interface PostMakeType {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handlePostModify: (post: any) => void;
  handlePostRegist: (post: any) => void;
  post?: any;
}

export default function PostMake({
  setIsFormOpen,
  handlePostModify,
  handlePostRegist,
  post,
}: PostMakeType) {
  const [title, setTitle] = useState<string>(post ? post.title : "");
  const [content, setContent] = useState<string>(post ? post.content : "");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const jwt = localStorage.getItem("jwt");
  const { isDarkmode } = useContext(DarkModeContext);

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

    const formData = new FormData();
    formData.append("dto", JSON.stringify(dto));

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    if (post) {
      fetch(`https://dev.risetconstruction.net/board/${post.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          handlePostModify(data);
        });
    } else {
      fetch("https://dev.risetconstruction.net/board", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => handlePostRegist(data));
    }

    setIsFormOpen(false);
  };

  return (
    <Layout onSubmit={handleSubmit} $isDarkmode={isDarkmode}>
      <Header>
        <HeaderTitle>{post ? "게시물 수정" : "게시물 작성"}</HeaderTitle>
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
          <FileIcon onClick={handleFileClick} $isDarkmode={isDarkmode} />
          <FileInput type="file" ref={fileRef} onChange={handleFileUpload} multiple />
        </FileAdd>
        <ButtonSubmit type="submit" $isDarkmode={isDarkmode}>
          등록하기
        </ButtonSubmit>
      </FileAndSubmit>
    </Layout>
  );
}
