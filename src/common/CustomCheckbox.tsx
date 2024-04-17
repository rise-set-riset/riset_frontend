import styled from "styled-components";

const InputCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #353535;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s;
  margin: 0px 5px 0px 0px;

  &:checked,
  &:active {
    border-color: transparent;
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='coral' d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z'/%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m7 12 3.5 3.5L17 9'/%3E%3C/svg%3E"); */
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #ff7f50;
  }
`;

interface CheckboxProps {
  isChecked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | (() => void);
}

export default function CustomCheckbox({ isChecked, onChange }: CheckboxProps) {
  return (
    <InputCheckbox
      type="checkbox"
      className="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
  );
}
