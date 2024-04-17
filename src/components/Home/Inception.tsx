import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const FirstSection = styled.section`
  height: 83px;
  display: flex;
  gap: 1rem;
  border: 1px solid black;
`;

const SecondSection = styled.section`
  height: 410px;
  display: flex;
  gap: 1rem;
  border: 1px solid black;
`;

const ThirdSection = styled.section`
  height: 164px;
  border-radius: 1rem;
  background-color: var(--color-brand-yellow);
`;

const FourthSection = styled.section`
  height: 298px;
  border: 1px solid black;
`;

const TotalCntAbbr = styled.div`
  border-radius: 1rem;
`;

const OfficialPlanAbbr = styled.div`
  border-radius: 1rem;
`;

export default function Inception() {
  return (
    <Layout>
      <FirstSection>
        <TotalCntAbbr></TotalCntAbbr>
        <OfficialPlanAbbr></OfficialPlanAbbr>
      </FirstSection>
      <SecondSection></SecondSection>
      <ThirdSection></ThirdSection>
      <FourthSection></FourthSection>
    </Layout>
  );
}
