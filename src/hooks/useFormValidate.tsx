import { useState, useEffect } from 'react';

interface FormState {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
}

export const useFormValidate = (form: FormState): {
  isValidId: boolean;
  isCheckingDuplicate: boolean;
  duplicateMessage: string;
  isNotDuplicate: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
  isValidName: boolean;
  isValidPhoneNumber: boolean;
  handleIdBlur: () => void;
  handlePasswordBlur: () => void;
  handleConfirmPasswordBlur: () => void;
  handleNameBlur: () => void;
  handlePhoneNumberBlur: () => void;
  handleCheckDuplicateId: () => void;
} => {
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState<boolean>(false);
  const [isNotDuplicate, setIsNotDuplicate] = useState<boolean>(false);
  const [duplicateMessage, setDuplicateMessage] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false);
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

// 아이디 입력 필드가 포커스를 잃었을 때, handleValidateId 함수를 통해 아이디의 유효성을 검사하고, 그 결과에 따라 isValidId 상태를 업데이트
  const handleIdBlur = () => {
    setIsValidId(handleValidateId(form.id));
  };

// 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidatePassword 함수를 통해 아이디의 유효성을 검사하고, 그 결과에 따라 isValidPassword 상태를 업데이트
  const handlePasswordBlur = () => {
    setIsValidPassword(handleValidatePassword(form.password));
  };

// 비밀번호 입력 필드가 포커스를 잃었을 때, 비밀번호 값과 비밀번호 확인 값이 같으면, 그 결과에 따라 isValidConfirmPassword 상태를 업데이트
  const handleConfirmPasswordBlur = () => {
    setIsValidConfirmPassword(form.confirmPassword === form.password && isValidPassword);
  };
  
// 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidateName 함수를 통해 아이디의 유효성을 검사하고, 그 결과에 따라 isValidName 상태를 업데이트
  const handleNameBlur = () => {
    setIsValidName(handleValidateName(form.name));
  };
  

// 비밀번호 입력 필드가 포커스를 잃었을 때,handleValidatePhoneNumber 함수를 통해 아이디의 유효성을 검사하고, 그 결과에 따라 isValidPhoneNumber 상태를 업데이트
  const handlePhoneNumberBlur = () => {
    setIsValidPhoneNumber(handleValidatePhoneNumber(form.phoneNumber));
  };

// fetch를 사용하여 서버에 아이디 중복을 확인 요청. 서버에서는 요청을 받아 아이디 중복 여부를 판단한 후 응답을 반환. 응답을 처리하여 중복된 아이디인지 아닌지를 확인하고, 그에 따라 상태를 업데이트하고 에러 메시지를 설정
  const handleCheckDuplicateId = async () => {
    try {
      const response = await fetch(`/api/checkDuplicateId?id=${form.id}`);
      const data = await response.json();
      
      if (response.ok) {
        if (data.isDuplicate) {
         setIsNotDuplicate(false);
         setDuplicateMessage('이미 사용 중인 아이디입니다');
        } else {
          setIsNotDuplicate(true);
          setDuplicateMessage('사용 가능한 아이디 입니다');
        }
      } else {
        console.error('Failed to check duplicate id:', response.statusText);
      }
    } catch (error) {
      console.error('Error checking duplicate id:', error);
    }
  };

  useEffect(() => {
    setIsValidId(handleValidateId(form.id));
    setIsValidPassword(handleValidatePassword(form.password));
    setIsValidName(handleValidateName(form.name));
    setIsValidPhoneNumber(handleValidatePhoneNumber(form.phoneNumber));
  }, [form.id, form.password, form.name, form.phoneNumber]);

  return {
    isValidId,
    isCheckingDuplicate,
    duplicateMessage,
    isNotDuplicate,
    isValidPassword,
    isValidConfirmPassword,
    isValidName,
    isValidPhoneNumber,
    handleIdBlur,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleNameBlur,
    handlePhoneNumberBlur,
    handleCheckDuplicateId
  };
};