import styled from "styled-components";
import CommuteMap from "./CommuteMap";
import { GoPlusCircle } from "react-icons/go";
import Button from "../../common/Button";
import { useContext, useEffect, useState } from "react";
import Calendar from "../../common/Calendar";
import Modal from "../../common/Modal";
import CommuteForm from "./CommuteForm";
import { DarkModeContext } from "../../contexts/DarkmodeContext";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1.7rem;
  gap: 1.7rem;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

const CommuteCard = styled.div<{ $isDarkmode: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  min-width: 460px;
  height: 570px;
  border-radius: 1rem;
  border: ${(props) =>
    props.$isDarkmode ? "1px solid var(--color-brand-lightgray)" : "none"};
  padding: 1rem;
  background-color: var(--color-white);

  @media screen and (max-width: 500px) {
    width: 350px;
    min-width: auto;
    height: 100%;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PlusBtn = styled(GoPlusCircle)`
  font-size: 30px;
`;

const CurrentPosition = styled.p`
  width: 100%;
  margin-top: 1rem;
  text-align: right;
`;

const CommuteButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 37px;
  .custom-button {
    width: 200px;
    height: 50px;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export interface EventType {
  [key: string]: string;
}

export default function CommuteRecord() {
  const [address, setAddress] = useState<string>("");
  const [isInRange, setIsInRange] = useState<boolean>(false);
  const [workStatus, setWorkStatus] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [form, setForm] = useState<EventType>({});
  const jwt = localStorage.getItem("jwt");
  const { isDarkmode } = useContext(DarkModeContext);

  /* 근무, 재택, 외근 여부 */
  const handleFormWay = (way: string) => {
    setForm((prev) => ({ ...prev, way }));
  };

  /* 시간 여부 */
  const handleStartTime = (startTime: string) => {
    setForm((prev) => ({ ...prev, startTime }));
  };

  /* 시간 여부 */
  const handleEndTime = (endTime: string) => {
    setForm((prev) => ({ ...prev, endTime }));
  };

  /* 출근, 퇴근 버튼 클릭 시 */
  const handleSubmit = async () => {
    const now: Date = new Date();
    // 출/퇴근 날짜
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const commuteDate = `${year}-${month}-${day}`;
    // 출/퇴근 시간
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const commuteTime = `${hours}:${minutes}`;

    if (!workStatus) {
      // 출근 데이터
      await fetch(
        // "https://dev.risetconstruction.net/commute/register-commute",
        "http://13.124.235.23:8080/commute/register-commute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            commuteDate,
            commuteStart: commuteTime,
            commutePlace: "HEADQUARTERS",
            commuteStatus: "START",
          }),
        }
      );
      setWorkStatus("START");
    } else if (workStatus === "START") {
      // 퇴근 데이터
      // await fetch("https://dev.risetconstruction.net/commute/get-off", {
      await fetch("http://13.124.235.23:8080/commute/get-off", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          commuteEnd: commuteTime,
          commuteStatus: "END",
        }),
      });
      setWorkStatus("END");
    }
  };

  /* 달력 클릭해서 Form 열기 */
  const handleIsFormOpen = (data: EventType) => {
    setForm(data);
    setIsFormOpen(true);
    setIsPlusClick(false);
  };

  /* 버튼(+) 클릭해서 Form 열기 */
  const handleAddFormBtn = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    await fetch(
      // `https://dev.risetconstruction.net/commute/commute-history?year=${year}&month=${month}`,
      `http://13.124.235.23:8080/commute/commute-history?year=${year}&month=${month}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setForm(data[data.length - 1]));

    setIsPlusClick(true);
    setIsFormOpen(true);
  };

  /* 새로고침, 재접속 시 출근, 퇴근 버튼 클릭 여부 판단하기 */
  useEffect(() => {
    // fetch("https://dev.risetconstruction.net/commute/get-status", {
    fetch("http://13.124.235.23:8080/commute/get-status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setWorkStatus(data.status);
        } else {
          setWorkStatus(data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const [isPlusClick, setIsPlusClick] = useState<boolean>(false);

  return (
    <Layout className="commute-record">
      <CommuteCard className="commute-map" $isDarkmode={isDarkmode}>
        <Title>
          <h2>출퇴근 기록</h2>
          <PlusBtn onClick={handleAddFormBtn} />
        </Title>
        <CommuteMap setAddress={setAddress} setIsInRange={setIsInRange} />
        <CurrentPosition>
          <strong>현재 위치</strong>
          <span>&nbsp;&nbsp;{address}</span>
        </CurrentPosition>
        <CommuteButtons>
          <Button
            type="button"
            active={!workStatus && isInRange}
            title="출근"
            handleBtnClick={handleSubmit}
            disabled={!isInRange}
          />
          <Button
            type="button"
            active={workStatus === "START" && isInRange}
            title="퇴근"
            disabled={!isInRange}
            handleBtnClick={handleSubmit}
          />
        </CommuteButtons>
      </CommuteCard>
      <CommuteCard className="commute-calendar" $isDarkmode={isDarkmode}>
        <Title>
          <h2>출퇴근 현황</h2>
        </Title>
        <CalendarWrapper>
          <Calendar isEvents={true} handleIsFormOpen={handleIsFormOpen} />
        </CalendarWrapper>
      </CommuteCard>
      <Modal isModalOpen={isFormOpen} handleIsModalOpen={setIsFormOpen}>
        <CommuteForm
          form={form}
          setIsFormOpen={setIsFormOpen}
          handleFormWay={handleFormWay}
          handleStartTime={handleStartTime}
          handleEndTime={handleEndTime}
          isPlusClick={isPlusClick}
        />
      </Modal>
    </Layout>
  );
}
