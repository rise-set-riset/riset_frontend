import { ChangeEvent, useState } from "react";
import type { ClickPositionType, EventFormType } from "./OfficialCalendar";
import styled, { keyframes } from "styled-components";
import CustomCheckbox from "../../common/CustomCheckbox";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { FiArrowRight } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import TimePicker from "../../common/TimePicker";
import Button from "../../common/Button";

const slideInAnimation = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

/* 전체 틀 */
const FormLayout = styled.form<{
    $dateClickPosition: ClickPositionType;
}>`
    width: 375px;
    padding: 16px 24px 24px;
    z-index: 10;
    position: fixed;
    left: ${(props) => `${props.$dateClickPosition.x + 10}px`};
    top: ${(props) => `${props.$dateClickPosition.y - 150}px`};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-radius: 16px;
    background-color: var(--color-white);
    box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
    animation: ${slideInAnimation} 0.3s ease;

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
    position: relative;
    display: flex;
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
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const SelectedColor = styled.div<{ $colorcode: string }>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.$colorcode};
`;

const SelectColorBox = styled.ul`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 24px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    background-color: var(--color-white);
    box-shadow: 0px 0px 10px 0px var(--color-brand-lightgray);
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
const SelectDateTimeLayout = styled.div`
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

        &:active {
            color: var(--color-brand-main);
            stroke: var(--color-brand-main);
        }
    }
`;

/* 날짜 입력 */
const DateInputBox = styled.div`
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 24px 80px 24px 80px;
    justify-content: space-between;
    align-items: center;
`;

const SelectDateButton = styled.button`
    font-size: 18px;
    font-weight: 500;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:active {
        color: var(--color-brand-main);
    }
`;

/* 시간 입력 */
const TimeInputBox = styled(DateInputBox)`
    .event-input-time {
        font-size: 1rem;
        font-weight: bold;
        text-decoration: underline;
        text-underline-position: under;
    }
    div {
        display: flex;
        justify-content: center;
    }
`;

const AddIconBox = styled.button`
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: var(--color-white);

    svg,
    svg path {
        font-size: 1.4rem;
        color: var(--color-brand-lightgray);
        stroke: var(--color-brand-lightgray);

        &:active {
            color: var(--color-brand-main);
            stroke: var(--color-brand-main);
        }
    }
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
const ButtonBox = styled.div`
    width: 100%;
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .custom-button {
        width: 9rem;
        height: 2.5rem;
    }
`;

/* 날짜 표시 서식 */
const dateFormat = (date: string) => {
    const rawDate = new Date(date);
    const week = ["일", "월", "화", "수", "목", "금", "토"][rawDate.getDay()];
    return `${rawDate.getMonth() + 1} / ${rawDate.getDate()} (${week})`;
};

interface EventFormProps {
    /*
    isFormOpen: Event Form 표시 여부 상태값
    eventForm: 해당 Form 객체
    setEventForm: 해당 Form 객체 상태 설정
    dateClickPosition: 클릭한 날짜 위치
    handleFormCancel: 추가 혹은 수정 취소
    handleFormSubmit: 추가 혹은 수정
    */
    isFormOpen: boolean;
    eventForm: EventFormType;
    setEventForm: React.Dispatch<React.SetStateAction<EventFormType>>;
    dateClickPosition: ClickPositionType;
    handleFormCancel: () => void;
    handleFormSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function EventForm({
    isFormOpen,
    eventForm,
    setEventForm,
    dateClickPosition,
    handleFormCancel,
    handleFormSubmit,
}: EventFormProps) {
    /* 
    eventColorList: 선택할 수 있는 색상 종류
    isColorOpen: 색상 선택 팝업 표시 여부
    selectedColor: 선택한 색상
    hasTime: 시간 선택 여부
    selectStartDate: 선택한 시작 날짜
    selectEndDate: 선택한 끝나는 날짜
    selectedStartTime: 시작 시간
    selectedEndTime: 끝나는 시간
    hasStartTime: 시작 시간 선택 여부
    hasEndTime: 종료 시간 선택 여부
    */
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
    const [hasTime, setHasTime] = useState<boolean>(false);
    const [selectedStartDate, setSelectedStartDate] = useState<string>(
        eventForm.start
    );
    const [selectedEndDate, setSelectedEndDate] = useState<string>(
        eventForm.end
    );
    const [selectedStartTime, setSelectedStartTime] = useState<string>("00:00");
    const [selectedEndTime, setSelectedEndTime] = useState<string>("00:00");
    const [hasStartTime, setHasStartTime] = useState<boolean>(false);
    const [hasEndTime, setHasEndTime] = useState<boolean>(false);

    /* Event Form 변경 */
    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEventForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /* 색상 선택 */
    const handleSelectColor = (colorcode: string) => {
        setSelectedColor(colorcode);
        setEventForm((prevState) => ({
            ...prevState,
            color: colorcode,
        }));
    };

    /* 색상 팝업 제어 */
    const handleColorOpen: React.MouseEventHandler<HTMLLIElement> = (event) => {
        event.stopPropagation();
        setIsColorOpen(false);
    };

    /* 시간포함 여부 */
    const handleHasTime = () => {
        if (!hasTime) {
            setHasStartTime(false);
            setHasEndTime(false);
            setSelectedStartTime("00:00");
            setSelectedEndTime("00:00");
        }
        setHasTime(!hasTime);
    };

    /* 날짜 선택 */
    const [isStartPickerOpen, setIsStartPickerOpen] = useState<boolean>(false);
    const [isEndPickerOpen, setIsEndPickerOpen] = useState<boolean>(false);
    const handlePickerOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsStartPickerOpen(!isStartPickerOpen);
        // e.stopPropagation();
    };

    const handleDatePick = () => {
        setIsStartPickerOpen(!isStartPickerOpen);
        // setSelectedStartDate();
    };

    /* 시작 시간 또는 종료 시간 추가 */
    const handleAddSelectTime = (
        e: React.MouseEvent<HTMLButtonElement>,
        name: string
    ) => {
        e.stopPropagation();
        if (name === "start") {
            setHasStartTime(true);
        } else {
            setHasEndTime(true);
        }
    };

    return (
        <FormLayout
            $dateClickPosition={dateClickPosition}
            onSubmit={handleFormSubmit}
        >
            {/* 닫기 버튼 */}
            <CloseIconBox onClick={handleFormCancel}>
                <CloseIcon />
            </CloseIconBox>

            {/* 제목 입력 */}
            <TitleInputBox>
                <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    name="title"
                    value={eventForm?.title}
                    onChange={handleFormChange}
                />

                {/* 색상 선택 */}
                <SelectColorButton
                    type="button"
                    onClick={() => setIsColorOpen(true)}
                >
                    <SelectedColor $colorcode={selectedColor} />
                </SelectColorButton>
                {isColorOpen && (
                    <SelectColorBox>
                        {eventColorList.map((colorcode) => (
                            <SelectColorOption
                                $colorcode={colorcode}
                                key={`${colorcode}`}
                                onClick={handleColorOpen}
                            >
                                <CustomCheckbox
                                    isChecked={colorcode === selectedColor}
                                    onChange={() =>
                                        handleSelectColor(colorcode)
                                    }
                                />
                            </SelectColorOption>
                        ))}
                    </SelectColorBox>
                )}
            </TitleInputBox>

            {/* 시간포함 여부 */}
            <DecideTimeOpen onClick={handleHasTime}>
                <CustomCheckbox isChecked={hasTime} onChange={handleHasTime} />
                <span>시간포함</span>
            </DecideTimeOpen>

            {/* 날짜, 시간 선택 */}
            <SelectDateTimeLayout>
                {/* 날짜 선택 */}
                <DateInputBox>
                    <LabelIconBox htmlFor="event-input-start-date">
                        <LuCalendarDays />
                    </LabelIconBox>

                    {/* 시작 날짜 선택 */}
                    <SelectDateButton
                        id="event-input-start-date"
                        className="event-input-date"
                        onClick={handlePickerOpen}
                    >
                        {dateFormat(selectedStartDate)}
                    </SelectDateButton>
                    {isStartPickerOpen && <div>시작</div>}

                    <LabelIconBox htmlFor="event-input-end-date">
                        <FiArrowRight />
                    </LabelIconBox>

                    {/* 종료 날짜 선택 */}
                    <SelectDateButton
                        id="event-input-end-date"
                        className="event-input-date"
                        onClick={handlePickerOpen}
                    >
                        {dateFormat(selectedEndDate)}
                    </SelectDateButton>
                    {isStartPickerOpen && <div>종료</div>}
                </DateInputBox>

                {/* 시간 선택 */}
                {hasTime && (
                    <TimeInputBox>
                        <LabelIconBox htmlFor="event-input-start-time">
                            <FiClock />
                        </LabelIconBox>

                        {/* 시작 시간 선택 */}
                        {!hasStartTime ? (
                            <AddIconBox
                                type="button"
                                onClick={(e) => handleAddSelectTime(e, "start")}
                                name="start-time"
                            >
                                <FiPlusCircle />
                            </AddIconBox>
                        ) : (
                            <TimePicker
                                selectedTime={selectedStartTime}
                                setSelectedTime={setSelectedStartTime}
                            />
                        )}

                        <LabelIconBox />

                        {/* 종료 시간 선택 */}
                        {!hasEndTime ? (
                            <AddIconBox
                                type="button"
                                onClick={(e) => handleAddSelectTime(e, "end")}
                                name="end-time"
                            >
                                <FiPlusCircle />
                            </AddIconBox>
                        ) : (
                            <div>
                                <TimePicker
                                    selectedTime={selectedEndTime}
                                    setSelectedTime={setSelectedEndTime}
                                />
                            </div>
                        )}
                    </TimeInputBox>
                )}
            </SelectDateTimeLayout>

            {/* 작성자 입력 */}
            <WriterInputBox>
                <label htmlFor="event-writer">작성자 :</label>
                <input
                    type="text"
                    id="event-writer"
                    name="writer"
                    value={eventForm?.writer}
                    onChange={handleFormChange}
                />
            </WriterInputBox>

            {/* 내용 입력 */}
            <ContentInputBox>
                <textarea
                    id="event-content"
                    placeholder="내용을 입력해주세요"
                    name="content"
                    value={eventForm?.content}
                    onChange={handleFormChange}
                ></textarea>
            </ContentInputBox>
            <ButtonBox>
                <Button
                    type={"reset"}
                    active={false}
                    title={"취소"}
                    handleBtnClick={handleFormCancel}
                />
                <Button type={"submit"} active={true} title={"저장"} />
            </ButtonBox>
        </FormLayout>
    );
}
