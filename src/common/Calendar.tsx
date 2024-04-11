import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const Layout = styled.div<{ $month: string }>`
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-brand-lightgray);
    border-radius: 1rem;
    padding: 1rem 0;
    overflow: hidden;

    // 전체 테이블 border 없애기
    table,
    thead,
    tbody,
    tr,
    td,
    th {
        border: none !important;
        overflow-y: hidden;
    }
    // Header
    .fc-header-toolbar {
        padding: 0 100px;
    }
    // 좌/우 이동 버튼
    .fc .fc-button-primary {
        color: var(--color-black);
        background-color: transparent;
        border: none;
        box-shadow: none;
    }
    // 좌/우 이동 버튼
    .fc-button.fc-next-button,
    .fc-button.fc-prev-button {
        &:active {
            color: var(--color-white);
            background-color: var(--color-brand-main);
            box-shadow: none !important;
        }
    }
    // Header 제목
    .fc-toolbar-chunk:nth-child(2) {
        text-align: center;
        &::after {
            content: "${(props) => props.$month}";
            font-weight: bold;
            font-size: 24px;
        }
    }
    // Header 제목
    .fc .fc-toolbar-title {
        font-size: 10px;
        text-align: center;
    }
    // 이전/다음달 날짜
    .fc .fc-day-disabled {
        background-color: transparent;
    }
    // 모든 날짜 셀
    .fc .fc-daygrid-day-frame {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    // 이벤트 조절
    .fc-daygrid-day-events,
    .fc-daygrid-day-events * {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    // 가운데 숫자
    .fc-daygrid-day-top {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        margin-left: 2px;
        padding: 0.7rem;
        transition: transform 0.3s;
    }
    // 오늘 날짜
    .fc-day-today {
        background-color: transparent !important;
    }
    .fc-day-today .fc-daygrid-day-top {
        &::before {
            content: "TODAY";
            font-size: 8px;
            font-weight: bold;
            margin-right: -2px;
            color: var(--color-white);
            margin-top: -5px;
            position: absolute;
        }
    }
`;

interface EventType {
    [key: string]: string;
}

interface Events {
    isEvents?: boolean;
    handleIsFormOpen: (info: any) => void;
}

export default function CommuteCalendar({
    isEvents,
    handleIsFormOpen,
}: Events) {
    const [datas, setData] = useState<EventType[]>([]);
    const [events, setEvents] = useState<EventType[]>([]);
    const calendarRef = useRef<any | null>(null);
    const [month, setMonth] = useState<string>("");

    // isEvents props가 true로 넘어올 경우 화면에 출근여부 색 이벤트 지정
    useEffect(() => {
        if (isEvents) {
            fetch("/data/events.json")
                .then((res) => res.json())
                .then((data: EventType[]) => {
                    // 전체 데이터 세팅
                    setData(data);
                    // 필터링 된 events에 쓰일 데이터 세팅
                    const eventList = data.map(({ color, start }) => ({
                        color:
                            color === "full" || color === "today"
                                ? "var(--color-brand-main)"
                                : color === "half"
                                ? "var(--color-brand-yellow)"
                                : "var(--color-brand-lightgray)",
                        start,
                    }));

                    setEvents(eventList);
                });
        }
    }, []);

    // event 표시 색상 정해주기
    useEffect(() => {
        if (calendarRef.current) {
            // FullCalendar 객체에 접근
            const calendarApi = calendarRef.current.getApi();

            if (events.length > 0) {
                events.forEach(({ start }) => {
                    const cell = calendarApi.el.querySelector(
                        `.fc-day[data-date="${start}"] a`
                    );
                    cell.style.color = "var(--color-white)";
                    cell.style.fontWeight = "bold";
                });
            }
        }
    }, [events]);

    return (
        <Layout $month={month}>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                showNonCurrentDates={false} // 다음 달의 날짜를 숨김
                aspectRatio={1.2} // 가로 세로 비율 조정
                headerToolbar={{
                    left: "prev",
                    center: "title", // 헤더 제목
                    right: "next",
                }}
                views={{
                    dayGridMonth: {
                        fixedWeekCount: false, // 다음달 날짜 안보이게 하기
                    },
                }}
                titleFormat={{
                    year: "numeric",
                }}
                datesSet={(info) => {
                    const currentMonth = new Date(info.start);
                    setMonth((currentMonth.getMonth() + 1).toString());
                }}
                dateClick={(info) => {
                    // 현재 날짜, 클릭한 달력 날짜 비교 후 적을 경우 처리 X
                    const currentDate = new Date().getDate();
                    const clickedDate = new Date(info.date).getDate();
                    if (currentDate < clickedDate) return;

                    // 데이터가 있는 경우에만 함수 호출
                    const data: EventType | undefined = datas.find(
                        (event) => event.start === info.dateStr
                    );
                    if (data) {
                        handleIsFormOpen(data);
                    }
                }}
                events={events}
            />
        </Layout>
    );
}
