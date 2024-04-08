import React from "react";
import styled from "styled-components";
import OfficialCalendar from "../../components/Plan/OfficialCalendar";

const Layout = styled.div`
    max-width: 1200px;
    width: 100%;
    margin-top: 60px;
    padding-left: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-gray-1);
`;

const PlanTitle = styled.h1`
    background-color: var(--color-white);
    height: 4rem;
    padding: 18px 24px;
    font-size: 1.5rem;
`;

export default function OfficialPlan() {
    return (
        <Layout>
            <PlanTitle>회사일정</PlanTitle>
            <OfficialCalendar />
        </Layout>
    );
}
