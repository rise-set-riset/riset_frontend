import styled from "styled-components";
import { useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import profileImg from "../../assets/dayoff/sample-profile-pic.png"

interface DropdownProps {
    isOpen: boolean;
    toggleDropdown: () => void;
  }

interface DayoffCardProps {
    onClick: () => void;
}

const DayoffCardContainer = styled.div`
    width: 476.5px;
    height: 163px;
    background-color: var(--color-white);
    display: flex;
    align-items: center;
    border-radius: 16px;
`

const CustomFaCircleMinus = styled(FaCircleMinus)`
    font-size: 24px;
    color: #FF5449;
    margin-left: 16px;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    margin-left: 20px;
`

const DayoffInfoContainer = styled.div`
    width: 246.5px;
    height: 100%;
    padding: 16px 0px;
    margin: 0px 20px;
    
`

const EmployeeInfoContainer = styled.div`
    width: 100%;
    height: 49px;
    margin-bottom: 8px;
    display: flex;
    justify-content : space-between;
`

const EmployeeInfoWrapper= styled.div`
    p:first-child{
    font-weight: bold;
    font-size: 22px;
    letter-spacing : 0.1px;
}

    p:last-child{
    font-weight: bold;
    font-size: 14px;
    letter-spacing : 0.1px;
    color: var(--color-brand-lightgray);
}
`
const EmployeeBtnWrapper = styled.div`
    display: flex;
`
const DropdownContainer = styled.div`
    position: relative;
    width: 81px; /* 두 버튼의 너비 */
    height: 48px; /* 두 버튼의 높이 */    
`;


const CustomIoIosArrowDown = styled(IoIosArrowDown)`
    width: 20px;
    height: 20px;
    color: white;
`

const DropdownButton = styled.button<{ open: boolean }>`
    width: 81px;
    height: 24px;
    display: flex;
    align-items: center;
    background-color: var(--color-brand-orange);
    letter-spacing: 0.5px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    padding: 6px 8px 6px 16px;
    border-radius: ${(props) => (props.open ? "16px 16px 0px 0px" : "16px")};
    border: none;
    cursor: pointer;
`;


const DropdownContent = styled.div<{ open: boolean }>`
    position: absolute;
    top: 24px; /* 버튼 아래에 드롭다운 콘텐츠 위치 */
    left: 0;
    width: 100%;
    display: ${(props) => (props.open ? "block" : "none")};
`;

const DropdownItem = styled.button`
    display: flex;
    align-items: center;
    width: 81px;
    height: 24px;
    background-color: var(--color-brand-orange);
    color: white;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0.5px; 
    padding: 8px 8px 6px 16px;
    border-radius: 0px 0px 16px 16px;
    border: none;
    cursor: pointer;
`;

// const CustomCiMenuKebab = styled(CiMenuKebab)`
//     width: 24px;
//     height: 24px;
//     color: black;
// `

const RequestedDateWrapper = styled.div`
    width: 100%;
    height: 49px;
    display: flex;
    justify-content: end;
    margin-bottom: 8px;

    input{
        width: 127px;
        height: 20px;
        border: none;
        font-weight: bold;
        font-size: 22px;
        letter-spacing: 0.1px;
        color: var(--color-brand-lightgray);
        outline: none;        
    }
`

// const RemainingDayoffWrapper = styled.div`
//     width: 100%;
//     height: 20px;


//     p{
//         font-size: 14px;
//         letter-spacing : 0.1px;
//         color: var(--color-brand-gray)
//     }
// `

const DayoffRequestBtn = styled.div`
    width: 80px;
    height: 100%;
    background-color: var(--color-brand-yellow); 
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px 16px 16px 0px;
    
    button{
        border : none;
        cursor: pointer;
        background-color: transparent;
        font-size: 16px;
        font-weight: bold;
        letter-spacing : 0.1px;
    }
   
`

const Dropdown: React.FC<DropdownProps> = ({ isOpen, toggleDropdown }) => (
    <>
    <DropdownContainer>
        <DropdownButton open={isOpen} onClick={toggleDropdown}>
            연차
            <CustomIoIosArrowDown />
        </DropdownButton>
    <DropdownContent open={isOpen}>
        <DropdownItem>반차</DropdownItem>
    </DropdownContent>
      </DropdownContainer>
    </>
  );
  

export default function DayoffCard({ onClick }: DayoffCardProps){
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return(

    <DayoffCardContainer>
        <CustomFaCircleMinus onClick={onClick}/>
       <ProfileImg src={profileImg}/>
        <DayoffInfoContainer>
            <EmployeeInfoContainer>
                <EmployeeInfoWrapper>
                    <p>홍길동</p>
                    <p>개발팀/사원</p>
                </EmployeeInfoWrapper>
                <EmployeeBtnWrapper>
                    <Dropdown isOpen={isOpen} toggleDropdown={toggleDropdown} />
                </EmployeeBtnWrapper>
                </EmployeeInfoContainer>
            <RequestedDateWrapper>
                <input type="text" placeholder="0000.00.00"/>
            </RequestedDateWrapper>
        </DayoffInfoContainer>
        <DayoffRequestBtn>
            <button>요청</button>
        </DayoffRequestBtn>
    </DayoffCardContainer>
    )
}

