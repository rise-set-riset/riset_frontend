import React, { useState } from "react";
import { useTable , Column } from "react-table";
import styled from "styled-components";

interface TableData {
  col1: string;
  col2: string;
}

const StyledTable = styled.table`
  width: 960px;
  height: 926px;
  border-collapse: collapse;
  background-color: #FFFFFF;
  margin: auto;
`;

const StyledTd = styled.td<{ hasBottomBorder:boolean }>`
  height: 68px;
  border: none;
  letter-spacing: 0.1px;
  border-left: none;
  border-right: none;
  border-bottom: ${({ hasBottomBorder }) => (hasBottomBorder ? "1px solid #c4c4c4" : "none")};

  &:first-child {
    width: 180px;
    font-weight: bold;
    font-size: 16px;
    padding: 16px;
  }

  &:nth-child(2) {
    width: 780px;
    padding: 8px 16px;
  }
`;

const Input = styled.input`
    width: 380px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #c4c4c4;
    padding: 13px 20px;
    color: #353535;
    font-size: 16px;
    letter-spacing: 0.5px;
    
    &::placeholder {
        color: #c4c4c4;
      }
`;

const SearchBtn = styled.button`
width: 100px;
height: 50px;
padding: 13px 20px;
border-radius: 8px;
color: white;
border: none;
background-color: #ff7f50;
font-weight: bold;
font-size: 16px;
letter-spacing : 0.5px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
`;

const Table: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleJoiningDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoiningDate(e.target.value);
  }

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }


  const data: TableData[] = React.useMemo(
    () => [
        {
            col1: "아이디",
            col2: "셀 1-2",
          },
          {
            col1: "비밀번호",
            col2: "",
          },
          {
            col1: "",
            col2: "",
          },
          {
            col1: "이름",
            col2: "",
          },
          {
            col1: "입사일",
            col2: "",
          },
          {
            col1: "등급",
            col2: "셀 5-2",
          },
          {
            col1: "부서",
            col2: "",
          },
          {
            col1: "직책",
            col2: "셀 7-2",
          },
          {
            col1: "직무",
            col2: "셀 8-2",
          },
          {
            col1: "휴대폰번호",
            col2: "",
          },
          {
            col1: "주소",
            col2: "",
          },
          {
            col1: "",
            col2: "",
          },
          {
            col1: "휴가일수",
            col2: "셀 12-2",
          },
          {
            col1: "연봉",
            col2: "셀 13-2",
          },
        ],
    []
  );

  // Column definition
  const columns: readonly Column<TableData>[] = React.useMemo(
    () => [
      {
        Header: "열 1",
        accessor: "col1",
      },
      {
        Header: "열 2",
        accessor: "col2",
      },
    ],
    []
  );

  // Use table hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <StyledTable {...getTableProps()}>
    <tbody {...getTableBodyProps()}>
      {rows.map((row: any) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell: any, index: number, rowIndex: number) => (
               <StyledTd
               {...cell.getCellProps()}
               key={index}
               hasBottomBorder={cell.row.original.col1 !== "비밀번호" && cell.row.original.col1 !== "주소"}
             >
             {
             cell.column.id === "col2" && cell.row.original.col1 === "비밀번호" && cell.value === "" ? (
                <Input
                    type="pasword"
                    value={password}
                    placeholder="새 비밀번호"
                    onChange={handlePasswordChange}/>
              ) : 
             
              cell.column.id === "col2" && cell.row.original.col1 === "" && cell.value === "" ? (
                <Input
                type="pasword"
                value={confirmPassword}
                placeholder="새 비밀번호 확인"
                onChange={handleConfirmPasswordChange}/>
              ) : 
              
              cell.column.id === "col2" && cell.row.original.col1 === "이름" && cell.value === "" ? (
                <Input
                type="text"
                value={name}
                placeholder="이름을 입력해 주세요"
                onChange={handleNameChange}/>
              ) : 

              cell.column.id === "col2" && cell.row.original.col1 === "입사일" && cell.value === "" ? (
                <Input
                type="text"
                value={joiningDate}
                placeholder="YY.MM.DD"
                onChange={handleJoiningDateChange}/>
              ) : 
                cell.column.id === "col2" && cell.row.original.col1 === "부서" && cell.value === "" ? (
                <Input
                type="text"
                value={department}
                placeholder="부서를 입력해 주세요"
                onChange={handleDepartmentChange}/>
              ) : 
              cell.column.id === "col2" && cell.row.original.col1 === "휴대폰번호" && cell.value === "" ? (
                <Input
                type="text"
                value={phoneNumber}
                placeholder="전화번호를 입력해 주세요"
                onChange={handlePhoneNumberChange}/>
              ) : 
              cell.column.id === "col2" && cell.row.original.col1 === "주소" && cell.value === "" ? (
                <>
                <Input
                type="text"
                value={address}
                placeholder="도로명,지번, 건물명 검색"
                onChange={handleAddressChange}/>
                <SearchBtn>검색</SearchBtn>
                </>
              ) : 
              (
                cell.render("Cell")
              )}
            </StyledTd>
            ))}
          </tr>
        );
      })}
    </tbody>
  </StyledTable>
  );
};

export default Table;
