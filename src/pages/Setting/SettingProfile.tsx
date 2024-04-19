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
  color: var(--color-white);
  margin-left: 1rem;
  border: 1px solid var(--color-brand-main);
  border-radius: 8px;
  padding: 0.5rem;
  font-weight: bold;
  min-width: 88px;
  height: 45px;
  cursor: pointer;
`;

const ProfileTable = styled.div`
  margin: 4rem 1rem;
  display: grid;
  grid-template-rows: 36px repeat(auto-fill, 66px);
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 80px 100px 100px 80px 100px 90px 100px 130px 80px 100px 200px 200px;

  div {
    background-color: var(--color-brand-main);
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--color-white);
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
`;

const ProfileImg = styled.div`
  img,
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
  const [responseData, setResponseData] = useState<ResponseDataType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(10);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>([]);

  const [departIdList, setDepartIdList] = useState<any>();
  const [rankIdList, setRankIdList] = useState<any>();
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
        `https://dev.risetconstruction.net/preset/profiles/${userData.employeeNum}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(dataToSend),
        }
      ).then((res) => {
        if (res.ok) {
          console.log("ok");
        }
      });
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 여기서 새로운 데이터를 가져와서 페이지에 맞게 렌더링할 수 있음
  };

  useEffect(() => {
    fetch("https://dev.risetconstruction.net/preset/profiles", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
      });
  }, []);

  /* 부서 */
  useEffect(() => {
    fetch("https://dev.risetconstruction.net/depart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDepartIdList(data);
      });
  }, []);

  /* 등급 */
  useEffect(() => {
    fetch("https://dev.risetconstruction.net/jobGrade", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRankIdList(data));
  }, []);

  return (
    <Layout>
      <main className="main">
        <h2 className="title">조직원 프로필</h2>
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
            <TableLine key={data.employeeId}>
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
                  dropList={departIdList?.map((dep: any) => dep?.departName)}
                  handleSyncData={handleSyncDepart}
                />
              </DropDownBox>

              <div>
                <input
                  type="text"
                  onChange={(e) => handleChageInput(e, data.employeeNum)}
                  name="position"
                />
              </div>

              <div>
                <input
                  type="text"
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
