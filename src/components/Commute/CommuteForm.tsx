import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5";
import React from "react";
import RadioButton from "../../common/RadioButton";
import { LuCalendarDays } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import Button from "../../common/Button";
import { EventType } from "./CommuteRecord";
import TimePicker from "../../common/TimePicker";

const Layout = styled.div`
  width: 373px;
  padding: 18px 16px;
  background-color: var(--color-white);
  border-radius: 8px;
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
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // API 필요
    // await fetch("url", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer 토큰명",
    //   },
    //   body: JSON.stringify(form),
  };

  /* 날짜 형식 변환 */
  const dateFormat = (date: string) => {
    const rawDate = date ? new Date(date) : new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"][rawDate.getDay()];
    return `${rawDate.getMonth() + 1} / ${rawDate.getDate()} (${week})`;
  };

  return (
    <Layout>
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
          <span>{form?.name}</span>
        </User>
        <DateWrapper>
          <DateIcon />
          <DateText>{dateFormat(form?.start)}</DateText>
        </DateWrapper>
        <Time>
          <TimeIcon />
          <TimeZone>
            <Times>
              <TimeZoneText>출근</TimeZoneText>
              <TimePicker selectedTime={form?.startTime} setSelectedTime={handleStartTime} />
            </Times>
            <p>--</p>
            <Times>
              <TimeZoneText>퇴근</TimeZoneText>
              <TimePicker selectedTime={form?.endTime} setSelectedTime={handleEndTime} />
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
          <Button type="submit" active={true} title="추가하기" />
        </Buttons>
      </Form>
    </Layout>
  );
}
