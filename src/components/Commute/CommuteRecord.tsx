import styled from "styled-components";
import CommuteMap from "./CommuteMap";
import { GoPlusCircle } from "react-icons/go";
import Button from "../../common/Button";
import { useState } from "react";
import Calendar from "../../common/Calendar";
import Modal from "../../common/Modal";
import CommuteForm from "./CommuteForm";

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

const CommuteCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  min-width: 460px;
  height: 570px;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--color-white);
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
  const [isWork, setIsWork] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [form, setForm] = useState<EventType>({});

  /* 출/퇴근 버튼 클릭에 따른 active 버튼 전환 */
  const handleIsWork = () => {
    setIsWork((prev) => !prev);
  };

  /* Form Submit */
  const handleIsFormOpen = (data: any) => {
    setIsFormOpen(true);
    setForm(data);
  };

  return (
    <Layout>
      <CommuteCard>
        <Title>
          <h2>출퇴근 기록</h2>
          <PlusBtn onClick={() => setIsFormOpen(true)} />
        </Title>
        <CommuteMap setAddress={setAddress} setIsInRange={setIsInRange} />
        <CurrentPosition>
          <strong>현재 위치</strong>
          <span>&nbsp;&nbsp;{address}</span>
        </CurrentPosition>
        <CommuteButtons>
          <Button
            type="button"
            active={!isWork && isInRange}
            title="출근"
            handleBtnClick={handleIsWork}
          />
          <Button
            type="button"
            active={isWork && isInRange}
            title="퇴근"
            handleBtnClick={handleIsWork}
          />
        </CommuteButtons>
      </CommuteCard>
      <CommuteCard>
        <Title>
          <h2>출퇴근 현황</h2>
        </Title>
        <CalendarWrapper>
          <Calendar isEvents={true} handleIsFormOpen={handleIsFormOpen} />
        </CalendarWrapper>
      </CommuteCard>
      <Modal isModalOpen={isFormOpen} handleIsModalOpen={setIsFormOpen}>
        <CommuteForm setIsFormOpen={setIsFormOpen} form={form} />
      </Modal>
    </Layout>
  );
}
