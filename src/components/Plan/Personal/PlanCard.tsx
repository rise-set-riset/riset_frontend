import React, { useState } from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";

const Layout = styled.div<{ $isFixed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  background-color: var(--color-brand-main); //바뀜
  cursor: pointer;

  //바뀜
  input {
    border: none;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: ${(props) =>
      props.$isFixed ? "var(--color-black)" : "var(--color-brand-lightgray)"};
    /* color: var(--color-brand-lightgray); */
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: var(--color-brand-lightgray);
    }
    &:hover {
      &::placeholder {
        color: var(--color-black);
      }
    }
    &:disabled {
      background-color: var(--color-white);
      color: var(--color-black);
    }
  }
`;

const PlanInfoBox = styled.div`
  width: 100%;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  padding: 12px 1rem;
  gap: 1.5rem;
`;

//바뀜
const MenuButton = styled.div<{ $isFixed: boolean }>`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: ${(props) => (props.$isFixed ? "flex-end" : "center")};
  align-items: center;
  border-radius: 0 16px 16px 0;

  cursor: pointer;
  background-color: ${(props) =>
    props.$isFixed ? "var(--color-white)" : "var(--color-brand-yellow)"};
  &:hover {
    background-color: var(--color-brand-lightgray);
  }
`;

const Moremenu = styled.div`
  font-size: 1.2rem;
  margin-right: 12px;
  position: relative;
`;

const DropdownMenu = styled.ul`
  background-color: var(--color-white);
  position: absolute;
  width: 4rem;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
  border-radius: 12px;
  padding: 0.5rem 0;

  li {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      color: var(--color-brand-main);
    }
  }
`;

const SaveMenu = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const TimeInputBox = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 4px;
  input {
    display: block;
  }
`;

const ContentInputBox = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  font-size: 18px;
`;

interface DayPlanType {
  [key: string]: string;
}

interface PlanCardProps {
  clickToAdd: boolean;
  planContent: DayPlanType;
}

export default function PlanCard({ clickToAdd, planContent }: PlanCardProps) {
  const [isFixed, setIsFixed] = useState<boolean>(!clickToAdd);
  const [dayPlan, setDayPlan] = useState<DayPlanType>(planContent);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleChangePlan = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayPlan((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePlanMenu = () => {
    if (isFixed) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setIsFixed(true);
      // 수정 및 추가 데이터 보내기
      // fetch("")
    }
  };

  const handlRemovePlan = () => {
    // 삭제요청
    //fetch
  };
  return (
    <Layout $isFixed={isFixed}>
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
      <MenuButton $isFixed={isFixed} onClick={handlePlanMenu}>
        {isFixed ? (
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
          <SaveMenu>저장</SaveMenu>
        )}
      </MenuButton>
    </Layout>
  );
}
