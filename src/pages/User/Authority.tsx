import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../../common/TextInput";
import HorizontalLineWithText from "../../common/HorizontalLineWithText";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useNavigate } from "react-router-dom";

interface InfoWrapperProps {
  btnClicked: boolean;
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

  p:first-child {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 21px;
    letter-spacing: 0.5px;
    color: #353535;
  }

  p:last-child {
    font-size: 16px;
    letter-spacing: 0.5px;
    color: #353535;
  }
`;

const AuthorityBtnWrapper = styled.div`
  width: 384px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const AuthorityButton = styled.button<{ $isDisabled: boolean }>`
  flex: 1;
  height: 100%;
  padding: 13px 20px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  border: none;
  cursor: pointer;
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? "#ff7f50" : "#c4c4c4"};
`;

const AdminInfoWrapper = styled.div<{ $btnClicked: boolean; $isAdmin: boolean }>`
  width: 384px;
  margin: auto;
  display: ${({ $btnClicked, $isAdmin }) =>
    $btnClicked && $isAdmin ? "block" : "none"};
`;

const EmployeeInfoWrapper = styled.div<{ $btnClicked: boolean; $isAdmin: boolean }>`
  width: 384px;
  margin: auto;
  display: ${({ $btnClicked, $isAdmin }) => ($btnClicked && $isAdmin ? "block" : "none")};
`;


const CompanyNameWrapper = styled.div`
  input:first-child {
    width: 380px;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
`;

const CompanyAddressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  input:last-child {
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
`;

const AuthorityCodeWrapper = styled.div`
  input {
    width: 380px;
  }
`;

const CompleteBtn = styled.button<{ $disabled: boolean }>`
  width: 100%;
  height: 50px;
  padding: 13px 20px;
  margin-top: 42px;
  margin-bottom: 16px;
  border-radius: 8px;
  font-weight: bold;
  color: white;
  border: none;
  background-color: ${({ $disabled }) => ($disabled ? "#c4c4c4" : "#ff7f50")};
  cursor: ${({ $disabled }) => ($disabled ? "cursor" : "pointer")};
`;

export default function Authority() {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyAddress, setCompanyAddress] = useState<string>("");
  const [btnClicked, setBtnClicked] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [authorityCode, setAuthorityCode] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [CodeBtnIsDisabled, setCodeBtnIsDisabled] = useState<boolean>(true);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const navigate = useNavigate();

  // 위도 경도 구하기
  useEffect(() => {
    if (companyAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(companyAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          setPosition({ latitude: +result[0].y, longitude: +result[0].x });
        }
      });
    }
  }, [companyAddress]);

  useEffect(() => {
    setIsDisabled(companyName === "" || companyAddress === "");
  }, [companyName, companyAddress]);

  // 입력된 인풋값을 companyName에 업데이트
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };

  // 입력된 인풋값을 companyAddress에 업데이트
  const handleCompanyAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyAddress(e.target.value);
  };

  // 인풋의 값을 authorityCode에 업데이트, 코드가 비어있는지 여부에 따라 CodeBtnIsDisabled 상태 업데이트
  const handleAuthorityCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthorityCode(e.target.value);
    setCodeBtnIsDisabled(e.target.value === "");
  };


  // 모달 여는 함수
  const handleOpenModal = () => {
    setIsPopupOpen(true);
  };

 // 모달 바깥의 배경을 클릭한 경우에만 모달을 닫음
  const handleModalWrapperClick = (event :any) => {
    if (event.target === event.currentTarget) {
      console.log(1,event.currentTarget)
      setIsPopupOpen(false);
    }
  };

  // 우편번호 검색을 완료했을 때 호출되는 함수, 검색 결과로 받은 주소를 가져와 companyAddress 상태 업데이트, 우편번호 검색 팝업을 닫음
  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    setCompanyAddress(fullAddress);
    setIsPopupOpen(false);
  };

  // 회사명과 회사주소를 서버로 전송
  const sendCompanyInfoToServer = () => {
    const companyInfo = {
      companyName: companyName,
      companyAddr: companyAddress,
      latitude: position.latitude,
      longitude: position.longitude,
    };

    const jwt = localStorage.getItem("jwt");
    fetch("https://dev.risetconstruction.net/preset/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(companyInfo),
    }).catch((error) => {
      console.error("서버 요청 오류:", error);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    });

    navigate("/home");
  };

  // 유효한 코드 서버로 전송
  const sendCodeToServer = (code: any) => {
    fetch("/send-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("코드 전송 완료:", data);
      })
      .catch((error) => {
        console.error("코드 전송 오류:", error);
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      });
  };

  const jwt = localStorage.getItem("jwt");

  // 서버로부터 코드의 유효성을 검증하는 함수, 서버에 POST 요청을 보내어 코드의 유효성을 확인하고, 그 결과에 따라 isValidCode 상태를 업데이트
  const validateCode = () => {
    // 코드 유효성을 확인하는 중이라는 상태로 설정
    setIsValidatingCode(true);

    console.log(authorityCode);
    fetch(
      `https://dev.risetconstruction.net/preset/employee?code=${authorityCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("코드 전송 완료:", data);
      });
  };

  return (
    <AuthorityContainer>
      <AuthorityHeaderWrapper>
        <p>시작 전, 사전설정이 필요합니다.</p>
        <p>관리자, 직원 중 나에게 맞는 것을 선택하여 정보를 입력해 주세요</p>
      </AuthorityHeaderWrapper>

      <AuthorityBtnWrapper>
        <AuthorityButton
          $isDisabled={isAdmin}
          onClick={() => {
            setIsAdmin(true);
            setBtnClicked(true);
          }}
          style={{ marginRight: "8px" }}
        >
          관리자
        </AuthorityButton>
        <AuthorityButton
          $isDisabled={!isAdmin}
          onClick={() => {
            setIsAdmin(false);
            setBtnClicked(true);
          }}
        >
          직원
        </AuthorityButton>
      </AuthorityBtnWrapper>

      <AdminInfoWrapper $btnClicked={!btnClicked || isAdmin} $isAdmin={true}>
        <HorizontalLineWithText
          style={{
            marginTop: "40px",
            marginBottom: "8px",
            justifyContent: "center",
          }}
        >
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
          <button onClick={handleOpenModal}>검색</button>
          {isPopupOpen && (
        <ModalWrapper onClick={handleModalWrapperClick}>
          <ModalContent>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </ModalContent>
        </ModalWrapper>
      )}
        </CompanyAddressWrapper>

        <CompleteBtn
          type="submit"
          $disabled={isDisabled}
          onClick={sendCompanyInfoToServer}
        >
          완료
        </CompleteBtn>
      </AdminInfoWrapper>

      <EmployeeInfoWrapper $btnClicked={btnClicked && !isAdmin} $isAdmin={!isAdmin}>
        <HorizontalLineWithText
          style={{
            marginTop: "40px",
            marginBottom: "8px",
            justifyContent: "center",
          }}
        >
          정보 입력
        </HorizontalLineWithText>
        <AuthorityCodeWrapper>
          <TextInput
            label="코드"
            type="text"
            value={authorityCode}
            onChange={handleAuthorityCodeChange}
            placeholder="코드번호 입력"
            isValid={!isValidatingCode && isValidCode}
            isValidatingCode={isValidatingCode}
            validMessage="확인되었습니다"
            inValidMessage="코드 번호를 확인해 주세요"
          />
        </AuthorityCodeWrapper>
        <CompleteBtn
          type="submit"
          $disabled={CodeBtnIsDisabled}
          onClick={validateCode}
        >
          완료
        </CompleteBtn>
      </EmployeeInfoWrapper>
    </AuthorityContainer>
  );
}
