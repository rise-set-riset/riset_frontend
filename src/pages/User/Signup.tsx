import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { useAgree } from "../../hooks/useAgree";
import { useForm } from "../../hooks/useForm";
import { useFormValidate } from "../../hooks/useFormValidate";
import TextInput from "../../common/TextInput";
import CustomCheckbox from "../../common/CustomCheckbox";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";


const backgroundImageUrl = 'url(https://img.freepik.com/free-vector/hand-drawn-tropical-sunset-background_23-2150681585.jpg?w=996&t=st=1712473475~exp=1712474075~hmac=d3dcf0e06d62027cb03eeb3a6a7c0ca87245777567f926b2a09b7c954f523ad2)';

const Background = styled.div`
  min-width: 100vw;
  width: 100%;
  background-image: ${backgroundImageUrl};
  background-size: cover; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
  width: 90%;
  max-width: 519px;
  max-height: 1036px;
  margin: 70px auto; 
  padding: 40px 20px;
  background-color: #FFFFFF;
  opacity: 0.8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupHeader = styled.div`
 
p:first-child{  
  text-align: center;
  font-size: 32px;
  font-family : Pretendard;
  font-weight: bold;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

p:last-child{
  font-size: 16px;
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 0.5px;
}
`
const SignUpForm = styled.div`
  width: 100%;
  max-width: 381px;
  max-height: 908px;
  font-color: #353535;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const IdChcekBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding : 13px 20px;
  margin-bottom : 16px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: ${({ disabled }) => (disabled ? ' #c4c4c4' : '#ff7f50')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;

const InvalidMsg = styled.p`
  margin-top: 4px;
  color: #ff6228;
  font-size: 12px;
`;

const ValidMsg = styled.p`
  margin-top: 4px;
  color: #03ca5f; 
  font-size : 12px;
`

const AgreeAllCheckbox = styled.div`
  position: relative;
  font-family : Pretendard;
  font-weight: bold;
  height: 48px; 
  justify-content: center;
  border-bottom: 1.5px solid #9b9b9b;
  color: #353535;

  label {
    display: flex;
    align-items: center;
  }

  button {
    position: absolute;
    right: 5px;
    width: 12px;
    height: 6px;
    font-size: 20px;
    border: none;
    background: transparent;
    color: #353535;
    cursor : pointer;
   }

`;

const AgreeCheckbox = styled.div`
  font-family : Pretendard;
  height: 48px;
  color: #353535;
  justify-content: center;
  position: relative;

  label {
    display: flex;
    align-items: center;
  }

  span{
    color: #ff7f50;
    margin-left: 2px;
  }

  button {
    position: absolute;
    right: 5px;
    width: 12px;
    height: 6px;
    font-size: 20px;
    border: none;
    background: transparent;
    color: #353535;
    cursor : pointer;
   }
`;

const SignUpBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 13px 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#c4c4c4' : '#ff7f50')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;

const SignUpQuestion = styled.div`
 color: #545454;
 text-align: center;


 a{
  margin-left : 10px;
  color: #ff7f50;
 }
`
export default function SignUp (){
  const [form, setForm] = useForm()

  const {
    isValidId,
    isCheckingDuplicate,
    isNotDuplicate,
    duplicateMessage,
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
  } = useFormValidate(form);

  const [agreeAll, agreeAge, agreeFinal, agreePrivacy, setAgree, setAgreeAll, setAgreeAge, setAgreeFinal, setAgreePrivacy] = useAgree();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isAllAgreed = agreeAge && agreeFinal && agreePrivacy;
    setAgree(isAllAgreed);
    setIsDisabled(!isAllAgreed || !isValidId || !isNotDuplicate || !isValidPassword || form.password !== form.confirmPassword || !isValidName );
  }, [agreeAge, agreeFinal, agreePrivacy, setAgree, isValidId, isNotDuplicate, isValidPassword, form.password, form.confirmPassword, isValidName]);

  // 아이디 입력 필드의 값이 변경될 때 호출되며, 해당 입력 값으로 상태를 업데이트
   const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idValue = e.target.value;
    setForm(prevForm => ({ ...prevForm, id: idValue }));
  };

  // 비밀번호 입력 필드의 값이 변경될 때 호출되며, 해당 입력 값으로 상태를 업데이트
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setForm(prevForm => ({ ...prevForm, password: passwordValue }));
  };

  // 비밀번호 확인 입력 필드의 값이 변경될 때 호출되며, 해당 입력 값으로 상태를 업데이트
  const handleConfirmPasswordChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordValue = e.target.value;
    setForm(prevForm => ({ ...prevForm, confirmPassword: confirmPasswordValue }));
  };

  // 이름 입력 필드의 값이 변경될 때 호출되며, 해당 입력 값으로 상태를 업데이트
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setForm(prevForm => ({ ...prevForm, name: nameValue }));
  };
  
  // 전화번호 입력 필드의 값이 변경될 때 호출되며, 해당 입력 값으로 상태를 업데이트
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumberValue = e.target.value;
    setForm(prevForm => ({ ...prevForm, phoneNumber: phoneNumberValue }));
  };

  // 전체 동의하기 체크박스의 상태 변화를 처리. 체크박스가 선택되거나 해제될 때 호출되며, 해당 상태를 상태 변수에 반영
  const handleAgreeAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreeAll(isChecked);
    setAgreeAge(isChecked);
    setAgreeFinal(isChecked);
    setAgreePrivacy(isChecked);
  };


//만 14세 이상 동의 체크박스의 변경 이벤트를 처리. 체크박스의 상태에 따라 동의 상태를 설정하고, 만약 체크박스가 해제되면 전체 동의 상태를 해제
  const handleAgreeAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const isChecked = e.target.checked;
    setAgreeAge(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

//만 최종이용자 동의 체크박스의 변경 이벤트를 처리. 체크박스의 상태에 따라 동의 상태를 설정하고, 만약 체크박스가 해제되면 전체 동의 상태를 해제
  const handleAgreeFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreeFinal(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

//만 개인정보수집 동의 체크박스의 변경 이벤트를 처리. 체크박스의 상태에 따라 동의 상태를 설정하고, 만약 체크박스가 해제되면 전체 동의 상태를 해제
  const handleAgreePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
     setAgreePrivacy(isChecked);
    if (!isChecked) {
    setAgreeAll(false);
  }
};

// 폼의 기본 동작을 막고, 사용자가 입력한 데이터를 서버에 전송하여 회원가입을 시도
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("successful");
      } else {
        console.error("Failed to sign up:", response.statusText);
      }
    } catch (error: any) {
      console.error("Failed to sign up:", error.message);
    }
  };

  return (
    <Background>
    <SignUpContainer>
     <SignupHeader>
        <p>환영합니다</p>
        <p>Riset로 통합 인력관리, 지금 시작해보세요</p>
    </SignupHeader>
    <SignUpForm>
      <form onSubmit={handleSubmit}>
          <TextInput
            label="아이디"
            type="text"
            value={form.id}
            onChange={handleIdChange}
            onBlur={handleIdBlur}
            placeholder="아이디를 입력하세요"
            isValid={isValidId}
            validMessage="아이디 중복 확인을 진행해 주세요"
            inValidMessage="6~15자 이내 영문 소문자와 숫자 조합만 사용 가능합니다."
            helperText="6~15자 영문 숫자 혼합"
          />

         <IdChcekBtn disabled={!isValidId || isCheckingDuplicate} onClick={handleCheckDuplicateId}>아이디 중복 확인</IdChcekBtn>
          {isNotDuplicate && duplicateMessage && 
           <>
           <span className="icon invalid"><FaCircleExclamation /></span>
          <InvalidMsg>{duplicateMessage}</InvalidMsg>
           </>
          }
         {!isNotDuplicate && duplicateMessage && 
          <>
         <span className="icon valid"><FaCheckCircle /></span>
          <ValidMsg>{duplicateMessage}</ValidMsg>
         </>}

          <TextInput
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="비밀번호를 입력하세요"
            isValid={isValidPassword}
            inValidMessage="8~12자의 영문/숫자/특수문자 조합만 사용 가능합니다."
            helperText="8~12자 영문, 숫자, 특수문자 조합"
            />

          <TextInput
            label="비밀번호 확인"
            type="password"
            value={form.confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            placeholder="비밀번호를 입력하세요"
            isValid={isValidConfirmPassword}
            validMessage="비밀번호가 일치합니다"
            inValidMessage="비밀번호가 일치하지 않습니다"
            />      

        <TextInput
            label="이름"
            type="text"
            value={form.name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="이름을 입력하세요"
            isValid={isValidName}
            inValidMessage ="올바른 이름을 입력하세요"
            />     
          
          
          <HorizontalLineWithText>선택 사항</HorizontalLineWithText>
  
          
          <TextInput
            label="전화번호"
            type="text"
            value={form.phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={handlePhoneNumberBlur}
            placeholder="전화번호를 입력하세요"
            isValid={isValidPhoneNumber}
            inValidMessage ="올바른 잔화번호를 입력하세요"
            />    

        <AgreeAllCheckbox>
          <label>
            <CustomCheckbox isChecked={agreeAll} onChange={handleAgreeAllChange} /><p>
            전체 동의하기<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeAllCheckbox>

        <AgreeCheckbox>
          <label>
            <CustomCheckbox isChecked={agreeAge} onChange={handleAgreeAgeChange}  /><p>
            [필수] 만 14세 이상입니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>

        <AgreeCheckbox>
          <label>
            <CustomCheckbox 
              isChecked={agreeFinal}
              onChange={handleAgreeFinalChange} />
            <p>[필수] <span>최종이용자 이용약관</span>에 동의합니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>
        <AgreeCheckbox>
          <label>
            <CustomCheckbox 
            isChecked={agreePrivacy} onChange={handleAgreePrivacyChange} />
            <p>[필수] <span>개인정보 수집 및 이용</span>에 동의합니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>
        <SignUpBtn type="submit" disabled={isDisabled}>가입하기</SignUpBtn>
      </form>
      <SignUpQuestion>
      <p>이미 계정이 있으신가요?<a href="/">로그인</a></p>
      </SignUpQuestion>
      </SignUpForm>
       </SignUpContainer>
       </Background>
  );
};
