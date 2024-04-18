import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ArrowButton = styled.button`
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  cursor: pointer;
  svg {
    color: var(--color-black);
  }
`;

const PageButton = styled.button`
  border: none;
  background-color: var(--color-white);
  color: var(--color-brand-lightgray);
  font-size: 1rem;
  width: 40px;
  height: 40px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  cursor: pointer;
  svg {
    color: var(--color-black);
  }

  &:active {
    background-color: var(--color-brand-main);
    color: var(--color-white);
  }
  .active {
    background-color: var(--color-brand-main);
    color: var(--color-white);
  }
`;

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <PageButton
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </PageButton>
      );
    }
    return paginationButtons;
  };

  return (
    <Layout>
      <ArrowButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </ArrowButton>
      {renderPaginationButtons()}
      <ArrowButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </ArrowButton>
    </Layout>
  );
}
