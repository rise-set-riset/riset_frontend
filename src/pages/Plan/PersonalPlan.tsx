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
  const [searchWord, setSearchWord] = useState<string>("");
  const [searchResult, setSearchResult] = useState<ResponseDataType[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("이름");

  const [userPlanData, setUserPlanData] = useState<any>({});
  const [otherPlanData, setOtherPlanData] = useState<any>([]);

  const [selectedMemberId, setSelectedMemberId] = useState<number>(0);

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
    fetch(
      `https://dev.risetconstruction.net/api/employees?employeeDate=${currentDate
        .toISOString()
        .slice(0, 10)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setResponseData(data);
        }
      });
  }, [currentDate]);

  /* 데이터 형식 변환 */
  useEffect(() => {
    if (responseData.length > 0) {
      /* 본인 일정 */
      setUserPlanData({
        employeeId: responseData[0].employeeId,
        name: responseData[0].name,
        department: responseData[0].department,
        position: responseData[0].position,
        image: responseData[0].image,
        planList: responseData[0].schedulesDetail,
        unEditablePlan: [
          ...responseData[0].annualLeaveDetail,
          ...responseData[0].halfLeaveDetail,
          responseData[0].commuteStartTime && {
            startTime: responseData[0].commuteStartTime,
            endTime: responseData[0].commuteEndTime,
            title: responseData[0].commutePlace,
          },
        ],
      });
    }
    if (responseData.length > 1) {
      /* 타인 일정 */
      const modifiedData = responseData.slice(1).map((data) => {
        return {
          employeeId: data.employeeId,
          name: data.name,
          department: data.department,
          position: data.position,
          image: data.image,
          planList: [
            ...[
              ...data.annualLeaveDetail,
              ...data.halfLeaveDetail,
              data.commuteStartTime && {
                startTime: data.commuteStartTime,
                endTime: data.commuteEndTime,
                title: data.commutePlace,
              },
            ],
            ...data.schedulesDetail,
          ],
        };
      });
      setOtherPlanData(modifiedData);
    }
  }, [currentDate]);

  console.log("=============처음 진입시 날짜", currentDate);
  const handleTest = (searchWord: string) => {};

  return (
    <Layout>
      <main className="main">
        <h2 className="title">근무일정</h2>
        <MainContentLayout>
          <DateSlider setCurrentDate={setCurrentDate} />
          <PlanSearch
            searchWord={searchWord}
            handleSearchWord={handleTest}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />

          <PlanList
            currentDate={currentDate}
            userPlanData={userPlanData}
            setUserPlanData={setUserPlanData}
            otherPlanData={otherPlanData}
            setOtherPlanData={setOtherPlanData}
            selectedMemberId={selectedMemberId}
            setSelectedMemberId={setSelectedMemberId}
          />
        </MainContentLayout>
      </main>
    </Layout>
  );
}
