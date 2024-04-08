import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import CustomCheckbox from "../../common/CustomCheckbox";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";
import loginLogo from "../../assets/loginLogo.png"
import naverLogo from "../../assets/naverLogo.png"
import kakaoLogo from "../../assets/kakaoLogo.png"
import googleLogo from "../../assets/googleLogo.png"

const Background = styled.div`
  min-width: 100vw;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
`;

const LoginContainer = styled.div`
  width: 90%;
  max-width: 519px;
  max-height: 821px;
  margin: 70px auto; 
  padding: 40px 20px;
  background-color: #ffffff;
  opacity: 0.8;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
    width: 200.22px;
    height: 66px;
    margin-bottom : 50px;

  img{
    width: 100%
  }
  `;

const LoginForm = styled.div`
  width: 90%;
  max-width: 381px;
  max-height: 908px;
  font-color: #353535;
  font-size: 16px;

  div {
    display: flex;
    flex-direction: column;
  }
`;

const RememberIdContainer = styled.div`

`;

const LoginBtn = styled.div`
  width: 100%;
  height: 50px;
  padding : 13px 20px;  
  margin-bottom : 16px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: #ff7f50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SocialLoginBtn = styled.button`
  width: 100%;
  height: 50px;
  padding : 13px 20px;  
  margin-bottom : 16px;
  border-radius: 8px;
  color: #353535;
  border: 1px solid #cfcfcf;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SocialLogo= styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`

const LoginQuestion = styled.div`
 color: #545454;
 text-align: center;
 margin-top : 32px;

 a{
  margin-left : 10px;
  color: #ff7f50;
 }
`

export default function Login() {
  const [id, setId] = useState<string>('');
  const [password, setPasswrd] = useState<string>('');
  const [isValidId, setIsValidId] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const handleIdChange = () =>{
    console.log('hi')
  }

  const handleIdBlur = () => {
    console.log('hi')
  }

  const handlePasswordChange = () =>{
    console.log('hi')
  }

  const handlePasswordBlur = () => {
    console.log('hi')
  }

  return (
    <Background>
       <LoginContainer>
   <LogoContainer>
    <img src={loginLogo} alt="logo"/>
   </LogoContainer> 
    <LoginForm>
      <form>
      <TextInput
            label="아이디"
            type="text"
            value={id}
            onChange={handleIdChange}
            onBlur={handleIdBlur}
            placeholder="아이디를 입력하세요"
            isValid={isValidId}
            validMessage="아이디 중복 확인을 진행해 주세요"
            inValidMessage="6~15자 이내 영문 소문자와 숫자 조합만 사용 가능합니다."
            helperText=""
          />
         <TextInput
            label="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            placeholder="아이디를 입력하세요"
            isValid={isValidPassword}
            validMessage="아이디 중복 확인을 진행해 주세요"
            inValidMessage="6~15자 이내 영문 소문자와 숫자 조합만 사용 가능합니다."
            helperText=""
          />

          <RememberIdContainer>
          <CustomCheckbox/><span>아이디 기억하기</span>
          </RememberIdContainer>

          <LoginBtn>로그인</LoginBtn>
          <HorizontalLineWithText>OR</HorizontalLineWithText>


          <SocialLoginBtn>
            <SocialLogo src={naverLogo}/>
              <span>네이버 아이디로 로그인</span>
          </SocialLoginBtn>
          
          <SocialLoginBtn>
            <SocialLogo src={kakaoLogo}/>
            <span>카카오 아이디로 로그인</span>
          </SocialLoginBtn>
          
          <SocialLoginBtn>
            <SocialLogo src={googleLogo}/>
            <span>구글 아이디로 로그인</span>
          </SocialLoginBtn>

          <LoginQuestion><p>아직 Riset의 계정이 없으신가요?<a href="/signup">회원가입</a></p></LoginQuestion>
      </form>
    </LoginForm>
  </LoginContainer>
  </Background>
  )
}
