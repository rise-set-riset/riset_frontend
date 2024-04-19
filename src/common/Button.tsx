import React from "react";
import styled from "styled-components";

const Layout = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: 1px solid var(--color-brand-main);
  border-radius: 8px;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${(props) => (props.$active ? "var(--color-white)" : "var(--color-brand-main)")};
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-main)" : "var(--color-white)"};
  cursor: pointer;

  &:hover {
    transition: transform 0.3s;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: var(--color-brand-lightgray);
    border-color: var(--color-brand-lightgray);
    color: var(--color-white);
    cursor: not-allowed;
    pointer-events: none;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  title: string;
  isInRange?: boolean;
  handleBtnClick?: () => void;
}

export default function Button({ type, active, title, disabled, handleBtnClick }: ButtonProps) {
  return (
    <Layout
      type={type}
      className="custom-button"
      $active={active}
      disabled={disabled}
      onClick={handleBtnClick}
    >
      {title}
    </Layout>
  );
}
