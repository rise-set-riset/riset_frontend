import React from "react";
import EventForm from "./EventForm";
import styled from "styled-components";

const Layout = styled.div`
    width: 375px;
    height: 505px;
    background-color: var(--color-white);
    border-radius: 16px;
`;
export default function EventModal() {
    return (
        <Layout>
            <EventForm />
        </Layout>
    );
}