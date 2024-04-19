import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../hooks/useTable";
import { CiCirclePlus } from "react-icons/ci";
import ProfileImgage from "../../assets/profile-img.png";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  margin: 30px auto 0px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ImageUploadInput = styled.input`
  width: 24px;
  height: 24px;
  opacity: 0;
  z-index: 1;
  position: absolute;
  bottom: 0;
  right: -10px;
  cursor: pointer;
`;

const CustomCiCirclePlus = styled(CiCirclePlus)`
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 0;
  right: -10px;
`;

const NameandPositionWrapper = styled.div`
  width: 67px;
  height: 48px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 0.1px;

  p:first-child {
    font-size: 24px;
    color: var(--color-black);
  }

  p:nth-child(2) {
    font-size: 14px;
    color: var(--color-brand-main);
  }
`;

const MypageContainer = styled.div`
  width: 960px;
  margin: auto;
  color: var(--color-black);
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteAccountBtn = styled.button`
  width: 240px;
  height: 50px;
  padding: 13px 20px;
  border-radius: 8px;
  color: var(--color-brand-main);
  border: 2px solid var(--color-brand-main);
  background-color: var(--color-white);
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SaveBtn = styled.button`
  width: 240px;
  height: 50px;
  padding: 13px 20px;
  border-radius: 8px;
  color: var(--color-white);
  border: none;
  background-color: var(--color-brand-main);
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function Mypage() {
  const jwt = localStorage.getItem("jwt");

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    image: "",
    userId: "",
    name: "",
    joiningDate: "",
    jobGrade: "",
    departmentName: "",
    position: "",
    jobTitle: "",
    telNo: "",
    address: "",
    totalHoliday: "",
    salary: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  // 회원 정보 가져오는 함수
  const fetchData = () => {
    fetch("https://dev.risetconstruction.net/api/myPage/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // 회원 탈퇴 버튼을 클릭했을 때 실행될 함수
  const handleDeleteAccount = () => {
    const deleteEndpoint =
      "https://dev.risetconstruction.net/api/myPage/deleteUser";

    fetch(deleteEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete account");
        }
        console.log("Account deleted successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const userProfileImage = userData.image;
  const [uploadedImage, setUploadedImage] = useState(userProfileImage);

  // 프로필 이미지 업로드하는 함수
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <main className="main">
        <h2 className="title">마이페이지</h2>
        <ProfileImg>
          {userData.image ? (
            <img src={userData.image} alt="" />
          ) : uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded Profile" />
          ) : (
            <img src={ProfileImgage} alt="" />
          )}
          <ImageUploadInput
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <CustomCiCirclePlus />
        </ProfileImg>
        <NameandPositionWrapper>
          <p>{userData.name}</p>
          <p>{userData.position}</p>
        </NameandPositionWrapper>
        <MypageContainer>
          <Table userData={userData} />
          <BtnWrapper>
            <DeleteAccountBtn onClick={handleDeleteAccount}>
              회원탈퇴
            </DeleteAccountBtn>
            <SaveBtn>저장</SaveBtn>
          </BtnWrapper>
        </MypageContainer>
      </main>
    </Layout>
  );
}
