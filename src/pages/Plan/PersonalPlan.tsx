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
  unEditablePlan?: PlanDetailType[];
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
          setUserPlanData({
            employeeId: data[0].employeeId,
            name: data[0].name,
            department: data[0].department,
            position: data[0].position,
            image: data[0].image,
            planList: data[0].schedulesDetail,
            unEditablePlan: [
              ...data[0].annualLeaveDetail,
              ...data[0].halfLeaveDetail,
              data[0].commuteStartTime && {
                startTime: data[0].commuteStartTime,
                endTime: data[0].commuteEndTime,
                title: data[0].commutePlace,
              },
            ],
          });
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
        }
      });
  }, [currentDate]);

  // console.log(responseData);
  console.log(currentDate);
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
