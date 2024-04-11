import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const Layout = styled.label`
  cursor: pointer;
  [type="radio"] {
    appearance: none;
    vertical-align: middle;
    border: 2px solid var(--color-black);
    border-radius: 50%;
    width: 1.25em;
    height: 1.25em;
    margin-right: 8px;
    transition: box-shadow 0.3s;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }

  [type="radio"]:checked {
    background-color: var(--color-brand-main);
    border: none;
  }

  [type="radio"]:hover {
    box-shadow: 0 0 0 4px var(--color-brand-lightgray);
    cursor: pointer;
  }

  span {
    vertical-align: middle;
  }
`;

export default function RadioButton({ name, title }: RadioButtonProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <Layout>
      <input
        type="radio"
        name={name}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <span>{title}</span>
    </Layout>
  );
}
