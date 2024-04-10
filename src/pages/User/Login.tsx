import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import CustomCheckbox from "../../common/CustomCheckbox";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";
import loginLogo from "../../assets/login-logo.png"
import naverLogo from "../../assets/naver-logo.png"
import kakaoLogo from "../../assets/kakao-logo.png"
import googleLogo from "../../assets/google-logo.png"
import { useNavigate } from 'react-router-dom';


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

const SocialLogo= styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px;
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

const LogoWrapper = styled.div`
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

const TextInputWrapper = styled.div`
  position: relative;
`;

const FindIdButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  font-family: pretendard;
  cursor: pointer;
  font-size: 14px;
  color: #ff7f50;
  letter-spacing: 0.1px;
  margin-bottom: 4px;
`;

const RememberIdWrapper = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3px;
  margin-bottom: 19px;
  width: 137px;
  height: 24px;

  span{
    margin-left: 5px;
    letter-spacing: 0.5px;
  }
`;

const LoginBtn = styled.div`
  width: 100%;
  height: 50px;
  padding : 13px 20px;  
  margin-bottom : 24px;
  border-radius: 8px;
  color: white;
  border: none;
  background-color: #ff7f50;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SocialLoginWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 32px;
`;

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
  const [isIdNotFound, setIsIdNotFound] = useState(false); 
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false); 

  const navigate = useNavigate();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }

  const handleFindId = () => {
    navigate('/findid');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswrd(e.target.value);
  }

  const handleFindPassword = () => {
    navigate('/findpassword');
  }

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = () => {
    // 로그인 API 엔드포인트 URL
    const loginUrl = "http://your-server.com/login";

    // POST 요청을 보낼 데이터
    const data = {
      id: id,
      password: password
    };

    // Fetch API를 사용하여 서버에 POST 요청을 보냅니다.
   fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      // 응답 데이터를 JSON 형태로 파싱합니다.
      return response.json();
    })
    .then(data => {
      // 서버로부터 받은 응답 데이터를 확인합니다.
      if (data.success) {
        // 로그인 성공 시 처리할 내용을 작성합니다.
        console.log("로그인 성공!");
      } else {
        // 로그인 실패 시 처리할 내용을 작성합니다.
        console.log("로그인 실패!");
        // 아이디가 존재하지 않는 경우 경고 메시지를 표시합니다.
        if (data.error === "id_not_found") {
          setIsIdNotFound(true);
        }
        // 비밀번호가 일치하지 않는 경우 경고 메시지를 표시합니다.
        if (data.error === "password_mismatch") {
          setIsPasswordMismatch(true);
        }
      }
    })
    .catch(error => {
      console.error("Error:", error);
    }); 
  };


// 네이버 로그인 버튼 클릭 이벤트 핸들러
const handleNaverLogin = () => {
  window.location.href = '네이버 로그인 URL';
};

// 카카오 로그인 버튼 클릭 이벤트 핸들러
const handleKakaoLogin = () => {
  window.location.href = '카카오 로그인 URL';
};

// 구글 로그인 버튼 클릭 이벤트 핸들러
const handleGoogleLogin = () => {
  window.location.href = '구글 로그인 URL';
};
  

  return (
    <Background>
       <LoginContainer>
   <LogoWrapper>
    <img src={loginLogo} alt="logo"/>
   </LogoWrapper> 
    <LoginForm>
      <form>
      <TextInputWrapper>
      <TextInput
            label="아이디"
            type="text"
            value={id}
            onChange={handleIdChange}
            placeholder="아이디를 입력하세요"
          />
           <FindIdButton onClick={handleFindId}>아이디 찾기</FindIdButton>
      </TextInputWrapper>

      <TextInputWrapper>
         <TextInput
            label="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="아이디를 입력하세요"
          />
          <FindIdButton onClick={handleFindPassword}>비밀번호 찾기</FindIdButton>
      </TextInputWrapper>

          <RememberIdWrapper>
          <CustomCheckbox/><span>아이디 기억하기</span>
          </RememberIdWrapper>

          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>

          <HorizontalLineWithText>OR</HorizontalLineWithText>

        <SocialLoginWrapper>
          <SocialLoginBtn onClick={handleNaverLogin}>
            <SocialLogo src={naverLogo}/>
              <span>네이버 아이디로 로그인</span>
          </SocialLoginBtn>
          
          <SocialLoginBtn onClick={handleKakaoLogin}>
            <SocialLogo src={kakaoLogo}/>
            <span>카카오 아이디로 로그인</span>
          </SocialLoginBtn>
          
          <SocialLoginBtn onClick={handleGoogleLogin}>
            <SocialLogo src={googleLogo}/>
            <span>구글 아이디로 로그인</span>
          </SocialLoginBtn>
          </SocialLoginWrapper>

          <LoginQuestion><p>아직 Riset의 계정이 없으신가요?<a href="/signup">회원가입</a></p></LoginQuestion>
      </form>
    </LoginForm>
  </LoginContainer>
  </Background>
  )
}
