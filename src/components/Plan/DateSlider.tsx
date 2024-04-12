import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Layout = styled.div<{ $month: string }>`
  width: 320px;

  div.fc-media-screen.fc-direction-ltr.fc-theme-standard {
    position: relative;
    height: 140px;
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
        font-size: 1.2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }

      &::after {
        content: "${(props) => props.$month}월";
        font-weight: bold;
        font-size: 1.5rem;
      }
    }

    /* 헤더 버튼 */
    button.fc-button.fc-button-primary {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      border: none;
      border-radius: 50%;
      box-shadow: none !important;
      color: var(--color-black);
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      z-index: 10;
      margin: 0;

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
      position: absolute;
      margin: 0;
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

      /* thead */
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
              border-radius: 50%;
              background-color: var(--color-white);
              color: var(--color-brand-lightgray);
              font-size: 1rem;
              display: flex;
              justify-content: center;
              align-items: center;

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

export default function DateSlider() {
  const [month, setMonth] = useState<string>("");
  const calendarRef = useRef<any>(null);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  /* 날짜 클릭시 현재 날짜로 설정 */
  const handleDateClick = (date: any) => {
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
      calendarRef.current
        .getApi()
        .gotoDate(
          new Date(
            currentStart.getFullYear(),
            currentStart.getMonth() - 1,
            currentStart.getDate()
          )
        );
    }
  };

  /* 다음 월로 이동 */
  const nextMonth = () => {
    const currentStart = calendarRef.current.getApi().view.currentStart;
    if (calendarRef.current) {
      calendarRef.current
        .getApi()
        .gotoDate(
          new Date(
            currentStart.getFullYear(),
            currentStart.getMonth() + 1,
            currentStart.getDate()
          )
        );
    }

    // setCurrentDate()
  };

  useEffect(() => {
    console.log(calendarRef.current.getApi().currentData.currentDate);
  });

  return (
    <Layout $month={month}>
      <FullCalendar
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
            click: prevMonth, // 이전 월로 이동하는 함수 연결
          },
          customNextButton: {
            click: nextMonth, // 다음 월로 이동하는 함수 연결
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
        navLinks={true}
        navLinkDayClick={(date, jsEvent) => {
          handleDateClick(date);
        }}
      />
    </Layout>
  );
}