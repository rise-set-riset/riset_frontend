import React, { useState } from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";

/* 전체 레이아웃 */
const Layout = styled.div<{ $isFixed: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  background-color: var(--color-brand-main);

  input {
    font-size: 18px;
    font-weight: bold;
    color: ${(props) =>
      props.$isFixed ? "var(--color-black)" : "var(--color-brand-lightgray)"};
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
  background-color: var(--color-white);
`;

const TimeInputBox = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  input {
    display: block;
  }
`;

const ContentInputBox = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 18px;
`;

/* 수정, 삭제, 저장 버튼*/
const MenuButton = styled.div<{ $isFixed: boolean }>`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.$isFixed ? "flex-end" : "center")};
  align-items: center;
  border-radius: 0 16px 16px 0;
  background-color: ${(props) =>
    props.$isFixed ? "var(--color-white)" : "var(--color-brand-yellow)"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$isFixed
        ? "var(--color-brand-lightgray)"
        : "var(--color-brand-orange)"};
  }
`;

/* Vertical Icon */
const Moremenu = styled.div`
  position: relative;
  margin-right: 12px;
  font-size: 1.2rem;
`;

/* 수정, 삭제 드롭다운 메뉴 */
const DropdownMenu = styled.ul`
  z-index: 5;
  position: absolute;
  right: 0;
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
`;

/* 일정 객체 형식 */
interface DayPlanType {
  id?: number;
  startTime?: string;
  endTime?: string;
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
}

export default function PlanCard({
  clickToAdd,
  isEditable,
  planContent,
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

  /* 일정 상태값 변경 */
  const handleChangePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayPlan((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  /* Vertical Icon 또는 저장 메뉴 */
  const handlePlanMenu = () => {
    if (isFixed) {
      /* Vertical Icon일 땐 드롭다운 메뉴 표시 설정 */
      setIsMenuOpen(!isMenuOpen);
    } else {
      /* 저장 버튼일 때*/
      setIsFixed(true);

      const savePlanForm = {
        startTime: dayPlan.startTime || "",
        endTime: dayPlan.endTime || "",
        title: dayPlan.title || "",
      };
      if (clickToAdd) {
        /* 추가 기능일 때 */
        // fetch("", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${jwt}`,
        //     },
        //     body: JSON.stringify(savePlanForm),
        // }).then((res) => {
        //     if (res.ok) {
        //         console.log("ok");
        //     } else {
        //         throw new Error("일정 추가 실패");
        //     }
        // });
      } else {
        /* 수정 기능일 때 */
        // fetch("", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${jwt}`,
        //     },
        //     body: JSON.stringify(savePlanForm),
        // }).then((res) => {
        //     if (res.ok) {
        //         console.log("ok");
        //     } else {
        //         throw new Error("일정 수정 실패");
        //     }
        // });
      }
    }
  };

  /* 일정 삭제 */
  const handlRemovePlan = () => {
    // 삭제요청
    // fetch(`/${planContent.id}`, {
    //     method: "DELETE",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${jwt}`,
    //     }
    // }).then((res) => {
    //     if (res.ok) {
    //         console.log("ok");
    //     } else {
    //         throw new Error("일정 수정 실패");
    //     }
    // });
  };

  return (
    <Layout $isFixed={isFixed}>
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
