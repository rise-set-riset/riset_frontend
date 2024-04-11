import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Layout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

/* 최종 시간값 표시되는 버튼 */
const SelectDateButton = styled.button`
  font-size: 18px;
  font-weight: 500;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

/* 시간 선택 팝업창 */
const TimePickerLayout = styled.div`
  position: absolute;
  z-index: 10;
  height: 220px;
  top: 30px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: var(--color-white);
  box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
`;

const TimeListBox = styled.ul`
  width: 100px;
  overflow-y: auto;
  text-align: center;

  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }
`;

const TimeItem = styled.li<{ $fixed: boolean }>`
  padding: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) =>
    props.$fixed ? "var(--color-white)" : "var(--color-balck)"};
  background-color: ${(props) =>
    props.$fixed ? "var(--color-brand-yellow)" : "var(--color-wthie)"};

  &:hover {
    color: var(--color-white);
    background-color: var(--color-brand-yellow);
  }
`;

const TimeTitle = styled.li`
  padding: 0.5rem;
  font-weight: bold;
  color: var(--color-white);
  background-color: var(--color-brand-main);
`;

/* 시간, 날짜 리스트 */
const hourList = Array.from({ length: 25 }, (_, index) =>
  index.toString().padStart(2, "0")
);

const minList = Array.from({ length: 12 }, (_, index) =>
  String(index * 5).padStart(2, "0")
);

interface TimePickerProps {
  /* 
    selectedTime: 선택한 시간 상태값
    setSelectedTime: 선택한 시간 상태 설정 함수
    */
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

export default function TimePicker({
  selectedTime = "00:00",
  setSelectedTime,
}: TimePickerProps) {
  /*
    isPickerOpen: 시간 선택 팝업창 표시 여부
    isFixedHour: 시간 선택 여부
    isFixedMin : 분 선택 여부
    */
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [isFixedHour, setIsFixedHour] = useState<boolean>(false);
  const [isFixedMin, setIsFixedMin] = useState<boolean>(false);

  /* 팝업창 표시 여부 제어 함수 */
  const handlePickerOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPickerOpen(!isPickerOpen);
  };

  /* 시간 선택 제어 함수 */
  const handleSelectTime = (name: string, time: string) => {
    if (name === "hour") {
      const minute = selectedTime.split(":")[1];
      setSelectedTime(`${time}:${minute}`);
      setIsFixedHour(true);
    } else {
      const hour = selectedTime.split(":")[0];
      setSelectedTime(`${hour}:${time}`);
      setIsFixedMin(true);
    }
  };

  /* 시간과 분 모두 선택할 시 팝업창 닫기 */
  useEffect(() => {
    if (isFixedHour && isFixedMin) {
      setIsPickerOpen(false);
    }
  }, [isFixedHour, isFixedMin]);

  return (
    <Layout>
      <SelectDateButton
        type="button"
        id="event-input-start-time"
        className="event-input-time"
        onClick={handlePickerOpen}
      >
        {selectedTime}
      </SelectDateButton>
      {isPickerOpen && (
        <TimePickerLayout>
          <TimeListBox>
            <TimeTitle>시간</TimeTitle>
            {hourList.map((hour, index) => (
              <TimeItem
                $fixed={hour === selectedTime.split(":")[0]}
                key={index}
                onClick={() => handleSelectTime("hour", hour)}
              >
                {hour}
              </TimeItem>
            ))}
          </TimeListBox>
          <TimeListBox>
            <TimeTitle>분</TimeTitle>
            {minList.map((minute, index) => (
              <TimeItem
                $fixed={minute === selectedTime.split(":")[1]}
                key={index}
                onClick={() => handleSelectTime("minute", minute)}
              >
                {minute}
              </TimeItem>
            ))}
          </TimeListBox>
        </TimePickerLayout>
      )}
    </Layout>
  );
}
