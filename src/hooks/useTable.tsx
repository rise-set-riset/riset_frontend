import React, { useEffect, useState } from "react";
import { useTable, Column } from "react-table";
import styled from "styled-components";
import DaumPostcodeEmbed from "react-daum-postcode";

interface TableData {
  col1: string;
  col2: string | JSX.Element | null;
}

interface Props {
  userData: {
    image: string;
    userId: string;
    name: string;
    joiningDate: string;
    jobGrade: string;
    departmentName: string;
    position: string;
    jobTitle: string;
    telNo: string;
    address: string;
    totalHoliday: string;
    salary: string;
  };
}

const StyledTable = styled.table`
  width: 960px;
  height: 926px;
  border-collapse: collapse;
  background-color: var(--color-white);
  margin: auto;
`;

const StyledTd = styled.td<{ hasBottomBorder: boolean }>`
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
  border: 1px solid var(--color-brand-lightgray);
  padding: 13px 20px;
  color: #353535;
  font-size: 16px;
  letter-spacing: 0.5px;

  &::placeholder {
    color: var(--color-brand-lightgray);
  }
`;

const AddressWrapper = styled.div`
  display: flex;
`;

const SearchBtn = styled.button`
  width: 100px;
  height: 50px;
  padding: 13px 20px;
  border-radius: 8px;
  color: var(--color-white);
  border: none;
  background-color: var(--color-brand-main);
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: var(--color-white);
  padding: 20px;
`;

const Table: React.FC<Props> = ({ userData }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [joiningDate, setJoiningDate] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleJoiningDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoiningDate(e.target.value);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  // 우편번호 검색을 완료했을 때 호출되는 함수, 검색 결과로 받은 주소를 가져와 companyAddress 상태 업데이트, 우편번호 검색 팝업을 닫음
  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    setAddress(fullAddress);
    setIsPopupOpen(false);
  };

  // 모달 여는 함수
  const handleOpenModal = () => {
    setIsPopupOpen(true);
  };

  // 모달 바깥의 배경을 클릭한 경우에만 모달을 닫음
  const handleModalWrapperClick = (event: any) => {
    if (event.target === event.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  const data: TableData[] = React.useMemo(
    () => [
      {
        col1: "아이디",
        col2: userData.userId,
      },
      {
        col1: "비밀번호",
        col2: (
          <Input
            type="password"
            value={newPassword}
            placeholder="새 비밀번호"
            onChange={handlePasswordChange}
          />
        ),
      },
      {
        col1: "",
        col2: (
          <Input
            type="password"
            value={confirmNewPassword}
            placeholder="새 비밀번호 확인"
            onChange={handleConfirmPasswordChange}
          />
        ),
      },
      {
        col1: "이름",
        col2: (
          <Input
            type="text"
            value={userData.name}
            placeholder="이름을 입력해 주세요"
            onChange={handleNameChange}
          />
        ),
      },
      {
        col1: "입사일",
        col2: (
          <Input
            type="text"
            value={userData.joiningDate}
            placeholder="YY.MM.DD"
            onChange={handleJoiningDateChange}
          />
        ),
      },
      {
        col1: "등급",
        col2: userData.jobGrade,
      },
      {
        col1: "부서",
        col2: (
          <Input
            type="text"
            value={userData.departmentName}
            placeholder="부서를 입력해 주세요"
            onChange={handleDepartmentChange}
          />
        ),
      },
      {
        col1: "직책",
        col2: userData.position,
      },
      {
        col1: "직무",
        col2: userData.jobTitle,
      },
      {
        col1: "휴대폰번호",
        col2: (
          <Input
            type="text"
            value={userData.telNo}
            placeholder="전화번호를 입력해 주세요"
            onChange={handlePhoneNumberChange}
          />
        ),
      },
      {
        col1: "주소",
        col2: (
          <AddressWrapper>
            <Input
              type="text"
              value={userData.address}
              placeholder="도로명,지번, 건물명 검색"
              onChange={handleAddressChange}
            />
            <SearchBtn onClick={handleOpenModal}>검색</SearchBtn>
            {isPopupOpen && (
              <ModalWrapper onClick={handleModalWrapperClick}>
                <ModalContent>
                  <DaumPostcodeEmbed onComplete={handleComplete} />
                </ModalContent>
              </ModalWrapper>
            )}
          </AddressWrapper>
        ),
      },
      {
        col1: "",
        col2: address,
      },
      {
        col1: "휴가일수",
        col2: "",
      },
      {
        col1: "연봉",
        col2: "",
      },
    ],
    [
      newPassword,
      confirmNewPassword,
      name,
      joiningDate,
      department,
      phoneNumber,
      address,
      userData.userId,
      userData.name,
      userData.joiningDate,
      userData.jobGrade,
      userData.departmentName,
      userData.position,
      userData.jobTitle,
      userData.telNo,
      userData.address,
      userData.totalHoliday,
      userData.salary,
      handlePasswordChange,
      handleConfirmPasswordChange,
      handleNameChange,
      handleJoiningDateChange,
      handleDepartmentChange,
      handlePhoneNumberChange,
      handleAddressChange,
    ]
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
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <StyledTable {...getTableProps()}>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any, index: number) => (
                <StyledTd
                  {...cell.getCellProps()}
                  key={index}
                  hasBottomBorder={
                    cell.row.original.col1 !== "비밀번호" && cell.row.original.col1 !== "주소"
                  }
                >
                  {cell.render("Cell")}
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
