import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import React from "react";

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-brand-lightgray);
  border-radius: 30px;
  padding: 0 1rem;
  background-color: var(--color-white);
`;

const SearchIcon = styled(IoSearch)`
  font-size: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  text-indent: 10px;
  border: none;
  outline: none;
`;

interface SearchBarType extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function SearchBar({ name, value, placeholder, onChange }: SearchBarType) {
  return (
    <Layout>
      <SearchIcon />
      <Input type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </Layout>
  );
}
