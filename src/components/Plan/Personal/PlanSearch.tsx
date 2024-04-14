import React, { useState } from "react";
import SearchBar from "../../../common/SearchBar";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

/* 전체 레이아웃 */
const Layout = styled.div`
  width: 50%;
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 1rem;
`;

/* 검색 기준 필터 */
const SearchFilter = styled.button`
  position: relative;
  width: 8rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 20px;
  border: 1px solid var(--color-brand-lightgray);
  background-color: var(--color-white);
  cursor: pointer;
`;

const ArrowIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

/* 검색 기준 필터 드롭다운 메뉴 */
const DropMenu = styled.ul`
  z-index: 5;
  position: absolute;
  top: 40px;
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 16px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  li {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

interface PlanSearchProps {
  /* 선택한 날짜 상태값 */
  currentDate: Date;
}

export default function PlanSearch({ currentDate }: PlanSearchProps) {
  /* 
  searchWord: 검색어
  isFilterOpen: 검색 기준 필터 드롭다운 표시 여부
  filterCategory: 검색 기준
  */
  const [searchWord, setSearchWord] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>("이름");

  /* 검색어 변경 */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  /* 검색 기준 변경*/
  const handleFilterCategory = (category: string) => {
    setIsFilterOpen(false);
    setFilterCategory(category);
  };

  return (
    <Layout>
      {/* 검색 기준 필터 */}
      <SearchFilter
        type="button"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div>{filterCategory}</div>
        <ArrowIcon>
          {isFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </ArrowIcon>

        {/* 검색 기준 선택 드롭다운 메뉴 */}
        {isFilterOpen && (
          <DropMenu>
            <li onClick={() => handleFilterCategory("이름")}>이름</li>
            <li onClick={() => handleFilterCategory("부서")}>부서</li>
          </DropMenu>
        )}
      </SearchFilter>

      {/* 검색바 */}
      <SearchBar
        name={"search-plan"}
        value={searchWord}
        placeholder="이름 검색"
        onChange={handleSearch}
        autoComplete={"on"}
      />
    </Layout>
  );
}