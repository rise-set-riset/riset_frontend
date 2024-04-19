import React, { useEffect, useState, ChangeEvent } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import styled from "styled-components";

interface TextInputProps {
  label?: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder: string;
  helperText?: string;
  isValid?: boolean;
  isValidatingCode?: boolean;
  validMessage?: string;
  inValidMessage?: string;
  isNotDuplicate?: boolean;
  duplicateMessage?: string;
}

const Input = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 16px;

  label {
    font-family: Pretendard;
    font-weight: bold;
    font-size: 14px;
    color: #353535;
    letter-spacing: 0.1px;
  }

  input {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #c4c4c4;
    padding: 13px 20px;
    color: #353535;
    font-size: 16px;
    letter-spacing: 0.5px;
    margin-top: 4px;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
  }

  .icon.valid {
    color: #03ca5f;
    width: 20px;
    height: 20px;
  }

  .icon.invalid {
    color: #ff6228;
    width: 20px;
    height: 20px;
  }
`;

const HelperText = styled.p`
  margin-top: 4px;
  color: #353535;
  font-size: 12px;
`;

const InvalidMsg = styled.p`
  margin-top: 4px;
  color: #ff6228;
  font-size: 12px;
`;

const ValidMsg = styled.p`
  margin-top: 4px;
  color: #03ca5f;
  font-size: 12px;
`;

export default function TextInput({
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  isValid,
  isValidatingCode,
  validMessage,
  inValidMessage,
  helperText,
  isNotDuplicate,
  duplicateMessage,
}: TextInputProps) {
  const [isFirstBlur, setIsFirstBlur] = useState<boolean>(true);
  const [isHelperTextVisible, setIsHelperTextVisible] = useState<boolean>(true);
  const [isDuplicateChecking, setIsDuplicateChecking] =
    useState<boolean>(false);

  // 부모 컴포넌트에서 전달된 onBlur 이벤트 핸들러를 호출하고, 입력 필드가 포커스를 잃었음을 나타내는 상태를 업데이트하여 helperText를 숨기는 역할
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
      setIsFirstBlur(false);
      setIsHelperTextVisible(false);
    }
  };
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (label === "아이디" && isValid) {
      setIsHelperTextVisible(false);
    }
  };

  // 아이디 입력값이 변경되었을 때, 아이디 유효성 검사를 수행하고 중복 확인 상태를 초기화합니다.
  useEffect(() => {
    setIsDuplicateChecking(false);
  }, [value]);

  return (
    <Input>
      <label>{label}</label>
      <div>
        <input
          type={type}
          value={value}
          onChange={label !== "아이디" ? onChange : handleIdChange}
          onBlur={onBlur ? handleBlur : undefined}
          placeholder={placeholder}
          className={!isValid && !isFirstBlur ? "invalid" : ""}
        />

        {isHelperTextVisible && helperText && (
          <HelperText>{helperText}</HelperText>
        )}

        {isValid && value && label === "아이디" && !isHelperTextVisible && (
          <>
            <ValidMsg style={{ color: "#ff6228" }}>{validMessage}</ValidMsg>
          </>
        )}

        {/* {isNotDuplicate && duplicateMessage && (
          <>
            <span className="icon invalid">
              <FaCircleExclamation />
            </span>
            <InvalidMsg>{duplicateMessage}</InvalidMsg>
          </>
        )}
        {!isNotDuplicate && duplicateMessage && (
          <>
            <span className="icon valid">
              <FaCheckCircle />
            </span>
            <ValidMsg>{duplicateMessage}</ValidMsg>
          </>
        )} */}

        {!isValid && !isFirstBlur && (
          <>
            <span className="icon invalid">
              <FaCircleExclamation />
            </span>
            <InvalidMsg>{inValidMessage}</InvalidMsg>
          </>
        )}

        {isValid && value && label === "비밀번호 확인" && (
          <>
            <span className="icon valid">
              <FaCheckCircle />
            </span>
            <ValidMsg>{validMessage}</ValidMsg>
          </>
        )}

        {!isValid && !isFirstBlur && (
          <>
            <span className="icon invalid">
              <FaCircleExclamation />
            </span>
            <InvalidMsg>{inValidMessage}</InvalidMsg>
          </>
        )}

        {!isValid && value && label === "코드" && isValidatingCode && (
          <>
            <span className="icon valid">
              <FaCheckCircle />
            </span>
            <ValidMsg>{validMessage}</ValidMsg>
          </>
        )}

        {isValid && value && label === "코드" && isValidatingCode && (
          <>
            <span className="icon invalid">
              <FaCircleExclamation />
            </span>
            <InvalidMsg>{inValidMessage}</InvalidMsg>
          </>
        )}
      </div>
    </Input>
  );
}
