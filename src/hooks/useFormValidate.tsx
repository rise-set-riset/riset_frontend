import { useState, useEffect } from "react";

interface FormState {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
}

export const useFormValidate = (
  form: FormState
): {
  isValidId: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
  isValidName: boolean;
  isValidPhoneNumber: boolean;
  handleIdBlur: () => void;
  handlePasswordBlur: () => void;
  handleConfirmPasswordBlur: () => void;
  handleNameBlur: () => void;
  handlePhoneNumberBlur: () => void;
} => {
  const [isValidId, setIsValidId] = useState<boolean>(false);

  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>(false);
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(false);

  // 아이디 유효성 검사
  const handleValidateId = (input: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,15}$/;
    return regex.test(input);
  };

  // 비밀번호 유효성 검사
  const handleValidatePassword = (input: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,12}$/;
    return regex.test(input);
  };

  // 이름 유효성 검사
  const handleValidateName = (input: string): boolean => {
    const regex = /^[가-힣]{2,6}$/;
    return regex.test(input);
  };

  // 전화번호 유효성 검사
  const handleValidatePhoneNumber = (input: string): boolean => {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(input);
  };

  // 아이디 입력 필드가 포커스를 잃었을 때, handleValidateId 통해 아이디의 유효성을 검사하고, isValidId 상태를 업데이트
  const handleIdBlur = () => {
    setIsValidId(handleValidateId(form.id));
  };

  // 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidatePassword 통해 아이디의 유효성을 검사하고, isValidPassword 상태를 업데이트
  const handlePasswordBlur = () => {
    setIsValidPassword(handleValidatePassword(form.password));
  };

  // 비밀번호 입력 필드가 포커스를 잃었을 때, 비밀번호 값과 비밀번호 확인 값이 같으면, isValidConfirmPassword 상태를 업데이트
  const handleConfirmPasswordBlur = () => {
    setIsValidConfirmPassword(
      form.confirmPassword === form.password && isValidPassword
    );
  };

  // 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidateName 통해 아이디의 유효성을 검사하고, isValidName 상태를 업데이트
  const handleNameBlur = () => {
    setIsValidName(handleValidateName(form.name));
  };

  // 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidatePhoneNumber 통해 아이디의 유효성을 검사하고, isValidPhoneNumber 상태를 업데이트
  const handlePhoneNumberBlur = () => {
    setIsValidPhoneNumber(handleValidatePhoneNumber(form.phoneNumber));
  };

  useEffect(() => {
    setIsValidId(handleValidateId(form.id));
    setIsValidPassword(handleValidatePassword(form.password));
    setIsValidName(handleValidateName(form.name));
    setIsValidPhoneNumber(handleValidatePhoneNumber(form.phoneNumber));
  }, [form.id, form.password, form.name, form.phoneNumber]);

  return {
    isValidId,
    isValidPassword,
    isValidConfirmPassword,
    isValidName,
    isValidPhoneNumber,
    handleIdBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleNameBlur,
    handlePhoneNumberBlur,
  };
};
