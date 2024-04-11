import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";


const AuthorityContainer = styled.div`
  width: 90%;
  max-width: 418px;
  margin-top: 100px;
`;

const AuthorityHeaderWrapper = styled.div`
  width: 100%;
  height: 69px;
  margin-bottom: 80px;
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

const InfoWrapper = styled.div`
  width: 384px;
  margin: auto;
`
const AuthorityBtnWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 42px;

  button {
    flex: 1; 
    height: 100%;
    padding: 13px 20px;
    border-radius: 8px;
    font-weight: bold;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:first-child {
    background-color: #ff7f50;
    margin-right: 8px;
  }

  button:last-child {
    background-color: #c4c4c4;
  }
`;

const CompanyNameWrapper = styled.div`
  
  input:first-child{
  width: 380px;
}
`

const CompanyAddressWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  

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

  const handleCompanyNameChange = () =>{
    console.log('hi')
  }

  const handleCompanyAddressChange = () =>{
    console.log('hi')
  }
  
  return (
  <AuthorityContainer>

    <AuthorityHeaderWrapper>
      <p>시작 전, 사전설정이 필요합니다.</p>
      <p>관리자, 직원 중 나에게 맞는 것을 선택하여 정보를 입력해 주세요</p>
    </AuthorityHeaderWrapper>

    <InfoWrapper>
    <AuthorityBtnWrapper>
    <button>관리자</button>
    <button>직원</button>
    </AuthorityBtnWrapper>
    
    <HorizontalLineWithText style={{marginBottom: "8px", justifyContent: "center"}}>정보 입력</HorizontalLineWithText>
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
      <button>검색</button>
      </CompanyAddressWrapper>  
      <CompleteBtn type="submit" disabled={isDisabled}>완료</CompleteBtn>
      </InfoWrapper>

  </AuthorityContainer>
  )
}
