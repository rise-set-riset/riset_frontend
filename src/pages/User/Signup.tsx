import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

type CheckboxProps = {
  checked: boolean;
}

const SignUpContainer = styled.div`
width: 85%;
max-width : 380px;
max-height: 1036px;
margin: 80px auto 50px; 
`

const SignupHeader = styled.div`

h2 {  
  text-align: center;
  font-size: 32px;
  font-family : Pretendard Medium;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

p{
  font-size: 16px;
  text-align: center;
  margin-bottom: 50px;
  letter-spacing: 0.5px;
}
`

const SignUpForm = styled.div`
  width: 100%;
  max-width : 381px;
  max-height: 908px;
  font-color: var(--color-black);
  

  div {
    display: flex;
    flex-direction: column;
  }

`;

const SignupInput = styled.div`
  position: relative; 
  display: inline-block;
  margin-bottom: 16px;

  label{
    font-family : Pretendard Medium;
    font-size: 14px;
    color: var(--color-black);
    letter-spacing: 0.1px;
    margin-bottom: 4px;
  }
  
  input {
    border-radius: 8px;
    border: 1px solid #a3a5a3;
    padding: 13px 20px;
    color: var(--color-black);
    font-size: 16px;
    letter-spacing: 0.5px;

    &::placeholder {
      color: var(--color-brand-lightgray);
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
    color: var(--color-pass); 
    width: 20px;
    height: 20px;
  }

  .icon.invalid {
    color: var(--color-error);
    width: 20px;
    height: 20px;
  }

  span{
    
  }
`;

const InvalidMsg = styled.p`
  margin-top: 4px;
  color: var(--color-error);
  font-size: 12px;
`

const ValidMsg = styled.p`
  margin-top: 4px;
  color: var(--color-pass); 
  font-size : 12px;
`

const IdChcekBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding : 13px 20px;
  margin-bottom : 16px;
  border-radius: 10px;
  color: white;
  border: none;
  background-color: ${({ disabled }) => (disabled ? 'var(--color-brand-lightgray)' : 'var(--color-brand-main)')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;


const HorizontalLineWithText = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-brand-lightgray);
  font-size: 14px;
  height: 20px;

  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: calc(50% - 20px);
    height: 1px;
    background-color: var(--color-brand-lightgray);
  }

  &:before {
    left: 0; 
    width: 40%; 
    top: 50%;
    margin-right: 10px; 
  }

  &:after {
    right: 0;
    width: 40%;
    top:50%;
    margin-left: 10px; 
  }
`;


const AgreeAllCheckbox = styled.div`
  position: relative;
  font-family : Pretendard ExtraBold;
  height: 48px; 
  justify-content: center;
  border-bottom: 1.5px solid var(--color-brand-gray);
  color: var(--color-black);

  label {
    display: flex;
    align-items: center;
  }

  button{
    position: absolute;
    right: 5px;
    width:12px;
    height: 6px;
    font-size: 20px;
    border: none;
    background: transparent;
    color: var(--color-black);
    cursor : pointer;
   }

`;

const AgreeCheckbox = styled.div`
  font-family : Pretendard Medium;
  height: 48px;
  color: var(--color-black);
  justify-content: center;
  position: relative;

  label {
    display: flex;
    align-items: center;
  }

  span{
    color: var(--color-brand-main);
    margin-left: 2px;
  }

  button{
    position: absolute;
    right: 5px;
    width:12px;
    height: 6px;
    font-size: 20px;
    border: none;
    background: transparent;
    color: var(--color-black);
    cursor : pointer;
   }
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
width: 20px;
height: 20px;
border-radius: 50%;
border: 1px solid var(--color-black);
appearance: none;
cursor: pointer;
transition: background 0.2s;
margin: 0px 5px 0px 0px;

&:checked {
  border-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-color: var(--color-brand-main);
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
  background-color: ${({ disabled }) => (disabled ? 'var(--color-brand-lightgray)' : 'var(--color-brand-main)')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;

const SignUpQuestion = styled.div`
 color: var(--color-brand-darkgray);
 text-align: center;


 a{
  margin-left : 10px;
  color: var(--color-brand-main);
 }
`

const handleValidateId = (input: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
  return regex.test(input);
};

const handleValidatePassword = (input: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/;
  return regex.test(input);
};



const SignUp: React.FC = () => {

  const [id, setId] = useState<string>('');
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);
  const [duplicateMessage, setDuplicateMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [isNameEntered, setIsNameEntered] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [agreeAll, setAgreeAll] = useState<boolean>(false);
  const [agreeAge, setAgreeAge] = useState<boolean>(false);
  const [agreeFinal, setAgreeFinal] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const isAllAgreed = agreeAge && agreeFinal && agreePrivacy;
    setAgreeAll(isAllAgreed);
    setIsDisabled(!isAllAgreed || !isValidId || !isValidPassword || password !== confirmPassword || !isNameEntered);
  }, [agreeAge, agreeFinal, agreePrivacy, isValidId, isValidPassword, password, confirmPassword, isNameEntered]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleIdBlur = () => {
    setIsValidId(handleValidateId(id));
  
    // 포커스가 아이디 입력란에서 떠났을 때 유효성 검사 결과에 따라 메시지를 표시합니다.
    if (!isValidId && id) {
      // 사용이 불가능한 아이디일 경우
      // 유효성 검사 실패 메시지와 느낌표 아이콘을 표시합니다.
      return (
        <>
          <InvalidMsg>사용이 불가능한 아이디입니다</InvalidMsg>
          <span className="icon invalid"><FaCircleExclamation /></span>
        </>
      );
    } else if (isValidId && id && isCheckingDuplicate) {
      // 사용 가능한 아이디이고 중복 확인 중인 경우
      // 사용 가능한 메시지와 체크마크 아이콘을 표시합니다.
      return (
        <>
          <ValidMsg>사용 가능한 아이디입니다</ValidMsg>
          <span className="icon valid"><FaCheckCircle /></span>
        </>
      );
    }
  };

  const handleCheckDuplicateId = async () => {
    setIsCheckingDuplicate(true); 
    try {
      const response = await fetch('/api/checkDuplicateId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }) 
      });
      const data = await response.json();
      if (data.isDuplicate) {
        setIsValidId(false); 
        setDuplicateMessage('이미 사용 중인 아이디입니다');
      } 
      // else {
      //   setIsValidId(true)
      //   setDuplicateMessage('사용할 수 있는 아이디입니다'); 
      // }
    } catch (error) {
      console.error('Error checking duplicate id:', error);
    }
    setIsCheckingDuplicate(false); 
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(handleValidatePassword(newPassword));
  };

  const handlePasswordBlur = () => {
    setIsValidPassword(handleValidatePassword(password));
  };

  const handleConfirmPasswordBlur = () => {
    setIsValidConfirmPassword(confirmPassword === password && isValidPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameEntered(newName !== '');
  };


  const handleAgreeAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreeAll(isChecked);
    setAgreeAge(isChecked);
    setAgreeFinal(isChecked);
    setAgreePrivacy(isChecked);
  };

  const handleAgreeAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreeAge(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

  const handleAgreeFinalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreeFinal (isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

  const handleAgreePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreePrivacy(isChecked);
    if (!isChecked) {
      setAgreeAll(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
          name,
          phoneNumber,
        }),
      });
  
      if (response.ok) {
        console.log('successful')
      } else {
        console.error("Failed to sign up:", response.statusText);
      }
    } catch (error : any) {
      console.error("Failed to sign up:", error.message);
    }
  };
  

  return (
    <SignUpContainer>
     <SignupHeader>
        <h2>환영합니다</h2>
        <p>Riset로 통합 인력관리, 지금 시작해보세요</p>
    </SignupHeader>
    <SignUpForm>
      <form onSubmit={handleSubmit}>
        <SignupInput>
          <label>아이디</label>
          <div>
            <input type="text" value={id} onChange={handleIdChange} onBlur={handleIdBlur} placeholder="아이디를 입력하세요" />
            
          </div>
          </SignupInput>

          <IdChcekBtn disabled={!isValidId || isCheckingDuplicate} onClick={handleCheckDuplicateId}>아이디 중복 확인</IdChcekBtn>   
          {duplicateMessage && <InvalidMsg>{duplicateMessage}</InvalidMsg>}

          <SignupInput>
          <label>비밀번호</label>
          <div>
            <input type="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} placeholder="비밀번호를 입력하세요"/>
            {!isValidPassword && password && 
            <>
               <InvalidMsg>올바른 비밀번호를 입력하세요</InvalidMsg>
            <span className="icon invalid"><FaCircleExclamation /></span>
            </>
           }
            {isValidPassword &&
            <>
              <ValidMsg>비밀번호가 확인되었습니다</ValidMsg>
              <span className="icon valid"><FaCheckCircle /></span>
            </>
            }
          </div>
          </SignupInput>
          <SignupInput>
          <label>비밀번호 재확인</label>
          <div>
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} onBlur={handleConfirmPasswordBlur} placeholder="비밀번호를 입력하세요"/>
            {password !== confirmPassword && confirmPassword && 
            <>
            <InvalidMsg>비밀번호가 일치하지 않습니다</InvalidMsg>
            <span className="icon invalid"><FaCircleExclamation /></span>
            </>
            }
                       
            {password === confirmPassword && confirmPassword && isValidPassword && <>
            <ValidMsg>비밀번호가 확인되었습니다</ValidMsg>
            <span className="icon valid"><FaCheckCircle /></span>
            </>
            }
          </div> 
          </SignupInput>        

          <SignupInput>
            <label>이름</label>
            <div>
            <input type="text" value={name} onChange={handleNameChange} placeholder="이름을 입력하세요"/>
            </div>
          </SignupInput> 
          
          
          <HorizontalLineWithText>선택 사항</HorizontalLineWithText>
  
          
          <SignupInput>
          <label style={{marginTop : '16px'}}>전화번호(선택)</label>
          <div>
            <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="전화번호를 입력하세요"/>
            </div>
          </SignupInput>


        <AgreeAllCheckbox>
          <label>
            <CustomCheckbox checked={agreeAll} onChange={handleAgreeAllChange} /><p>
            전체 동의하기<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeAllCheckbox>

        <AgreeCheckbox>
          <label>
            <CustomCheckbox checked={agreeAge} onChange={handleAgreeAgeChange}  /><p>
            [필수] 만 14세 이상입니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>

        <AgreeCheckbox>
          <label>
            <CustomCheckbox checked={agreeFinal} onChange={handleAgreeFinalChange} />
            <p>[필수] <span>최종이용자 이용약관</span>에 동의합니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>
        <AgreeCheckbox>
          <label>
            <CustomCheckbox checked={agreePrivacy} onChange={handleAgreePrivacyChange} />
            <p>[필수] <span>개인정보 수집 및 이용</span>에 동의합니다.<button><IoIosArrowForward /></button></p>
          </label>
        </AgreeCheckbox>
        <SignUpBtn type="submit" disabled={isDisabled}>가입하기</SignUpBtn>
      </form>
      <SignUpQuestion>
      <p>이미 계정이 있으신가요?<a href="/login">로그인</a></p>
      </SignUpQuestion>
      </SignUpForm>
       </SignUpContainer>
  );
};

export default SignUp;
