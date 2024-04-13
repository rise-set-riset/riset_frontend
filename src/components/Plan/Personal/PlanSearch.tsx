import React, { useState } from "react";
import SearchBar from "../../../common/SearchBar";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Layout = styled.div`
  width: 50%;
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 1rem;
`;

const SearchFilter = styled.button`
  width: 8rem;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid var(--color-brand-lightgray);
  background-color: var(--color-white);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
`;

const ArrowIcon = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropMenu = styled.ul`
  position: absolute;
  top: 40px;
  width: 100%;
  height: 5rem;
  padding: 0.5rem;
  background-color: var(--color-white);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
  z-index: 5;

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
  currentDate: Date;
}

export default function PlanSearch({ currentDate }: PlanSearchProps) {
  const [searchWord, setSearchWord] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>("이름");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleFilterCategory = (category: string) => {
    setIsFilterOpen(false);
    setFilterCategory(category);
  };

  return (
    <Layout>
      <SearchFilter
        type="button"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <div>{filterCategory}</div>
        <ArrowIcon>
          {isFilterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </ArrowIcon>

        {isFilterOpen && (
          <DropMenu>
            <li onClick={() => handleFilterCategory("이름")}>이름</li>
            <li onClick={() => handleFilterCategory("부서")}>부서</li>
          </DropMenu>
        )}
      </SearchFilter>

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
