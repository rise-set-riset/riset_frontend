import { useEffect, useState } from "react";
import styled from "styled-components";
import PlanList from "../../components/Plan/Personal/PlanList";
import DateSlider from "../../components/Plan/Personal/DateSlider";
import PlanSearch from "../../components/Plan/Personal/PlanSearch";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MainContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem;
`;

interface ResponseDataType {
  employeeId: number;
  name: string;
  department?: string;
  position?: string;
  image: string;
  commuteStartTime: string;
  commuteEndTime: string;
  commutePlace: string;
  booleanResponse: {
    halfLeave: boolean;
    annualLeave: boolean;
    schedules: boolean;
  };
  halfLeaveDetail: PlanDetailType[];
  schedulesDetail: PlanDetailType[];
  annualLeaveDetail: PlanDetailType[];
}

interface PlanDataType {
  employeeId: number;
  name: string;
  department?: string;
  position?: string;
  image: string;
  editablePlan: PlanDetailType[];
  unEditablePlan: PlanDetailType[];
}

interface PlanDetailType {
  id?: number;
  startTime: string;
  endTime?: string;
  title: string;
}

export default function PersonalPlan() {
  /* 선택한 날짜 상태값 */
  const jwt = localStorage.getItem("jwt");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [responseData, setResponseData] = useState<ResponseDataType[] | []>([]);
  const [allPlanData, setAllPlanData] = useState<any>([]);
  const [myPlan, setMyPlan] = useState<any>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ResponseDataType[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("이름");

  /* 이름 검색 */
  const handleSearchWord: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchWord(e.target.value);
    const currentSearchWord = e.target.value.trim();
    if (currentSearchWord === "") {
      setSearchResult(responseData);
    } else {
      setSearchResult(
        responseData.filter((room) =>
          room?.name?.toLowerCase().includes(currentSearchWord.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const setFitDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      currentDate.getDate() + 1
    );
    const requestDate = setFitDate.toISOString().slice(0, 10);
    console.log(requestDate);
    fetch(
      // `https://dev.risetconstruction.net/api/employees?employeeDate=${requestDate}`,
      `https://dev.risetconstruction.net/api/employees?employeeDate=2024-04-08`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res.ok);
        res.json();
      } else {
        console.log("통신실패");
      }
    });
    // .then((data) => setResponseData(data));

    // fetch("/test.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setResponseData(data);
    //   });
  }, [currentDate]);

  /* 데이터 형식 변환 */
  useEffect(() => {
    const modifiedData = responseData.map((data) => {
      const unEditablePlan = [
        ...data.annualLeaveDetail,
        ...data.halfLeaveDetail,
        data.commuteStartTime && {
          startTime: data.commuteStartTime,
          endTime: data.commuteEndTime,
          title: data.commutePlace,
        },
      ];

      return {
        employeeId: data.employeeId,
        name: data.name,
        department: data.department,
        position: data.position,
        image: data.image,
        editablePlan: data.schedulesDetail,
        unEditablePlan: unEditablePlan,
      };
    });

    // setMyPlan(modifiedData.filter((plan) => plan.employeeId === userId))
    setAllPlanData(modifiedData);
  }, [responseData]);

  return (
    <Layout>
      <main className="main">
        <h2 className="title">근무일정</h2>
        <MainContentLayout>
          <DateSlider setCurrentDate={setCurrentDate} />
          <PlanSearch
            searchWord={searchWord}
            // handleSearchWord={handleSearchWord}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          {allPlanData.length > 0 && (
            <PlanList
              allPlanData={allPlanData}
              setAllPlanData={setAllPlanData}
            />
          )}
        </MainContentLayout>
      </main>
    </Layout>
  );
}
