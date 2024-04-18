import React, { useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  height: 66px;
  /* position: relative; */
`;

const DropDownButton = styled.button<{ $value: number | string }>`
  width: 100%;
  height: 80%;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$value === 1
        ? "var(--color-black)"
        : props.$value === 2
        ? "var(--color-brand-main)"
        : props.$value === 3
        ? "var(--color-brand-yellow)"
        : "var(--color-brand-lightgray)"};

  text-align: center;
  font-size: 1rem;
  background-color: var(--color-white);
  cursor: pointer;

  color: ${(props) =>
    props.$value === 1 || props.$value === 2 || props.$value === 3
      ? "var(--color-white)"
      : "var(--color-black)"};

  background-color: ${(props) =>
    props.$value === 1
      ? "var(--color-black)"
      : props.$value === 2
      ? "var(--color-brand-main)"
      : props.$value === 3
      ? "var(--color-brand-yellow)"
      : "var(--color-white)"};

  &:focus {
    outline: 1px solid var(--color-brand-main);
    border: none;
  }
`;

const DropdownDepart = styled.ul`
  position: absolute;
  top: 4rem;
  right: 1px;
  width: 7.5rem;
  padding: 0.5rem 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
  li {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

interface DropDownProps {
  main: string | number;
  dropList: string[] | number[];
  handleSyncData: (value: number | string) => void;
}

export default function DropDown({
  main,
  dropList,
  handleSyncData,
}: DropDownProps) {
  const [value, setValue] = useState<string | number>(main);
  const [isOpenDepart, setIsOpenDepart] = useState<boolean>(false);

  const handleChageDepart = (name: string | number) => {
    setValue(name);
    setIsOpenDepart(false);
    handleSyncData(name);
  };

  return (
    <Layout>
      <DropDownButton
        onClick={() => setIsOpenDepart(!isOpenDepart)}
        $value={value}
      >
        {value}
      </DropDownButton>
      {isOpenDepart && (
        <DropdownDepart>
          {dropList.map((item, index) => (
            <li key={index} onClick={() => handleChageDepart(item)}>
              {item}
            </li>
          ))}
        </DropdownDepart>
      )}
    </Layout>
  );
}
