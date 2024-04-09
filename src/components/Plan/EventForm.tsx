import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForward } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

/* 전체 틀 */
const Layout = styled.form`
    padding: 16px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

/* 닫기 버튼 */
const CloseIconBox = styled.div`
    align-self: flex-end;
`;
const CloseIcon = styled(IoClose)`
    font-size: 1.5rem;
    color: var(--color-black);
`;

/* 제목 입력란 */
const TitleInputBox = styled.div`
    width: 100%;
    input {
        width: 100%;
        padding: 10px 8px 16px;
        color: var(--color-brand-lightgray);
        font-size: 1rem;
        border: none;
        border-bottom: 1px solid var(--color-brand-lightgray);
        &:focus {
            outline: none;
            border-color: var(--color-brand-main);
        }
    }
`;

const DateInputBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;
const SelectDateInput = styled.div`
    display: flex;
    flex-direction: column;
`;

const CalendarIcon = styled(LuCalendarDays)``;
const ArrowIcon = styled(IoArrowForward)``;
const ClockIcon = styled(FaRegClock)``;

export default function EventForm() {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (date: Date) => {
        setIsOpen(!isOpen);
        setStartDate(date);
    };
    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    return (
        <Layout>
            <CloseIconBox>
                <CloseIcon />
            </CloseIconBox>
            <TitleInputBox>
                <input type="text" placeholder="제목을 입력해주세요" />
            </TitleInputBox>
            <DateInputBox>
                <SelectDateInput>
                    <label htmlFor="event-end-date">
                        <CalendarIcon />
                    </label>
                    <ClockIcon />
                </SelectDateInput>
                <SelectDateInput>
                    <button
                        className="example-custom-input"
                        onClick={handleClick}
                    >
                        {format(startDate, "MM. dd")}
                    </button>
                    {isOpen && (
                        <DatePicker
                            dateFormat="MM.dd"
                            selected={startDate}
                            onChange={handleChange}
                            inline
                            shouldCloseOnSelect
                        />
                    )}
                    <button type="button">추가</button>
                </SelectDateInput>
                <SelectDateInput>
                    <ArrowIcon />
                </SelectDateInput>
                <SelectDateInput>
                    <button
                        className="example-custom-input"
                        onClick={handleClick}
                    >
                        {format(startDate, "MM. dd")}
                    </button>
                    {isOpen && (
                        <DatePicker
                            dateFormat="MM.dd"
                            selected={startDate}
                            onChange={handleChange}
                            inline
                            shouldCloseOnSelect
                        />
                    )}
                    <button type="button">추가</button>
                </SelectDateInput>
            </DateInputBox>
            <div>
                <label htmlFor="event-writer">
                    작성자 :
                    <input type="text" id="event-writer" name="event-writer" />
                </label>
            </div>
            <div>
                <textarea
                    name="event-content"
                    id="event-content"
                    placeholder="내용을 입력해주세요"
                    cols={30}
                    rows={5}
                ></textarea>
            </div>
            <div>
                <button type="button">취소</button>
                <button>저장</button>
            </div>
        </Layout>
    );
}
