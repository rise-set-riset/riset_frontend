import { useState , useEffect } from "react";

export function useAgree(): [boolean, boolean, boolean, boolean, (isChecked: boolean) => void]{
  const [agreeAll, setAgreeAll] = useState<boolean>(false);
  const [agreeAge, setAgreeAge] = useState<boolean>(false);
  const [agreeFinal, setAgreeFinal] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const setAgree = (isChecked: boolean) => {
    setAgreeAll(isChecked);
    setAgreeAge(isChecked);
    setAgreeFinal(isChecked);
    setAgreePrivacy(isChecked);
  };


  return [agreeAll, agreeAge, agreeFinal, agreePrivacy, setAgree];
};

