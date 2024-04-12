import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";
import DaumPostcodeEmbed from "react-daum-postcode";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";

interface InfoWrapperProps {
  BtnClicked: boolean;
  isAdmin: boolean;
}

const AuthorityContainer = styled.div`
  width: 90%;
  max-width: 418px;
  margin-top: 100px;
`;

const AuthorityHeaderWrapper = styled.div`
  width: 100%;
  height: 69px;
  margin-bottom: 66px;
  text-align: center;

  p:first-child{  
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 21px;
    letter-spacing: 0.5px;
    color: #353535;
  }

  p:last-child{
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #353535
  }
`

const AuthorityBtnWrapper = styled.div`
  width: 384px;
  height: 50px;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin: auto;
`;

const AuthorityButton = styled.button<{ isDisabled: boolean }>`
  flex: 1; 
  height: 100%;
  padding: 13px 20px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  background-color: ${({ isDisabled }) => (isDisabled ? '#ff7f50' : '#c4c4c4')};
`;

const InfoWrapper = styled.div<InfoWrapperProps>`
  width: 384px;
  margin: auto;
  display: ${({ BtnClicked, isAdmin }) => (BtnClicked && isAdmin ? 'block' : 'none')};
`
const CompanyNameWrapper = styled.div`
  
  input:first-child{
  width: 380px;
}
`

const CompanyAddressWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 26px;
  position: relative;

  input:last-child{
    width: 282px;
    margin-right: 8px;
  }

  button {
    margin-top: 4px;
    width: 100%;
    height: 50px;
    padding: 13px 20px;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
    background-color: #ff7f50;
  }
`

const PostcodeEmbedWrapper = styled.div`
  position: absolute;
  right: calc(100% + -700px); 
`;

const AuthorityCodeWrapper = styled.div`
  input{
  width: 380px;
  margin-bottom: 26px;
}
`

const CompleteBtn = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 50px;
  padding: 13px 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  border: none;
  background-color: ${({ disabled }) => (disabled ? '#c4c4c4' : '#ff7f50')};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;




export default function Authority() {
  const [companyName, setCompanyName] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [BtnClicked, setBtnClicked] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [authorityCode, setAuthorityCode] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  
  const updateIsDisabled = (companyName: string, companyAddress: string) => {
    setIsDisabled(companyName === '' || companyAddress === '');
  };

   const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setCompanyName(e.target.value)
    updateIsDisabled(companyName, companyAddress);
  }

  const handleCompanyAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setCompanyAddress(e.target.value);
    updateIsDisabled(companyName, companyAddress);
  }

    // 우편번호 검색 완료 시 실행되는 함수
    const handleComplete = (data: any) => {
      const fullAddress = data.address;
      setCompanyAddress(fullAddress);
      setIsPopupOpen(false); // 팝업 닫기
    };

  const handleAuthorityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setAuthorityCode(e.target.value);
    setIsDisabled(authorityCode === '');
  };

// 코드를 서버로 검증하는 함수
const validateCode = () => {
  // fetch API를 사용하여 서버에 POST 요청을 보냅니다.
  fetch('/validate-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: authorityCode }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }
      return response.json();
    })
    .then(data => {
      // 서버 응답에서 유효성을 확인합니다.
      if (data.isValid) {
        setIsValidCode(true)
      } else {
        setIsValidCode(false)
      }
    })
    .catch(error => {
      // 오류 메시지를 표시합니다.
      console.error('코드 검증 오류:', error);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    });
};
  
  return (
  <AuthorityContainer>

    <AuthorityHeaderWrapper>
      <p>시작 전, 사전설정이 필요합니다.</p>
      <p>관리자, 직원 중 나에게 맞는 것을 선택하여 정보를 입력해 주세요</p>
    </AuthorityHeaderWrapper>

   
      <AuthorityBtnWrapper>
         <AuthorityButton isDisabled={isAdmin} onClick={() => { setIsAdmin(true); setBtnClicked(true); }} style={{ marginRight: "8px" }}>관리자</AuthorityButton>
        <AuthorityButton isDisabled={!isAdmin} onClick={() => { setIsAdmin(false); setBtnClicked(true); }}>직원</AuthorityButton>
      </AuthorityBtnWrapper>
    
        <InfoWrapper BtnClicked={BtnClicked} isAdmin={isAdmin}>
           <HorizontalLineWithText style={{marginTop : "40px", marginBottom: "8px", justifyContent: "center"}}>
            정보 입력
          </HorizontalLineWithText>
          
          <CompanyNameWrapper>
            <TextInput
              label="회사명"
              type="text"
              value={companyName}
              onChange={handleCompanyNameChange}
              placeholder="회사명을 입력하세요"
            />
          </CompanyNameWrapper>
          
          <CompanyAddressWrapper>
          <TextInput
              label="회사 주소"
              type="text"
              value={companyAddress}
              onChange={handleCompanyAddressChange}
              placeholder="도로명, 지번, 건물명 검색"
            />
           <button onClick={() => setIsPopupOpen(true)}>검색</button>

          {/* 다음 우편번호 검색 A*/}
          {isPopupOpen && (
            <PostcodeEmbedWrapper>
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            /> 
            </PostcodeEmbedWrapper>
          )}

          </CompanyAddressWrapper>
          
          <CompleteBtn type="submit" disabled={isDisabled}>
            완료
          </CompleteBtn>
        </InfoWrapper>

        <InfoWrapper BtnClicked={BtnClicked} isAdmin={!isAdmin}>
        <HorizontalLineWithText style={{marginTop : "40px", marginBottom: "8px", justifyContent: "center"}}>
          정보 입력
        </HorizontalLineWithText>

        <AuthorityCodeWrapper>
        <TextInput
          label="코드"
          type="text"
          value={authorityCode}
          onChange={handleAuthorityCodeChange}
          placeholder="코드번호 입력"
          isValid={isValidCode}
          validMessage="확인되었습니다"
          inValidMessage="코드 번호를 확인해 주세요"
          />
        </AuthorityCodeWrapper>

        <CompleteBtn type="submit" disabled={isDisabled} onClick={validateCode}>완료</CompleteBtn>
        </InfoWrapper>
  </AuthorityContainer>
  )
}
