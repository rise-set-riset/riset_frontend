import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm";
import { ResponsiveContext } from "../../../contexts/ResponsiveContext";

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

    &:hover {
      background-color: var(--color-brand-main) !important;
      color: var(--color-white) !important;
    }
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
    isMobile: 모바일화면 여부
    formRef: Form 팝업 외 클릭 감지시 필요
    todayRef: Today 버튼 제어시 필요
    calendarRef: fullcalendar API 사용시 필요
    year: title 연도
    month: title 월
    isFormOpen: Form 팝업 표시 여부
    eventFormList: 모든 이벤트 목록
    eventForm: 추가하거나 수정할 이벤트 Form
    dateClickPosition: 날짜 선택시 마우스 위치
    isEditorForm: 새로 추가한 창인지, 수정하는 창인지 (삭제 기능 추가됨)
    */
  const jwt = localStorage.getItem("jwt");
  const { isMobile } = useContext(ResponsiveContext);
  const formRef = useRef<any>(null);
  const todayRef = useRef<any>(null);
  const calendarRef = useRef<any>(null);
  const [year, setYear] = useState<string>(
    new Date().toISOString().slice(0, 4)
  );
  const [month, setMonth] = useState<string>(
    new Date().toISOString().slice(5, 7)
  );
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
  const [dateClickPosition, setDateClickPosition] = useState<ClickPositionType>(
    {
      x: 0,
      y: 0,
    }
  );
  const [isEditorForm, setIsEditorForm] = useState<boolean>(false);

  /* 날짜 선택시 */
  const handleDateClick = (info: any) => {
    setDateClickPosition({
      x: info.jsEvent.x,
      y: info.jsEvent.y,
    });

    const date = new Date(info.endStr);
    date.setDate(date.getDate() - 1);
    const eventEnd: string = date.toISOString().split("T")[0];
    setEventForm((prevState) => ({
      ...prevState,
      start: info.startStr,
      end: eventEnd,
    }));

    setIsFormOpen(true);

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
    const finalForm = {
      ...eventForm,
      // 종료 시간이 없다면 24:00 추가
      end:
        eventForm.start === eventForm.end || eventForm.end.includes("T")
          ? eventForm.end
          : `${eventForm.end}T24:00`,
    };

    /* 서버에 데이터 전송 */
    fetch("https://dev.risetconstruction.net/api/companySchedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(finalForm),
    })
      .then((res) => res.json())
      .then((data) => {
        setEventFormList((prevList) => {
          return [...prevList, data];
        });
      });

    /* 초기화 */
    setEventForm({
      start: "",
      end: "",
      title: "",
      writer: "",
      content: "",
      color: "#FFBFA7",
    });

    setIsFormOpen(false);
  };

  /* 이벤트 클릭시 */
  const handleEventClick = (info: any) => {
    info.jsEvent.cancelBubble = true;
    info.jsEvent.preventDefault();
    setDateClickPosition({
      x: info.jsEvent.x,
      y: info.jsEvent.y,
    });

    /* id에 해당하는 이벤트 찾기 */
    const findId = info.event._def.extendedProps.scheduleNo;
    const selectedEvent = eventFormList.filter(
      (form) => form.scheduleNo === findId
    )[0];
    setEventForm(selectedEvent);
    setIsFormOpen(true);
    setIsEditorForm(true);
  };

  /* Event 삭제 */
  const handleRemoveEvent = (findId: number | string) => {
    /* 이벤트 리스트 상태값에서 삭제 */
    setEventFormList((prevList) => {
      return prevList.filter((form) => form.id !== findId);
    });

    /* 서버에서 삭제 */
    fetch(`https://dev.risetconstruction.net/api/delete?id=${findId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        console.log("ok");
      } else {
        throw new Error("이벤트 삭제 실패");
      }
    });

    setIsFormOpen(false);
    setEventFormList((prevList) => {
      return prevList.filter((plan) => plan.scheduleNo !== findId);
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

  /* 페이지 처음 진입시 일정 데이터 받아오기 */
  useEffect(() => {
    const current =
      `${year}${month}` ===
      new Date().toISOString().slice(0, 7).replace("-", "")
        ? `${year}${month}`
        : `${year}${month.padStart(2, "0")}`;
    fetch(`https://dev.risetconstruction.net/api/get?currentMonth=${current}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        setEventFormList(data);
      });
  }, []);

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
            selectable: 날짜 선택 가능 여부
            select: 날짜 드래그 함수
            eventClick: 이벤트 클릭시 실행되는 함수
            dayMaxEvents: 팝업으로 펼쳐보기
            views: 현재 월만 표시
            aspectRatio: 가로/세로 비율
            editable: 드래그 가능 여부
            displayEventTime: 이벤트 시간 표시
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
            setYear(date.date.array[0].toString());
            setMonth((date.date.array[1] + 1).toString());
            return `${date.date.year}`;
          }}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          events={eventFormList}
          selectable={!isFormOpen}
          select={(info) => handleDateClick(info)}
          eventClick={(info) => handleEventClick(info)}
          dayMaxEvents={true}
          views={{
            dayGridMonth: {
              type: "dayGrid",
              duration: { months: 1 },
              fixedWeekCount: false,
            },
          }}
          aspectRatio={isMobile ? 0.8 : 1.2}
          displayEventTime={false}
          editable={false}
          // eventDrop={(info) => console.log(info)}
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
            isEditorForm={isEditorForm}
            handleRemoveEvent={handleRemoveEvent}
          />
        </div>
      )}
    </Layout>
  );
}
