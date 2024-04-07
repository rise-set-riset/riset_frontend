import { useState } from "react";

export function useAgree(): [boolean, boolean, boolean, boolean, (isChecked: boolean) => void, (isChecked: boolean) => void, (isChecked: boolean) => void, (isChecked: boolean) => void, (isChecked: boolean) => void] {
  const [agreeAll, setAgreeAll] = useState<boolean>(false);
  const [agreeAge, setAgreeAge] = useState<boolean>(false);
  const [agreeFinal, setAgreeFinal] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

// 전체 동의 체크박스의 상태를 설정, 전체 동의 체크되면 나머지도 다 체크
  const setAgree = (isChecked: boolean) => {
    setAgreeAll(isChecked);
    if (isChecked) {
      setAgreeAge(true);
      setAgreeFinal(true);
      setAgreePrivacy(true);
    }
  };

// 나이 체크되면, 전체동의 해제
  const setAgreeAgeStatus = (isChecked: boolean) => {
    setAgreeAge(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

// 최종이용자 체크되면, 전체동의 해제
  const setAgreeFinalStatus = (isChecked: boolean) => {
    setAgreeFinal(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

// 개인정보 체크되면, 전체동의 해제
  const setAgreePrivacyStatus = (isChecked: boolean) => {
    setAgreePrivacy(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

  return [agreeAll, agreeAge, agreeFinal, agreePrivacy, setAgree, setAgreeAll, setAgreeAgeStatus, setAgreeFinalStatus, setAgreePrivacyStatus];
}