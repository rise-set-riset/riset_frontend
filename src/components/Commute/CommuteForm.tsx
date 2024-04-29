import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5";
import React, { useContext, useEffect, useState } from "react";
import RadioButton from "../../common/RadioButton";
import { LuCalendarDays } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import Button from "../../common/Button";
import { EventType } from "./CommuteRecord";
import TimePicker from "../../common/TimePicker";
import { FiArrowRight } from "react-icons/fi";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.div<{ $isDarkmode: boolean }>`
  width: 373px;
  padding: 18px 16px;
  background-color: var(--color-white);
  border: 1px solid
    ${(props) => (props.$isDarkmode ? "var(--color-brand-lightgray)" : "none")};
  border-radius: 8px;
  color: var(--color-black);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form`
  padding: 8px;
`;

const Title = styled.h3`
  font-size: 18px;
`;

const CloseIcon = styled(IoClose)`
  font-size: 1.5rem;
`;

const RadioButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  margin-top: 38px;
  text-align: right;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  margin-top: 40px;
  padding: 0 0.5rem;
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  cursor: pointer;
`;

const CommonSvgIcon = css`
  font-size: 1.5rem;
  color: var(--color-brand-lightgray);
  path {
    stroke: var(--color-brand-lightgray);
  }
`;

const DateIcon = styled(LuCalendarDays)`
  ${CommonSvgIcon}
`;

const DateText = styled.span`
  font-size: 18px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`;

const TimeIcon = styled(FiClock)`
  ${CommonSvgIcon}
`;

const TimeZone = styled.div`
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
`;

const Times = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const TimeZoneText = styled.p`
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;

  .custom-button {
    width: 145px;
    height: 40px;
  }
`;

interface CommuteModalProp {
  form: EventType;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormWay: (way: string) => void;
  handleStartTime: (time: string) => void;
  handleEndTime: (time: string) => void;
}

export default function CommuteForm({
  form,
  setIsFormOpen,
  handleFormWay,
  handleStartTime,
  handleEndTime,
}: CommuteModalProp) {
  const [isCurrentDate, setIsCurrentDate] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [myInfo, setMyInfo] = useState<any>({});
  const jwt = localStorage.getItem("jwt");
  const { isDarkmode } = useContext(DarkModeContext);

  /* 일정 저장 */
  const handleFormSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      commuteDate: form.start || form.commuteDate,
      commuteStart: form.startTime,
      commuteEnd: form.endTime,
      commutePlace: form.way,
      commuteStatus: "END",
    };

    // await fetch("https://dev.risetconstruction.net/commute/add-commute", {
    await fetch("http://43.203.11.249:8080/commute/add-commute", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    });

    setIsFormOpen(false);
  };

  /* 날짜 형식 변환 */
  const dateFormat = (date: string) => {
    const rawDate = date ? new Date(date) : new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"][rawDate.getDay()];
    return `${rawDate.getMonth() + 1} / ${rawDate.getDate()} (${week})`;
  };

  /* 선택한 날짜가 오늘 날짜인지 판별 */
  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);
    setIsCurrentDate(form?.start === currentDate.toISOString().split("T")[0]);
    setCurrentDate(currentDate.toISOString().split("T")[0]);

    // 내 정보 받아오기 (없을 경우 후처리)
    // fetch("https://dev.risetconstruction.net/preset", {
    fetch("http://43.203.11.249:8080/preset", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMyInfo(data));
  }, []);

  return (
    <Layout $isDarkmode={isDarkmode}>
      <Header>
        <Title>출퇴근 기록 추가</Title>
        <CloseIcon onClick={() => setIsFormOpen(false)} />
      </Header>
      <Form onSubmit={handleFormSubmit}>
        <RadioButtons>
          <RadioButton
            name="commute"
            value="HOME"
            checked={form?.way === "HOME"}
            title="재택"
            onChange={(e) => handleFormWay(e.target.value)}
          />
          <RadioButton
            name="commute"
            value="OUTSIDE"
            checked={form?.way === "OUTSIDE"}
            title="외근"
            onChange={(e) => handleFormWay(e.target.value)}
          />
        </RadioButtons>
        <User>
          <strong>직원 :&nbsp;&nbsp;</strong>
          <span>{form.name ? form.name : myInfo?.name}</span>
        </User>
        <DateWrapper>
          <DateIcon />
          <DateText>
            {form ? dateFormat(form?.start) : dateFormat(currentDate)}
          </DateText>
        </DateWrapper>
        <Time>
          <TimeIcon />
          <TimeZone>
            <Times>
              <TimeZoneText>출근</TimeZoneText>
              <TimePicker
                selectedTime={form?.startTime ? form?.startTime : "00:00"}
                setSelectedTime={handleStartTime}
              />
            </Times>
            <FiArrowRight />
            <Times>
              <TimeZoneText>퇴근</TimeZoneText>
              <TimePicker
                selectedTime={form?.endTime ? form?.endTime : "00:00"}
                setSelectedTime={handleEndTime}
              />
            </Times>
          </TimeZone>
        </Time>
        <Buttons>
          <Button
            type="button"
            active={false}
            title="취소"
            handleBtnClick={() => setIsFormOpen(false)}
          />
          <Button
            type="submit"
            active={true}
            title="저장"
            disabled={!isCurrentDate}
          />
        </Buttons>
      </Form>
    </Layout>
  );
}
