import React from "react";
import styled from "styled-components";
import { FiMoreVertical } from "react-icons/fi";

const Layout = styled.div`
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
    }
  }
`;

const PlanInfoBox = styled.div`
  width: 100%;
  margin-left: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white);
  padding: 12px 1rem;
  gap: 1.5rem;
`;

//바뀜
const MenuButton = styled.div`
  width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 16px 16px 0;

  cursor: pointer;
  background-color: var(--color-brand-yellow);
`;

const Moremenu = styled(FiMoreVertical)`
  font-size: 1.2rem;
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

interface PlanCardProps {
  isFixed: boolean;
}
export default function PlanCard({ isFixed }: PlanCardProps) {
  return (
    <Layout>
      <PlanInfoBox>
        <TimeInputBox>
          <input type="text" placeholder="00:00" />
          <p>~</p>
          <input type="text" placeholder="00:00" />
        </TimeInputBox>

        <ContentInputBox type="text" placeholder="내용을 입력하세요" disabled />
      </PlanInfoBox>
      <MenuButton>
        {false ? <Moremenu /> : <SaveMenu>저장</SaveMenu>}
      </MenuButton>
    </Layout>
  );
}
