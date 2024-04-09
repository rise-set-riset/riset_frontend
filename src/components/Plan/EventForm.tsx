import { useState } from "react";
import styled from "styled-components";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import CustomCheckbox from "../../common/CustomCheckbox";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";

/* 전체 틀 */
const FormLayout = styled.form`
    width: 375px;
    padding: 16px 24px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-radius: 16px;
    background-color: var(--color-white);

    input,
    label {
        font-size: 1rem;
    }

    input::placeholder,
    textarea::placeholder {
        font-size: 1rem;
        color: var(--color-brand-lightgray);
    }
`;

/* 닫기 아이콘 */
const CloseIconBox = styled.div`
    align-self: flex-end;
`;

const CloseIcon = styled(IoClose)`
    font-size: 1.5rem;
`;

/* 제목 입력 */
const TitleInputBox = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    border-bottom: 1px solid var(--color-brand-lightgray);

    &:focus-within {
        border-color: var(--color-brand-main);
    }

    input {
        width: 100%;
        padding: 10px 8px 16px;
        border: none;

        &:focus {
            outline: none;
        }
    }
`;

/* 색상 선택 */
const SelectColorButton = styled.button`
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

const SelectedColor = styled.div<{ $colorcode: string }>`
    width: 30px;
    height: 30px;
    background-color: ${(props) => props.$colorcode};
    border-radius: 50%;
`;

const SelectColorBox = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 0;
    right: 0;
    border: 1px solid var(--color-brand-lightgray);
    border-radius: 16px;
    padding: 24px 20px;
    background-color: var(--color-white);
    z-index: 10;
`;

const SelectColorOption = styled.li<{ $colorcode: string }>`
    .checkbox {
        width: 30px;
        height: 30px;
        background-color: ${(props) => props.$colorcode};
        &:active {
            background-color: ${(props) => props.$colorcode};
        }
    }
`;

/* 시간 선택 */
const DecideTimeOpen = styled.div`
    display: flex;
    align-items: center;
    align-self: flex-end;
    gap: 0.4rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
`;

/* 날짜, 시간 입력 레이아웃 및 아이콘 */
const SelectDateBox = styled.div`
    width: 100%;
    padding: 0.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const LabelIconBox = styled.label`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1/1;

    svg,
    svg path {
        font-size: 1.4rem;
        color: var(--color-brand-lightgray);
        stroke: var(--color-brand-lightgray);
    }
`;

/* 날짜 입력 */
const DateInputBox = styled.div`
    width: 100%;
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 24px 70px 24px 70px;
`;

const DatePickerBox = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 500;
`;

const SelectDateButton = styled.button`
    width: 4rem;
    height: 2rem;
    font-weight: 500;
    font-size: 1.1rem;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:active {
        color: var(--color-brand-main);
    }
`;

/* 시간 입력 */
const TimeInpuBox = styled(DateInputBox)`
    button {
        background-color: transparent;
        border: none;
        font-size: 1rem;
        color: var(--color-brand-lightgray);
        display: flex;
        justify-content: center;
    }
`;
const SettingTimeInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: underline;
    text-underline-position: under;
`;

const TimePickerBox = styled(DatePickerBox)`
    button.event-input-time {
        color: var(--color-black);
        font-weight: bold;
    }
`;

const AddTimeIcon = styled(FiPlusCircle)`
    font-size: 1.5rem;
    color: var(--color-brand-lightgray);
    text-align: center;
`;

/*  작성자 입력 */
const WriterInputBox = styled.div`
    width: 100%;
    padding: 10px 0 16px;
    border-bottom: 1px solid var(--color-brand-lightgray);

    &:focus-within {
        border-color: var(--color-brand-main);
    }
    label {
        font-weight: bold;
    }
    input {
        border: none;
        outline: none;
        padding-left: 0.5rem;
    }
`;

/* 내용 입력란 */
const ContentInputBox = styled.div`
    width: 100%;
    height: 10rem;

    textarea {
        resize: none;
        width: 100% !important;
        height: 100% !important;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid var(--color-brand-lightgray);

        &:focus {
            outline: none;
            border: 1px solid var(--color-brand-main);
        }
    }
`;

/* 취소, 저장 버튼 */
const EndButtonBox = styled.div`
    width: 100%;
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        width: 9rem;
        height: 2.5rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--color-brand-main);
        border-radius: 8px;
        border: 1px solid var(--color-brand-main);
        background-color: var(--brand-white);
        cursor: pointer;
    }

    .event-save-btn {
        color: var(--color-white);
        background-color: var(--color-brand-main);
    }
`;

export default function EventForm() {
    /* 색상 선택 */
    const eventColorList = [
        "#FFBFA7",
        "#FFE7A7",
        "#E1FFB0",
        "#C5DAFF",
        "#DECFFF",
    ];
    const [isColorOpen, setIsColorOpen] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<string>(
        eventColorList[0]
    );
    const handleSelectColor = (colorcode: string) => {
        setSelectedColor(colorcode);
        setIsColorOpen(false);
    };

    /* 시간 선택 */
    const [hasTime, setHasTime] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const handleHasTime = () => {
        setHasTime(!hasTime);
    };

    //
    // setHours(setMinutes(new Date(), 30), 17)
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
        <FormLayout>
            <CloseIconBox>
                <CloseIcon />
            </CloseIconBox>

            <TitleInputBox>
                <input type="text" placeholder="제목을 입력해주세요" />
                <SelectColorButton
                    type="button"
                    onClick={() => setIsColorOpen(true)}
                >
                    <SelectedColor $colorcode={selectedColor}></SelectedColor>
                </SelectColorButton>
                {isColorOpen && (
                    <SelectColorBox>
                        {eventColorList.map((colorcode, index) => (
                            <SelectColorOption $colorcode={colorcode}>
                                <CustomCheckbox
                                    isChecked={colorcode === selectedColor}
                                    handleCheckbox={() =>
                                        handleSelectColor(colorcode)
                                    }
                                />
                            </SelectColorOption>
                        ))}
                    </SelectColorBox>
                )}
            </TitleInputBox>

            <DecideTimeOpen onClick={handleHasTime}>
                <CustomCheckbox />
                <span>시간포함</span>
            </DecideTimeOpen>

            <SelectDateBox>
                <DateInputBox>
                    <LabelIconBox htmlFor="event-input-end-date">
                        <LuCalendarDays />
                    </LabelIconBox>
                    <DatePickerBox>
                        <SelectDateButton
                            id="event-input-end-date"
                            className="event-input-date"
                            onClick={handleClick}
                        >
                            {format(startDate, "M / d")}
                        </SelectDateButton>
                        {isOpen && (
                            <DatePicker
                                // locale={ko}
                                dateFormat="yyyy-MM-dd"
                                selected={startDate}
                                onChange={handleChange}
                                inline
                                shouldCloseOnSelect
                                // showTimeSelect
                                showTimeSelectOnly
                            />
                        )}
                    </DatePickerBox>
                    <LabelIconBox htmlFor="event-input-end-date">
                        <FiArrowRight />
                    </LabelIconBox>
                    <DatePickerBox>
                        <SelectDateButton
                            id="event-input-end-date"
                            className="event-input-date"
                            onClick={handleClick}
                        >
                            {format(startDate, "M / d")}
                        </SelectDateButton>
                        {isOpen && (
                            <DatePicker
                                dateFormat="MM.dd"
                                selected={startDate}
                                onChange={handleChange}
                                inline
                                shouldCloseOnSelect
                            />
                        )}
                    </DatePickerBox>
                </DateInputBox>

                {hasTime && (
                    <TimeInpuBox>
                        <LabelIconBox htmlFor="event-end-date">
                            <FiClock />
                        </LabelIconBox>

                        <SettingTimeInput>
                            {!startTime ? (
                                <AddTimeIcon onClick={() => setHasTime(true)} />
                            ) : (
                                <TimePickerBox>
                                    <button
                                        id="event-input-start-time"
                                        className="event-input-time"
                                        onClick={handleClick}
                                    >
                                        {format(startDate, "hh:mm")}
                                    </button>
                                    {isOpen && (
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            // minTime={setHours(
                                            //     setMinutes(new Date(), 0),
                                            //     17
                                            // )}
                                            // maxTime={setHours(
                                            //     setMinutes(new Date(), 30),
                                            //     20
                                            // )}
                                            dateFormat="h:mm aa"
                                        />
                                    )}
                                </TimePickerBox>
                            )}
                        </SettingTimeInput>
                        <LabelIconBox />
                        <SettingTimeInput>
                            {!hasTime ? (
                                <AddTimeIcon onClick={() => setHasTime(true)} />
                            ) : (
                                <TimePickerBox>
                                    <button
                                        id="event-input-start-time"
                                        className="event-input-time"
                                        onClick={handleClick}
                                    >
                                        {format(startDate, "hh:mm")}
                                    </button>
                                    {isOpen && (
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            // minTime={setHours(
                                            //     setMinutes(new Date(), 0),
                                            //     17
                                            // )}
                                            // maxTime={setHours(
                                            //     setMinutes(new Date(), 30),
                                            //     20
                                            // )}
                                            dateFormat="h:mm aa"
                                        />
                                    )}
                                </TimePickerBox>
                            )}
                        </SettingTimeInput>
                    </TimeInpuBox>
                )}
            </SelectDateBox>

            <WriterInputBox>
                <label htmlFor="event-writer">작성자 :</label>
                <input type="text" id="event-writer" name="event-writer" />
            </WriterInputBox>
            <ContentInputBox>
                <textarea
                    name="event-content"
                    id="event-content"
                    placeholder="내용을 입력해주세요"
                ></textarea>
            </ContentInputBox>
            <EndButtonBox>
                <button type="button" className="event-cancel-btn">
                    취소
                </button>
                <button className="event-save-btn">저장</button>
            </EndButtonBox>
        </FormLayout>
    );
}
