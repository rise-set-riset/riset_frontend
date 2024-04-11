import OfficialCalendar from "../../components/Plan/OfficialCalendar";
import styled from "styled-components";

const Layout = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

export default function OfficialPlan() {
    return (
        <Layout>
            <main className="main">
                <h1 className="title">회사일정</h1>
                <OfficialCalendar />
            </main>
        </Layout>
    );
}
