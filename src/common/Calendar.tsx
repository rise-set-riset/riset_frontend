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

  // 가운데 숫자
  .fc-daygrid-day-top {
    position: absolute;
    cursor: pointer;
    z-index: 50;
  }

  .fc-daygrid-bg-harness {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fc-event {
    width: 80%;
    aspect-ratio: 1/1;
    position: relative;
    border-radius: 50%;
    background-color: var(--color-brand-main);
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.2);
    }
    z-index: 10;
  }

  .fc-bg-event {
    opacity: 1;
  }

  // 오늘 날짜
  .fc-day-today {
    background-color: transparent !important;
  }

  .fc-day-today .fc-daygrid-day-top {
    margin-top: 4px;
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
  .fc-event-container .fc-daygrid-day-number {
    color: white;
  }
`;

interface EventType {
  [key: string]: string;
}

interface Events {
  isEvents?: boolean;
  defaultEvents?: EventType[];
  handleIsFormOpen: (info: any) => void;
}

export default function Calendar({
  isEvents,
  defaultEvents,
  handleIsFormOpen,
}: Events) {
  const [datas, setData] = useState<EventType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentEvents, setCurrentEvents] = useState<EventType[]>([]);
  const calendarRef = useRef<any | null>(null);
  const [month, setMonth] = useState<string>("");

  /* 달력에서 이전달, 다음달 버튼 클릭 시 서버로부터 해당 달 데이터 가져오기 */
  useEffect(() => {
    // isEvents props가 true로 넘어올 경우에만 화면에 출근여부 색 이벤트 지정
    if (isEvents) {
      // 백엔드에 달 관련 정보 추후에 동적으로 넘겨주기
      // API 필요
      fetch("/data/events.json")
        .then((res) => res.json())
        .then((data: EventType[]) => {
          // 전체 데이터 세팅
          setData(data);
          // events에 사용할 데이터 세팅 (color는 근무 형식에 따른 색상으로 변경)
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
    } else {
      if (defaultEvents) {
        setCurrentEvents((prev) => [...prev, ...defaultEvents]);
      }
    }
  }, [month]);

  /* 이벤트가 있을 경우 색상 정해주기 */
  useEffect(() => {
    if (calendarRef.current) {
      // FullCalendar 객체에 접근
      const calendarApi = calendarRef.current.getApi();
      // 이벤트가 하나라도 있다면 = 칠해줄 일이 하나라도 있다면
      if (events.length > 0) {
        events.forEach(({ start }) => {
          const cell = calendarApi.el.querySelector(
            `td.fc-day[data-date="${start}"] div a`
          );
          if (cell) {
            cell.style.color = "var(--color-white)";
            cell.style.fontWeight = "bold";
          }
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
        showNonCurrentDates={false} // 다음 달의 날짜 없애기 (칸은 남아있음)
        aspectRatio={1.2} // 달력 가로 세로 비율 조정
        headerToolbar={{
          left: "prev", // 헤더 이전달 버튼
          center: "title", // 헤더 제목
          right: "next", // 헤더 다음달 버튼
        }}
        // 다음달 날짜 칸 없애기
        views={{
          dayGridMonth: {
            fixedWeekCount: false,
          },
        }}
        // 달력 제목 format
        titleFormat={{
          year: "numeric",
        }}
        // 달력에서 이전달, 다음달 버튼 클릭 시
        datesSet={(info) => {
          const currentMonth = new Date(info.start);
          setMonth((currentMonth.getMonth() + 1).toString());
        }}
        // 특정 날짜 클릭 시
        dateClick={(info) => {
          if (isEvents) {
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
          } else {
            // 현재 날짜 Date 형식
            const date = new Date(info.date);

            const setDateForm = (now: Date) => {
              const year = now.getFullYear();
              const month = (now.getMonth() + 1).toString().padStart(2, "0");
              const day = now.getDate().toString().padStart(2, "0");
              return `${year}-${month}-${day}`;
            };

            // 이벤트 생성
            const newEvent = {
              id: "unfixed",
              start: setDateForm(date),
              color: "var(--color-brand-main)",
            };

            // 이벤트 등록
            if (currentEvents) {
              setCurrentEvents((prev) => [...prev, newEvent]);
            }
            handleIsFormOpen(date);
          }
        }}
        events={isEvents ? events : currentEvents}
        eventDisplay={"background"}
      />
    </Layout>
  );
}
