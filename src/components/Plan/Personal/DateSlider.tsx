import React, { useRef, useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Layout = styled.div<{ $month: string }>`
  width: 320px;

  div.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    height: 140px;
    position: relative;
    table,
    th {
      border: none;
    }
  }

  /* 헤더 */
  div.fc-header-toolbar {
    padding: 0 3.5rem;
    margin-bottom: 2rem !important;

    /* Title 스타일 */
    .fc-toolbar-chunk:nth-child(2) {
      text-align: center;

      .fc-toolbar-title {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        font-weight: 500;
      }

      &::after {
        content: "${(props) => props.$month}월";
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    /* 헤더 버튼 */
    button.fc-button.fc-button-primary {
      z-index: 10;
      width: 40px;
      height: 40px;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-black);
      font-weight: bold;
      border: none;
      border-radius: 50%;
      box-shadow: none !important;
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
      }

      &:active {
        color: var(--color-white);
        background-color: var(--color-brand-main);
      }
    }

    button.fc-prev-button.fc-button-primary {
      margin: 0;
      position: absolute;
      top: 92px;
      left: -5px;
    }

    button.fc-next-button.fc-button-primary {
      position: absolute;
      top: 92px;
      right: -5px;
    }
  }

  /* 날짜 표시 */
  div.fc-dayGrid-view.fc-view.fc-daygrid {
    margin: 0 auto;
    height: 40px;

    table.fc-scrollgrid.fc-scrollgrid-liquid {
      width: 250px;
      margin: 0 auto;

      thead {
        height: 40px;

        table.fc-col-header {
          border-collapse: separate;
          border-spacing: 0.5rem 0;

          th {
            text-align: center;
            vertical-align: middle;
            border-radius: 50%;
            border: none;

            &:nth-child(3) {
              a {
                color: var(--color-white);
                background-color: var(--color-brand-main);
              }
            }

            a {
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1rem;
              color: var(--color-brand-lightgray);
              background-color: var(--color-white);
              border-radius: 50%;

              &:active {
                color: var(--color-white);
                background-color: var(--color-brand-main);
              }
            }
          }
        }
      }

      /* tbody */
      tbody {
        * {
          height: 0;
          display: none;
        }
      }
    }
  }

  /* 오늘 날짜 표시 */
  th.fc-day-today a {
    color: var(--color-brand-main);
  }
  .fc-day-today.fc-daygrid-day {
    background-color: transparent;
  }
`;

interface DateSliderProps {
  /* 날짜 이동시 현재 날짜 설정 */
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

export default function DateSlider({ setCurrentDate }: DateSliderProps) {
  /*
  month: Title 표시용
  calendarRef: Fullcalendar useRef 설정
  */
  const [month, setMonth] = useState<string>("");
  const calendarRef = useRef<any>(null);

  /* 날짜 클릭시 현재 날짜로 설정 */
  const handleDateClick = (date: any) => {
    setCurrentDate(date);
    if (calendarRef.current) {
      calendarRef.current
        .getApi()
        .gotoDate(
          new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2)
        );
    }
  };

  /* 이전 월로 이동 */
  const prevMonth = () => {
    if (calendarRef.current) {
      const currentStart = calendarRef.current?.getApi().view.currentStart;
      const selectedDate = new Date(
        currentStart.getFullYear(),
        currentStart.getMonth() - 1,
        currentStart.getDate()
      );
      calendarRef.current.getApi().gotoDate(selectedDate);
      setCurrentDate(
        new Date(
          currentStart.getFullYear(),
          currentStart.getMonth() - 1,
          currentStart.getDate() + 2
        )
      );
    }
  };

  /* 다음 월로 이동 */
  const nextMonth = () => {
    if (calendarRef.current) {
      const currentStart = calendarRef.current.getApi().view.currentStart;
      calendarRef.current
        .getApi()
        .gotoDate(
          new Date(
            currentStart.getFullYear(),
            currentStart.getMonth() + 1,
            currentStart.getDate()
          )
        );
      setCurrentDate(
        new Date(
          currentStart.getFullYear(),
          currentStart.getMonth() + 1,
          currentStart.getDate() + 2
        )
      );
    }
  };

  return (
    <Layout $month={month}>
      <FullCalendar
        /* 
        ref: 달력 api 접근용
        plugins: 달력 내 사용할 기능
        initialView: 처음 보여주는 방식
        views: 5일씩만 보여주도록 Custom
        headerToolbar: 헤더 버튼
        customButtons: 월이동 버튼 Custom
        buttonIcons: 버튼 아이콘 모양
        titleFormat: 연/월 title 형식
        dayHeaderFormat: 날짜 형식
        datesSet: 월/일 이동시 호출
        navLinks: 날짜 링크
        navLinkDayClick: 날짜 클릭시 호출
        */
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGrid"
        views={{
          dayGrid: {
            type: "dayGrid",
            dayCount: 5,
          },
        }}
        headerToolbar={{
          left: "customPrevButton prev",
          center: "title",
          right: "next customNextButton",
        }}
        customButtons={{
          customPrevButton: {
            click: prevMonth,
          },
          customNextButton: {
            click: nextMonth,
          },
        }}
        buttonIcons={{
          customPrevButton: "chevron-left",
          customNextButton: "chevron-right",
        }}
        titleFormat={(date) => {
          const startDate = new Date(date.start.marker);
          const centerDay = new Date(startDate);
          centerDay.setDate(startDate.getDate() + 2);
          setMonth((centerDay.getMonth() + 1).toString());
          return `${centerDay.getFullYear()}`;
        }}
        dayHeaderFormat={{ day: "numeric" }}
        datesSet={(date) => {
          setCurrentDate(
            new Date(
              date.start.getFullYear(),
              date.start.getMonth() + 1,
              date.start.getDate() + 2
            )
          );
        }}
        navLinks={true}
        navLinkDayClick={(date, jsEvent) => {
          handleDateClick(date);
        }}
      />
    </Layout>
  );
}
