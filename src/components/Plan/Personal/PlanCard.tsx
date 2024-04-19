import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";

/* 전체 레이아웃 */
const Layout = styled.div<{ $isFixed: boolean; $stateColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${(props) => props.$stateColor};

  input {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) => (props.$isFixed ? "var(--color-black)" : "var(--color-brand-lightgray)")};
    border: none;

    &::placeholder {
      color: var(--color-brand-lightgray);
    }

    &:disabled {
      background-color: var(--color-white);
      color: var(--color-black);
    }

    &:focus {
      outline: none;
      /* cursor:  */
    }

    &:hover {
      &::placeholder {
        color: var(--color-black);
      }
    }
  }
`;

/* 시간, 내용 표시 */
const PlanInfoBox = styled.div`
  width: 100%;
  margin-left: 1rem;
  padding: 12px 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--color-white-darkgray);
`;

const TimeInputBox = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  input {
    display: block;
    background-color: var(--color-white-darkgray);
  }
`;

const ContentInputBox = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 18px;
  background-color: var(--color-white-darkgray);
`;

/* 수정, 삭제, 저장 버튼*/
const MenuButton = styled.div<{ $isFixed: boolean }>`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.$isFixed ? "flex-end" : "center")};
  justify-content: center;
  align-items: center;
  border-radius: 0 16px 16px 0;
  background-color: ${(props) =>
    props.$isFixed ? "var(--color-white)" : "var(--color-brand-yellow)"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$isFixed ? "var(--color-brand-lightgray)" : "var(--color-brand-orange)"};
  }
`;

/* Vertical Icon */
const Moremenu = styled.div`
  position: relative;
  margin-right: 12px;
  height: 100%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 수정, 삭제 드롭다운 메뉴 */
const DropdownMenu = styled.ul`
  height: 100%;
  z-index: 10;
  position: absolute;
  right: 1.5rem;
  width: 4rem;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);

  li {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;

    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

/* 저장 버튼 */
const SaveMenu = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #353535;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* 일정 객체 형식 */
interface DayPlanType {
  id?: number;
  startTime: string;
  endTime: string;
  title?: string;
}

interface PlanCardProps {
  /*
  clickToAdd: 추가 버튼 눌러서 생성된 컴포넌트인지
  planContent: 일정 내용 객체
  */
  clickToAdd: boolean;
  isEditable: boolean;
  planContent: DayPlanType;
  setUserPlanData?: React.Dispatch<React.SetStateAction<any>>;
  currentDate?: Date;
  setMyPlanList?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlanCard({
  clickToAdd,
  isEditable,
  planContent,
  setUserPlanData,
  currentDate,
  setMyPlanList,
}: PlanCardProps) {
  /* 
  isFixed: 고정 여부
  dayPlan: 일정 내용
  isMenuOpen: 수정, 삭제 메뉴 표시 여부
  */
  const jwt = localStorage.getItem("jwt");
  const [isFixed, setIsFixed] = useState<boolean>(!clickToAdd);
  const [dayPlan, setDayPlan] = useState<DayPlanType>(planContent);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [stateColor, setStateColor] = useState<string>("");
  const [planStartTime, setPlanStartTime] = useState<string>("");
  const [planEndTime, setPlanEndTime] = useState<string>("");

  useEffect(() => {
    // 시작시간과 종료시간이 둘다 있는지 검증
    const timePattern = /^(0[0-9]|1[0-2]):[0-5][0-9]$/;
    if (timePattern.test(planContent.startTime) && timePattern.test(planContent.endTime)) {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();

      // 시간 비교
      if (currentHour > Number(planContent.endTime.split(":")[0])) {
        setStateColor("#C5DAFF"); // 진행완료
      } else if (currentHour < Number(planContent.startTime.split(":")[0])) {
        setStateColor("#FFBFA7"); // 진행전
      } else {
        // 분 비교
        if (currentMinute > Number(planContent.endTime.split(":")[1])) {
          setStateColor("#C5DAFF"); // 진행완료
        } else if (currentMinute < Number(planContent.startTime.split(":")[1])) {
          setStateColor("#FFBFA7"); // 진행전
        } else {
          setStateColor("#FFE7A7"); // 진행중
        }
      }
    } else {
      setStateColor("var(--color-brand-main)");
    }
  }, [planStartTime, planEndTime]);

  /* 일정 상태값 변경 */
  const handleChangePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayPlan((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    if (e.target.name === "startTime") {
      setPlanStartTime(e.target.value);
    } else {
      setPlanEndTime(e.target.value);
    }
  };

  const handleSavePlan = (savePlanForm: any) => {
    /* 추가 기능일 때 */
    fetch(`https://dev.risetconstruction.net/api/employees/addEmployees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(savePlanForm),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => console.log("값", data));
    // .then((data) => {
    //   console.log("iddata", data);
    // setUserPlanData(prev => {
    //   if (prev) {
    //     return {
    //   ...prev,
    //   planList: [...prev.planList, savePlanForm]
    //     }}})
    // });
  };

  /* Vertical Icon 또는 저장 메뉴 */
  const handlePlanMenu = () => {
    if (isFixed) {
      /* isFixed=true일 땐 Vertical Icon => 드롭다운 메뉴 표시 설정 */
      setIsMenuOpen(!isMenuOpen);
    } else {
      if (dayPlan.startTime && dayPlan.endTime && dayPlan.title) {
        const savePlanForm = {
          startTime: currentDate?.toISOString().slice(0, 11) + dayPlan.startTime,
          endTime: currentDate?.toISOString().slice(0, 11) + dayPlan.endTime,
          title: dayPlan.title,
        };
        // console.log(savePlanForm);
        if (clickToAdd) {
          handleSavePlan(savePlanForm);
        } else {
          handleUpdatePlan(savePlanForm);
        }
        setIsFixed(true);
      }
    }
  };

  const handleUpdatePlan = (savePlanForm: any) => {
    /* 수정 기능일 때 */
    fetch(`https://dev.risetconstruction.net/api/employees/updateSchedule`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        ...savePlanForm,
        ScheduleId: planContent.id,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("ok");
      }
    });
  };

  /* 일정 삭제 */
  const handlRemovePlan = () => {
    // 삭제요청
    fetch(`https://dev.risetconstruction.net/api/employees/deleteSchedule?id=${planContent.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      // if (res.ok) {
      // setMyPlanList((prev: any) =>
      //   prev.filter((plan: any) => plan.id !== planContent.id)
      // );
      // }
    });
  };

  return (
    <Layout $isFixed={isFixed} $stateColor={stateColor}>
      {/* 일정 내용 */}
      <PlanInfoBox>
        <TimeInputBox>
          <input
            type="text"
            name="startTime"
            value={dayPlan.startTime}
            onChange={handleChangePlan}
            placeholder="00:00"
            disabled={isFixed}
          />
          <p>~</p>
          <input
            type="text"
            name="endTime"
            value={dayPlan.endTime}
            onChange={handleChangePlan}
            placeholder="00:00"
            disabled={isFixed}
          />
        </TimeInputBox>

        <ContentInputBox
          type="text"
          name="title"
          value={dayPlan.title}
          onChange={handleChangePlan}
          placeholder="내용을 입력하세요"
          disabled={isFixed}
        />
      </PlanInfoBox>

      {/* 부가 메뉴 */}
      {isEditable && (
        <MenuButton $isFixed={isFixed} onClick={handlePlanMenu}>
          {isFixed ? (
            /* Vertical Icon 메뉴*/
            <Moremenu>
              <FiMoreVertical />
              {isMenuOpen && (
                <DropdownMenu>
                  <li onClick={() => setIsFixed(false)}>수정</li>
                  <li onClick={handlRemovePlan}>삭제</li>
                </DropdownMenu>
              )}
            </Moremenu>
          ) : (
            /* 저장 메뉴 */
            <SaveMenu>저장</SaveMenu>
          )}
        </MenuButton>
      )}
    </Layout>
  );
}
