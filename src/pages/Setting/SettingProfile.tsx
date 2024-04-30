import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Profile } from "../../assets/header/profile.svg";
import SearchBar from "../../common/SearchBar";
import Pagination from "../../components/Setting/Pagination";
import DropDown from "../../components/Setting/DropDown";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  main {
    overflow-x: auto;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-black);
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;
  width: 400px;
  margin-left: auto;
  margin-right: 1rem;
  padding-left: 0.5rem;
`;

const SaveButton = styled.button`
  background-color: var(--color-brand-main);
  color: white;
  margin-left: 1rem;
  border: 1px solid var(--color-brand-main);
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: bold;
  min-width: 88px;
  height: 45px;
  cursor: pointer;

  @media screen and (max-width: 430px) {
    font-size: 0.8rem;
    min-width: 70px;
  }
`;

const ProfileTable = styled.div`
  margin: 2rem 1rem;
  display: grid;
  grid-template-rows: 36px repeat(auto-fill, 66px);
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 80px 100px 140px 80px 120px 90px 100px 130px 80px 100px 200px 280px;
  div {
    background-color: var(--color-brand-main);
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    border-left: 1px solid var(--color-white);
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  div:nth-child(1) {
    border-left: none;
  }
`;

const TableLine = styled(TableHeader)`
  div {
    background-color: var(--color-white);
    border-left: 1px solid var(--color-brand-lightgray);
    border-bottom: 1px solid var(--color-brand-lightgray);
    height: 66px;
    padding: 0 0.5rem;
    color: var(--color-black);
    font-weight: 500;

    input {
      width: 90%;
      height: 80%;
      border-radius: 8px;
      border: 1px solid var(--color-brand-lightgray);
      text-align: center;
      font-size: 1rem;

      &:focus {
        outline: 1px solid var(--color-brand-main);
        border: none;
      }
    }
  }

  div:nth-child(1) {
    border-left: none;
  }

  div:nth-last-child(1) {
    display: flex;
    justify-content: flex-start;
    padding-left: 1rem;
  }
`;

const ProfileImg = styled.div`
  /* width: 50px;
  height: 50px;
  margin: 0 auto; */
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
  svg {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
`;

const DropDownBox = styled.div`
  position: relative;
`;

interface ResponseDataType {
  [key: string]: any;
}
export default function SettingProfile() {
  const jwt = localStorage.getItem("jwt");
  const [responseData, setResponseData] = useState<ResponseDataType[]>(Test);
  const [totalItems, setTotalItems] = useState<number>(10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);

  const [departIdList, setDepartIdList] = useState<any>([
    { departId: 1, departName: "개발부서" },
    { departId: 2, departName: "영업부서" },
    { departId: 3, departName: "인사부서" },
    { departId: 4, departName: "마케팅부서" },
    { departId: 5, departName: "디자인부서" },
    { departId: 6, departName: "재무부서" },
  ]);
  const [rankIdList, setRankIdList] = useState<any>([
    { gradeNo: 1, grade: "black" },
    { gradeNo: 2, grade: "red" },
    { gradeNo: 3, grade: "yellow" },
  ]);
  const [currentUserId, setCurrentUserId] = useState<number>();

  /* 이름 검색 */
  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    const currentSearchWord = e.target.value.trim();
    if (currentSearchWord === "") {
      setSearchResult(responseData);
    } else {
      setSearchResult(
        responseData.filter((member) =>
          member.name?.toLowerCase().includes(currentSearchWord.toLowerCase())
        )
      );
    }
  };

  /* 데이터 변경 */
  const handleChageInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    selectedId: number
  ) => {
    const newArray = responseData.map((data) => {
      if (data.employeeNum === selectedId) {
        return {
          ...data,

          [e.target.name]: e.target.value,
        };
        // }
      } else {
        // id값에 해당하지 않는 객체는 그대로 유지
        return data;
      }
    });

    setResponseData(newArray);
  };

  const handleSyncDepart = (value: number | string) => {
    const newArray = responseData.map((data) => {
      if (data.employeeNum === currentUserId) {
        return {
          ...data,
          depart: {
            departmentName: value,
            departmentId: departIdList.filter(
              (dep: any) => dep.departName === value
            )[0].departId,
          },
        };
      } else {
        // id값에 해당하지 않는 객체는 그대로 유지
        return data;
      }
    });

    setResponseData(newArray);
  };

  const handleSyncRank = (value: number | string) => {
    const newArray = responseData.map((data) => {
      if (data.employeeNum === currentUserId) {
        return {
          ...data,
          jobGrade: {
            grade: rankIdList.filter((dep: any) => dep.gradeNo === value)[0]
              .grade,
            jobGradeId: value,
          },
        };
      } else {
        // id값에 해당하지 않는 객체는 그대로 유지
        return data;
      }
    });
    setResponseData(newArray);
  };

  const handleSaveData = () => {
    responseData.map((userData: any) => {
      const data: any = {
        jobGradeId: userData.jobGrade.jobGradeId,
        dateOfJoin: userData.dateOfJoin,
        totalHoliday: userData.totalAnnualLeave,
        salary: userData.salary,
        departId: userData.depart.departmentId,
        position: userData.position,
        job: userData.job,
      };

      const dataToSend: any = {};
      for (let key of Object.keys(data)) {
        const value = data[key];
        if (value) {
          dataToSend[key] = value;
        }
      }

      fetch(
        // `https://dev.risetconstruction.net/preset/profiles/${userData.employeeNum}`,
        `http://13.124.235.23:8080/preset/profiles/${userData.employeeNum}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 여기서 새로운 데이터를 가져와서 페이지에 맞게 렌더링할 수 있음
  };

  // useEffect(() => {
  //   // fetch("https://dev.risetconstruction.net/preset/profiles", {
  //   fetch("http://13.124.235.23:8080/preset/profiles", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // setResponseData(data);
  //       setResponseData(Test);
  //     });
  // }, []);

  /* 부서 */
  // useEffect(() => {
  //   // fetch("https://dev.risetconstruction.net/depart", {
  //   fetch("http://13.124.235.23:8080/depart", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // setDepartIdList(data);
  //       setDepartIdList([
  //         { departId: 1, departName: "개발부서" },
  //         { departId: 2, departName: "영업부서" },
  //         { departId: 3, departName: "인사부서" },
  //         { departId: 4, departName: "마케팅부서" },
  //         { departId: 5, departName: "디자인부서" },
  //         { departId: 6, departName: "재무부서" },
  //       ]);
  //     });
  // }, []);

  /* 등급 */
  // useEffect(() => {
  //   // fetch("https://dev.risetconstruction.net/jobGrade", {
  //   fetch("http://13.124.235.23:8080/jobGrade", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${jwt}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     // .then((data) => setRankIdList(data));
  //     .then((data) =>
  //       setRankIdList(data)
  //     );
  // }, []);

  return (
    <Layout>
      <main className="main">
        <h2 className="title">프로필 관리</h2>
        <TitleBox>
          <SearchBar
            placeholder="이름을 검색하세요"
            value={searchWord}
            onChange={handleSearchName}
          />
          <SaveButton type="button" onClick={handleSaveData}>
            저장하기
          </SaveButton>
        </TitleBox>
        <ProfileTable>
          <TableHeader>
            <div>번호</div>
            <div>사진</div>
            <div>이름</div>
            <div>아이디</div>
            <div>등급</div>
            <div>입사일</div>
            <div>휴가일수</div>
            <div>연봉</div>
            <div>부서</div>
            <div>직책</div>
            <div>직무</div>
            <div>휴대폰</div>
            <div>주소</div>
          </TableHeader>
          {responseData.map((data, index) => (
            <TableLine key={data.employeeNum}>
              <div>{index + 1}</div>
              {data.profile.profileImgPath ? (
                <div>
                  <ProfileImg>
                    <img src={data.profile.profileImgPath} alt={data.name} />
                  </ProfileImg>
                </div>
              ) : (
                <ProfileImg>
                  <Profile />
                </ProfileImg>
              )}

              <div>{data.name}</div>

              <div title={data.employeeId}>{data.employeeId}</div>

              <DropDownBox onClick={() => setCurrentUserId(data.employeeNum)}>
                <DropDown
                  main={data.jobGrade.jobGradeId}
                  dropList={[1, 2, 3]}
                  handleSyncData={handleSyncRank}
                />
              </DropDownBox>

              <div>
                <input
                  type="text"
                  value={data.dateOfJoin || ""}
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="dateOfJoin"
                />
              </div>

              <div>
                <input
                  type="number"
                  value={data.totalAnnualLeave || ""}
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="totalAnnualLeave"
                />
              </div>

              <div>
                <input
                  type="number"
                  value={data.salary || ""}
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="salary"
                />
              </div>

              <DropDownBox onClick={() => setCurrentUserId(data.employeeNum)}>
                <DropDown
                  main={data.depart.departmentName}
                  // dropList={departIdList?.map((dep: any) => dep?.departName)}
                  dropList={[
                    "개발부서",
                    "영업부서",
                    "인사부서",
                    "마케팅부서",
                    "디자인부서",
                    "재무부서",
                  ]}
                  handleSyncData={handleSyncDepart}
                />
              </DropDownBox>

              <div>
                <input
                  type="text"
                  value={data.position}
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="position"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={data.job}
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="job"
                />
              </div>

              <div title={data.phone}>{data.phone}</div>
              <div title={data.address}>{data.address}</div>
            </TableLine>
          ))}
        </ProfileTable>

        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </main>
    </Layout>
  );
}

const Test = [
  {
    address: "경기 성남시 분당구 판교역로 166",
    dateOfJoin: "24. 01. 02",
    depart: {
      departmentId: 1,
      departmentName: "개발부서",
    },
    employeeId: "daniel3636",
    employeeNum: 1,
    job: "프론트엔드",
    jobGrade: {
      jobGradeId: 1,
      grade: "black",
    },
    name: "손다니엘",
    phone: "010-6516-5616",
    position: "팀장",
    profile: {
      profileImgId: 1,
      profileImgName: "myImg",
      profileImgPath: "/sample.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "경기도 성남시 분당구 분당내곡로 131",
    dateOfJoin: "24. 03. 04",
    depart: {
      departmentId: 1,
      departmentName: "개발부서",
    },
    employeeId: "1717kso",
    employeeNum: 2,
    job: "프론트엔드",
    jobGrade: {
      jobGradeId: 2,
      grade: "red",
    },
    name: "김승윤",
    phone: "010-3513-8613",
    position: "연구원",
    profile: {
      profileImgId: 2,
      profileImgName: "myImg",
      profileImgPath: "/sample02.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "서울 중랑구 공릉로 2",
    dateOfJoin: "23. 03. 01",
    depart: {
      departmentId: 5,
      departmentName: "디자인부서",
    },
    employeeId: "attaniy00",
    employeeNum: 3,
    job: "디자이너",
    jobGrade: {
      jobGradeId: 2,
      grade: "red",
    },
    name: "조은샘",
    phone: "010-4568-5613",
    position: "파트장",
    profile: {
      profileImgId: 3,
      profileImgName: "myImg",
      profileImgPath: "/sample03.png",
    },
    salary: 4000,
    totalAnnualLeave: 17,
  },
  {
    address: "서울 송파구 도곡로 434",
    dateOfJoin: "24. 04. 01",
    depart: {
      departmentId: 2,
      departmentName: "영업부서",
    },
    employeeId: "CloudSurfer123",
    employeeNum: 4,
    job: "영업담당자",
    jobGrade: {
      jobGradeId: 3,
      grade: "yellow",
    },
    name: "김민지",
    phone: "010-8651-1235",
    position: "사원",
    profile: {
      profileImgId: 4,
      profileImgName: "myImg",
      profileImgPath: "/sample04.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "서울 관악구 관악로5길 30",
    dateOfJoin: "22. 09. 01",
    depart: {
      departmentId: 6,
      departmentName: "재무부서",
    },
    employeeId: "TechSavvy21",
    employeeNum: 5,
    job: "재무관리자",
    jobGrade: {
      jobGradeId: 1,
      grade: "black",
    },
    name: "김민성",
    phone: "010-5164-1346",
    position: "과장",
    profile: {
      profileImgId: 5,
      profileImgName: "myImg",
      profileImgPath: "/sample05.png",
    },
    salary: 5000,
    totalAnnualLeave: 18,
  },
  {
    address: "경기 안양시 동안구 관양로 13",
    dateOfJoin: "23. 06. 01",
    depart: {
      departmentId: 1,
      departmentName: "개발부서",
    },
    employeeId: "sanghyuk35",
    employeeNum: 6,
    job: "백엔드",
    jobGrade: {
      jobGradeId: 1,
      grade: "black",
    },
    name: "이상혁",
    phone: "010-2384-0193",
    position: "팀장",
    profile: {
      profileImgId: 6,
      profileImgName: "myImg",
      profileImgPath: "/sample06.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "경기 성남시 분당구 내정로 54",
    dateOfJoin: "23. 12. 01",
    depart: {
      departmentId: 1,
      departmentName: "개발부서",
    },
    employeeId: "minseok77",
    employeeNum: 7,
    job: "백엔드",
    jobGrade: {
      jobGradeId: 2,
      grade: "red",
    },
    name: "김민석",
    phone: "010-3892-1983",
    position: "사원",
    profile: {
      profileImgId: 7,
      profileImgName: "myImg",
      profileImgPath: "/sample07.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "서울 영등포구 여의동로3길 10",
    dateOfJoin: "22. 11. 01",
    depart: {
      departmentId: 3,
      departmentName: "인사부서",
    },
    employeeId: "seongmin77",
    employeeNum: 8,
    job: "인사담당자",
    jobGrade: {
      jobGradeId: 1,
      grade: "black",
    },
    name: "김성민",
    phone: "010-3904-2930",
    position: "대리",
    profile: {
      profileImgId: 8,
      profileImgName: "myImg",
      profileImgPath: "/sample08.png",
    },
    salary: 5000,
    totalAnnualLeave: 18,
  },
  {
    address: "경기 김포시 김포한강5로 385",
    dateOfJoin: "23. 12. 10",
    depart: {
      departmentId: 4,
      departmentName: "마케팅부서",
    },
    employeeId: "jiheego84",
    employeeNum: 9,
    job: "마케터",
    jobGrade: {
      jobGradeId: 3,
      grade: "yellow",
    },
    name: "유지희",
    phone: "010-3423-3424",
    position: "사원",
    profile: {
      profileImgId: 9,
      profileImgName: "myImg",
      profileImgPath: "/sample09.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
  {
    address: "서울 서초구 남부순환로 2103",
    dateOfJoin: "23. 19. 10",
    depart: {
      departmentId: 5,
      departmentName: "디자인부서",
    },
    employeeId: "devhoo13",
    employeeNum: 10,
    job: "디자이너",
    jobGrade: {
      jobGradeId: 3,
      grade: "yellow",
    },
    name: "서지후",
    phone: "010-5665-2315",
    position: "사원",
    profile: {
      profileImgId: 10,
      profileImgName: "myImg",
      profileImgPath: "/sample10.png",
    },
    salary: 4000,
    totalAnnualLeave: 16,
  },
];
