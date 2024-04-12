import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";
import { ResponsiveContext } from "../../contexts/ResponsiveContext";

/* 캘린더 레이아웃 */
const Layout = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
`;

/* fullcalendar 스타일 */
const CalendarCustomStyle = styled.div<{ $month: string }>`
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-black);

  /* 월 */
  h2.fc-toolbar-title {
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  /* 헤더 Toolbar */
  div.fc-header-toolbar,
  div.fc-footer-toolbar {
    align-items: flex-end;

    .fc-toolbar-title {
      font-size: 1.2rem;
      font-weight: 500;
    }

    /* 양옆 이동 버튼 기준 */
    button.fc-button {
      padding: 0.5rem;
      font-weight: bold;
      border: none;
      border-radius: 50%;
      color: var(--color-black);
      background-color: var(--color-white);
      box-shadow: none !important;
      cursor: pointer;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &:active {
        color: var(--color-white);
        background-color: var(--color-brand-main);
        border: none;
      }
    }

    /* Month 버전, Year 버전 */
    button.fc-multiMonthYear-button,
    button.fc-dayGridMonth-button,
    button.fc-today-button {
      padding: 6px 26px;
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
      border-color: var(--color-brand-main);
    }

    .fc-daygrid-day-top {
      flex-direction: row;
      padding: 0.4rem 0.8rem;
    }
  }

  /* 오늘 날짜 표시 */
  td.fc-daygrid-day.fc-day-today .fc-daygrid-day-top a {
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: var(--color-brand-yellow);
  }

  /* 이벤트 스타일 */
  a.fc-h-event {
    padding-left: 0.5rem;
    border: none;
    border-radius: 12px;
    background-color: #ffbfa7;
  }

  /* Title 표시 */
  .fc-header-toolbar .fc-toolbar-chunk:nth-child(2) {
    text-align: center;

    &::after {
      content: "${(props) => props.$month}월";
      font-weight: bold;
      font-size: 1.5rem;

      @media screen and (max-width: 900px) {
        font-size: 1.2rem;
      }
    }
  }

  /* 드래그시 */
  div.fc-highlight {
    border: 1px solid var(--color-brand-main);
    background-color: var(--color-whtie);
  }

  /* 반응형 */
  @media screen and (max-width: 900px) {
    button.fc-prev-button,
    button.fc-prevYear-button,
    button.fc-next-button,
    button.fc-nextYear-button {
      font-size: 0.8rem;
      padding: 5px;
    }

    button.fc-multiMonthYear-button,
    button.fc-dayGridMonth-button,
    button.fc-today-button {
      font-size: 0.8rem;
      padding: 5px 16px !important;
    }

    .fc-toolbar-title {
      font-size: 1rem !important;
    }
  }

  @media screen and (max-width: 700px) {
    button.fc-prev-button,
    button.fc-prevYear-button,
    button.fc-next-button,
    button.fc-nextYear-button {
      font-size: 10px;
      padding: 4px;
    }

    button.fc-multiMonthYear-button,
    button.fc-dayGridMonth-button,
    button.fc-today-button {
      padding: 5px 7px !important;
    }
  }

  @media screen and (max-width: 599px) {
    td.fc-day.fc-daygrid-day .fc-daygrid-day-top {
      justify-content: center;
      font-size: 0.9rem;
      padding: 0;
    }

    button.fc-multiMonthYear-button,
    button.fc-dayGridMonth-button,
    button.fc-today-button {
      font-size: 0.8rem;
      width: 100px;
      height: 40px;
    }

    .fc-toolbar.fc-footer-toolbar {
      margin-top: 0.8rem;
    }
  }
`;

export interface EventFormType {
  /* Event Form 형식 */
  [key: string]: string;
}

export interface ClickPositionType {
  /* 클릭된 날짜 위치 */
  [key: string]: number;
}

export default function OfficialCalendar() {
  /* 
    formRef: Form 팝업 외 클릭 감지시 필요
    todayRef: Today 버튼 제어시 필요
    calendarRef: fullcalendar API 사용시 필요
    month: title 날짜
    isFormOpen: Form 팝업 표시 여부
    eventFormList: 모든 이벤트 목록
    eventForm: 추가하거나 수정할 이벤트 Form
    dateClickPosition: 날짜 선택시 마우스 위치
    */
  const formRef = useRef<any>(null);
  const todayRef = useRef<any>(null);
  const calendarRef = useRef<any>(null);
  const [month, setMonth] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [eventFormList, setEventFormList] = useState<EventFormType[]>([]);
  const [eventForm, setEventForm] = useState<EventFormType>({
    title: "",
    color: "#FFBFA7",
    start: "",
    end: "",
    writer: "",
    content: "",
  });
  const [dateClickPosition, setDateClickPosition] = useState<ClickPositionType>({
    x: 0,
    y: 0,
  });

  /* 날짜 선택시 */
  const handleDateClick = (info: any) => {
    setIsFormOpen(true);
    setDateClickPosition({
      x: info.jsEvent.x,
      y: info.jsEvent.y,
    });

    /* 드래그시 */
    if (info.endStr) {
      const date = new Date(info.endStr);
      date.setDate(date.getDate() - 1);
      const eventEnd: string = date.toISOString().split("T")[0];

      setEventForm((prevState) => ({
        ...prevState,
        start: info.startStr,
        end: eventEnd,
      }));
    } else {
      /* 클릭시 */
      setEventForm((prevState) => ({
        ...prevState,
        start: info.dateStr,
        end: info.dateStr,
      }));
    }

    /* 이벤트 추가 */
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const newEvent = {
        id: "unfixed",
        title: "New Event",
        start: info.startStr,
        end: info.endStr,
      };
      calendarApi.addEvent(newEvent);
    }
  };

  /* 이벤트 클릭시 */
  const handleEventClick = (info: any) => {
    const getEvent = info.event;
    setEventForm({
      title: getEvent?._def.title,
      start: getEvent?._instance.range.start,
      end: getEvent?._instance.range.end,
      color: getEvent?._def.ui.backgroundColor,
      ...getEvent?._def.extendedProps,
    });
    console.log(eventForm);

    setIsFormOpen(true);
    setDateClickPosition({
      x: info.jsEvent.x,
      y: info.jsEvent.y,
    });
  };

  /* 이벤트 저장 취소 */
  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEventForm({
      title: "",
      color: "#FFBFA7",
      start: "",
      end: "",
      writer: "",
      content: "",
    });
    /* 이벤트 삭제 */
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const unfixedEventObj = calendarApi.getEventById("unfixed");
      if (unfixedEventObj) {
        unfixedEventObj.remove();
      }
    }
  };

  /* 이벤트 저장 */
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsFormOpen(false);

    setEventFormList((prevState) => [...prevState, eventForm]);
    setEventForm({
      title: "",
      color: "#FFBFA7",
      start: "",
      end: "",
      writer: "",
      content: "",
    });
  };

  /* Event Form 팝업창 외 클릭 감지 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        /* Form 팝업창 닫기 */
        setIsFormOpen(false);
        /* 이벤트 삭제 */
        if (calendarRef.current) {
          const calendarApi = calendarRef.current.getApi();
          const unfixedEventObj = calendarApi.getEventById("unfixed");
          if (unfixedEventObj) {
            unfixedEventObj.remove();
          }
        }
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  /* Today 버튼 제어 */
  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.querySelector(
        "button.fc-today-button.fc-button.fc-button-primary"
      ).disabled = false;
    }
  });

  const { isMobile } = useContext(ResponsiveContext);

  return (
    <Layout>
      <CalendarCustomStyle ref={todayRef} $month={month}>
        <FullCalendar
          /*
            ref: useRef
            plugins: 당월, 한해, 이벤트 view
            initialView: 처음 보여주는 view
            headerToolbar: 헤더 네비게이션
            buttonText: 네비게이션 버튼 텍스트
            titleFormat: 연/월 제목 표시 방식
            eventTimeFormat: 시간 표시 방식
            events: 이벤트 목록
            editable: 수정 가능 여부
            selectable: 날짜 선택 가능 여부
            select: 날짜 드래그 함수
            eventClick: 이벤트 클릭시 실행되는 함수
            eventMouseEnter: mouseEnter 이벤트
            eventMouseLeave: mouseLeave 이벤트
            dayMaxEvents: 팝업으로 펼쳐보기
            views: 현재 월만 표시
            dateSet: 월 이동시 실행되는 함수
            aspectRatio: 가로/세로 비율
            */
          ref={calendarRef}
          plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={
            isMobile
              ? {
                  left: "prevYear prev",
                  center: "title",
                  right: "next nextYear",
                }
              : {
                  left: "prevYear prev multiMonthYear",
                  center: "title",
                  right: "dayGridMonth today next nextYear",
                }
          }
          footerToolbar={
            isMobile
              ? {
                  left: "multiMonthYear",
                  center: "today",
                  right: "dayGridMonth",
                }
              : {}
          }
          buttonText={{
            today: "Today",
            month: "Month",
            year: "Year",
          }}
          titleFormat={(date) => {
            return `${date.date.year}`;
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          events={eventFormList}
          editable={true}
          selectable={!isFormOpen}
          select={(info) => handleDateClick(info)}
          eventClick={(info) => handleEventClick(info)}
          eventMouseEnter={(info) => {
            info.el.style.backgroundColor = "var(--color-brand-main)";
          }}
          eventMouseLeave={(info) => {
            info.el.style.backgroundColor = "";
          }}
          dayMaxEvents={true}
          views={{
            dayGridMonth: {
              type: "dayGrid",
              duration: { months: 1 },
              fixedWeekCount: false,
            },
          }}
          datesSet={(info) => {
            const currentMonth = new Date(info.start);
            setMonth((currentMonth.getMonth() + 1).toString());
          }}
          aspectRatio={isMobile ? 0.8 : 1.2}
        />
      </CalendarCustomStyle>

      {isFormOpen && (
        <div ref={formRef}>
          <EventForm
            eventForm={eventForm}
            setEventForm={setEventForm}
            dateClickPosition={dateClickPosition}
            handleFormCancel={handleFormCancel}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      )}
    </Layout>
  );
}
