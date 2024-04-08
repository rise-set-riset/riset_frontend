import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { IoArrowForward } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

const EventFormContainer = styled.form`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SelectDateLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;
const SelectDateInput = styled.div`
    display: flex;
    flex-direction: column;
    input[type="date"]::before {
        content: attr(data-placeholder);
        width: 100%;
    }
    input[type="date"]::-webkit-datetime-edit-text {
        -webkit-appearance: none;
        display: none;
    }

    input[type="date"]::-webkit-datetime-edit-month-field {
        -webkit-appearance: none;
        display: none;
    }

    input[type="date"]::-webkit-datetime-edit-day-field {
        -webkit-appearance: none;
        display: none;
    }

    input[type="date"]::-webkit-datetime-edit-year-field {
        -webkit-appearance: none;
        display: none;
    }
`;

const CloseIconBox = styled.div`
    align-self: flex-end;
`;
const CloseIcon = styled(IoClose)``;
const CalendarIcon = styled(LuCalendarDays)``;
const ArrowIcon = styled(IoArrowForward)``;
const ClockIcon = styled(FaRegClock)``;

export default function EventForm() {
    return (
        <EventFormContainer>
            <CloseIconBox>
                <CloseIcon />
            </CloseIconBox>
            <div>
                <input type="text" placeholder="제목을 입력해주세요" />
            </div>
            <SelectDateLayout>
                <SelectDateInput>
                    <CalendarIcon />
                    <ClockIcon />
                </SelectDateInput>
                <SelectDateInput>
                    <input type="date" data-placeholder="4/12(월)" />
                    <button type="button">추가</button>
                </SelectDateInput>
                <SelectDateInput>
                    <ArrowIcon />
                </SelectDateInput>
                <SelectDateInput>
                    <input type="date" />
                    <button type="button">추가</button>
                </SelectDateInput>
            </SelectDateLayout>
            <div>
                <label htmlFor="writer">
                    작성자 :
                    <input type="text" id="writer" name="writer" />
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
        </EventFormContainer>
    );
}
