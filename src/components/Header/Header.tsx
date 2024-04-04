import styled from "styled-components";

const Layout = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: var(--color-white);
  z-index: 100;
  border-bottom: 1px solid var(--color-brand-lightgray);
`;

const Nav = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 1rem;
`;

export default function Header() {
  return (
    <Layout>
      <Nav>
        <div>햄버거</div>
        <img src="/assets/logo.png" alt="riset" />
        <div>메뉴</div>
      </Nav>
    </Layout>
  );
}
