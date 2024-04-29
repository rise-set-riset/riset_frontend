import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import CustomCheckbox from "../../common/CustomCheckbox";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";
import loginLogo from "../../assets/login-logo.png";
import naverLogo from "../../assets/naver-logo.png";
import kakaoLogo from "../../assets/kakao-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/background-image.png";

const Background = styled.div`
  min-width: 100vw;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLogo = styled.img`
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
  margin-bottom: 50px;

  img {
    width: 100%;
  }
`;

const LoginForm = styled.div`
  width: 90%;
  max-width: 381px;
  max-height: 908px;
  color: #353535;
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

  span {
    margin-left: 5px;
    letter-spacing: 0.5px;
  }
`;

const LoginBtn = styled.div`
  width: 100%;
  height: 50px;
  padding: 13px 20px;
  margin-bottom: 24px;
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
  padding: 13px 20px;
  margin-bottom: 16px;
  border-radius: 8px;
  color: #353535;
  border: 1px solid #cfcfcf;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LoginQuestion = styled.div`
  color: #545454;
  text-align: center;
  margin-top: 32px;

  a {
    margin-left: 10px;
    color: #ff7f50;
  }
`;

export default function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPasswrd] = useState<string>("");
  const navigate = useNavigate();

  // 입력 필드의 값이 변경되면 해당값을 id에 반영
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  // 해당 URL 페이지로 이동
  const handleFindId = () => {
    navigate("/findid");
  };

  // 입력 필드의 값이 변경되면 해당값을 password에 반영
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswrd(e.target.value);
  };

  // 해당 URL 페이지로 이동
  const handleFindPassword = () => {
    navigate("/findpassword");
  };

  // 입력된 아이디와 이메일을 서버에 POST 요청으로 전송
  const handleLogin = async () => {
    // const loginUrl = "https://dev.risetconstruction.net/auth/login";
    const loginUrl = "http://43.203.11.249:8080/auth/login";

    const data = {
      id: id,
      password: password,
    };

    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("jwt", data.access_token);
        localStorage.setItem("userId", data.userId);

        if (data.isAuth === "true") {
          navigate("/home");
        } else {
          navigate("/authority");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // 네이버 로그인 버튼 클릭 이벤트 핸들러
  const handleNaverLogin = () => {
    // const url = "https://dev.risetconstruction.net/oauth2/authorization/naver";
    const url = "http://43.203.11.249:8080/oauth2/authorization/naver";
    window.open(url);
  };

  // 카카오 로그인 버튼 클릭 이벤트 핸들러
  const handleKakaoLogin = () => {
    const url = "http://43.203.11.249:8080/oauth2/authorization/kakao";
    // const url = "https://dev.risetconstruction.net/oauth2/authorization/kakao";
    window.open(url);
  };

  // 구글 로그인 버튼 클릭 이벤트 핸들러
  const handleGoogleLogin = () => {
    // "https://dev.risetconstruction.net/oauth2/authorization/google";
    "http://43.203.11.249:8080/oauth2/authorization/google";
  };

  return (
    <Background>
      <LoginContainer>
        <LogoWrapper>
          <img src={loginLogo} alt="logo" />
        </LogoWrapper>
        <LoginForm>
          <form onSubmit={handleLogin}>
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
                placeholder="비밀번호를 입력하세요"
              />
              <FindIdButton onClick={handleFindPassword}>
                비밀번호 찾기
              </FindIdButton>
            </TextInputWrapper>

            <RememberIdWrapper>
              <CustomCheckbox />
              <span>아이디 기억하기</span>
            </RememberIdWrapper>

            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>

            <HorizontalLineWithText>OR</HorizontalLineWithText>

            <SocialLoginWrapper>
              <SocialLoginBtn onClick={handleNaverLogin}>
                <SocialLogo src={naverLogo} />
                <span>네이버 아이디로 로그인</span>
              </SocialLoginBtn>

              <SocialLoginBtn onClick={handleKakaoLogin}>
                <SocialLogo src={kakaoLogo} />
                <span>카카오 아이디로 로그인</span>
              </SocialLoginBtn>

              <SocialLoginBtn onClick={handleGoogleLogin}>
                <SocialLogo src={googleLogo} />
                <span>구글 아이디로 로그인</span>
              </SocialLoginBtn>
            </SocialLoginWrapper>

            <LoginQuestion>
              <p>
                아직 Riset의 계정이 없으신가요?<a href="/signup">회원가입</a>
              </p>
            </LoginQuestion>
          </form>
        </LoginForm>
      </LoginContainer>
    </Background>
  );
}
