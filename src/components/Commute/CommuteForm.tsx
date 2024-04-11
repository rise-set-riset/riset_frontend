import styled, { css } from "styled-components";
import { IoClose } from "react-icons/io5";
import React, { useState } from "react";
import RadioButton from "../../common/RadioButton";
import { LuCalendarDays } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import Button from "../../common/Button";
import { EventType } from "./CommuteRecord";

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

const Date = styled.div`
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
}

export default function CommuteForm({ form, setIsFormOpen }: CommuteModalProp) {
  /* form 제출 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <Header>
        <Title>출퇴근 기록 추가</Title>
        <CloseIcon onClick={() => setIsFormOpen(false)} />
      </Header>
      <Form onSubmit={handleSubmit}>
        <RadioButtons>
          <RadioButton name="commute" value="1" title="재택" />
          <RadioButton name="commute" value="2" title="외근" />
        </RadioButtons>
        <User>
          <strong>직원 :&nbsp;&nbsp;</strong>
          {form.name}
        </User>
        <Date>
          <DateIcon />
          <DateText>4 / 8(월)</DateText>
        </Date>
        <Time>
          <TimeIcon />
          <TimeZone>
            <Times>
              <TimeZoneText>출근</TimeZoneText>
              <div>{form.startTime}</div>
            </Times>
            <p>--</p>
            <Times>
              <TimeZoneText>퇴근</TimeZoneText>
              <div>{form.endTime}</div>
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
