import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  overflow-x: auto;

  main {
    overflow-x: auto;
  }
`;

const ProfileTable = styled.table`
  overflow-x: auto;
  border-collapse: collapse;
  text-align: center;
  vertical-align: middle;
  margin-top: 4rem;
  margin-left: 1rem;

  thead {
    background-color: var(--color-brand-main);
    color: var(--color-white);
    border: 1px solid var(--color-brand-main);
    th {
      border: 1px solid var(--color-white);
      padding: 0.5rem;
    }
  }

  tbody {
    background-color: var(--color-white);
    td {
      border: 1px solid var(--color-brand-lightgray);
      height: 66px;
    }
  }

  tr td {
    border-left: none;
  }
`;

// const TestData = [
//     {
//         id: 1,
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s",
//         name: "홍길동",
//         rank: 1,

//     }
// ]

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

const EditableInput = styled.input``;
export default function ProfileSetting() {
  return (
    <Layout>
      <main className="main">
        <h2 className="title">조직원 프로필</h2>
        <ProfileTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>사진</th>
              <th>이름</th>
              <th>아이디</th>
              <th>등급</th>
              <th>입사일</th>
              <th>휴가일수</th>
              <th>연봉</th>
              <th>부서</th>
              <th>직책</th>
              <th>직무</th>
              <th>휴대폰</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <ProfileImg
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8k9sWgWuIC4AyfZhUWU8nmoWo6AdJLZsw&s"
                  alt=""
                />
              </td>
              <td>홍길동</td>
              <td>hongildong</td>
              <td></td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
              <td>Row 2, Cell 3</td>
            </tr>
            <tr>
              <td>Row 3, Cell 1</td>
              <td>Row 3, Cell 2</td>
              <td>Row 3, Cell 3</td>
            </tr>
          </tbody>
        </ProfileTable>
      </main>
    </Layout>
  );
}
