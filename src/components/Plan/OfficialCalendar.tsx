import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";

const Layout = styled.div`
    width: 100%;
    padding: 20px;
    position: relative;
`;

const YearTitle = styled.div`
    width: 100%;
    position: absolute;
    padding-right: 150px;
    text-align: center;
    font-size: 1.25rem;
    top: 1.8rem;
`;

const CalendarCustomStyle = styled.div`
    color: var(--color-black);
    font-weight: 500;
    font-size: 1rem;

    /* 월 */
    h2.fc-toolbar-title {
        padding-bottom: 0.5rem;
        font-size: 1.5rem;
    }

    /* 헤더 Toolbar */
    div.fc-header-toolbar {
        height: 80px;
        align-items: flex-end;

        /* 양옆 이동 버튼 기준 */
        button.fc-button {
            padding: 0.5rem;
            border: none;
            border-radius: 50%;
            font-weight: bold;
            color: var(--color-black);
            background-color: var(--color-white);
            cursor: pointer;
            box-shadow: none !important;

            span {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            &:active {
                color: var(--color-white);
                border: 1px solid var(--color-brand-main);
                background-color: var(--color-brand-main);
            }
        }

        /* Month 버전, Year 버전 */
        button.fc-multiMonthYear-button,
        button.fc-dayGridMonth-button,
        button.fc-today-button {
            width: 100px;
            height: 40px;
            border-radius: 20px;
            color: var(--color-brand-main);
            background-color: var(--color-white);
            border: 1px solid var(--color-brand-main);
        }

        /* 활성화 되었을 때 */
        .fc-button.fc-button-primary.fc-button-active {
            color: var(--color-white);
            border: 1px solid var(--color-brand-main);
            background-color: var(--color-brand-main);
        }
    }

    /* 요일 */
    thead th {
        height: 36px;
        vertical-align: middle;
        background-color: var(--color-brand-main);
        a {
            color: var(--color-white);
        }
    }

    /* 날짜칸 */
    td.fc-day.fc-daygrid-day {
        cursor: pointer;
        background-color: var(--color-white);

        &:hover {
            border: 1px solid var(--color-brand-main);
        }

        .fc-daygrid-day-top {
            flex-direction: row;
            padding: 0.4rem 0.8rem;
        }
    }

    /* 오늘 날짜 표시 */
    td.fc-daygrid-day.fc-day-today .fc-daygrid-day-top a {
        width: 2rem;
        aspect-ratio: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--color-brand-yellow);
    }
`;

export interface EventFormType {
    [key: string]: string;
}

export interface ClickPositionType {
    [key: string]: number;
}

export default function OfficialCalendar() {
    const calendarRef = useRef<any>(null);
    const [renderedYear, setRenderedYear] = useState<number>(
        new Date().getFullYear()
    );

    /* Today 버튼 제어 */
    const todayRef = useRef<any>(null);
    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.querySelector(
                "button.fc-today-button.fc-button"
            ).disabled = false;
        }
    }, []);

    /* 
    eventForm: 추가하거나 수정할 이벤트 Form
    isFormOpen: Form 팝업 표시 여부

    */
    /* 날짜 클릭시 */
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [eventForm, setEventForm] = useState<EventFormType>({});
    const [dateClickPosition, setDateClickPosition] =
        useState<ClickPositionType>({
            x: 0,
            y: 0,
        });

    const handleDateClick = (info: any) => {
        setIsFormOpen(true);
        setDateClickPosition({
            x: info.jsEvent.x,
            y: info.jsEvent.y,
        });
    };

    useEffect(() => {
        setRenderedYear(
            new Date(
                calendarRef.current.getApi().currentData.currentDate
            ).getFullYear()
        );
    }, []);

    return (
        <Layout>
            <CalendarCustomStyle ref={todayRef}>
                <YearTitle>{renderedYear}</YearTitle>
                <FullCalendar
                    /*
                    ref: useRef
                    plugins: 당월, 한해, 이벤트 view
                    initialView: 처음 보여주는 view
                    aspectRatio: 가로/세로 비율
                    weekends: 주말 표시
                    firstDay: 시작 요일
                    headerToolbar: 헤더 네비게이션
                    buttonText: 네비게이션 버튼 텍스트
                    titleFormat: 연/월 제목 표시 방식
                    eventTimeFormat: 시간 표시 방식
                    editable: 수정 가능 여부
                    dayMaxEvents: 팝업으로 펼쳐보기
                    dateClick: 날짜 클릭 이벤트
                    */
                    ref={calendarRef}
                    plugins={[
                        dayGridPlugin,
                        multiMonthPlugin,
                        interactionPlugin,
                    ]}
                    initialView="dayGridMonth"
                    aspectRatio={1.1}
                    weekends={true}
                    firstDay={1}
                    headerToolbar={{
                        left: "prevYear prev multiMonthYear",
                        center: "title",
                        right: "dayGridMonth today next nextYear",
                    }}
                    buttonText={{
                        today: "Today",
                        month: "Month",
                        year: "Year",
                    }}
                    titleFormat={(date) => {
                        // return `${date.date.year}.${date.date.month + 1}`;
                        return `${date.date.month + 1}월`;
                    }}
                    eventTimeFormat={{
                        hour: "numeric",
                        minute: "2-digit",
                        meridiem: "short",
                    }}
                    editable={true}
                    dayMaxEvents={true}
                    dateClick={(info) => handleDateClick(info)}
                />
            </CalendarCustomStyle>

            {isFormOpen && (
                <EventForm
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    eventForm={eventForm}
                    setEventForm={setEventForm}
                    dateClickPosition={dateClickPosition}
                />
            )}
        </Layout>
    );
}
