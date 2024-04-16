import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function TestChat() {
  const [messages, setMessages] = useState([]);

  // 메시지 목록이 업데이트될 때마다 스크롤을 최하단으로 이동시키는 함수
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {
  //   // WebSocket 연결 설정
  //   socketRef.current = new SockJS('http://localhost:8080/chat-websocket');
  //   const client = new Client({
  //     webSocketFactory: () => socketRef.current,
  //   });

  //   // 연결 시도
  //   client.activate();

  //   // 연결 성공 시 실행될 콜백
  //   client.onConnect = () => {
  //     console.log('Connected to WebSocket');
  //     // 채팅방 구독
  //     client.subscribe('/topic/public', (message) => {
  //       setMessages(prevMessages => [...prevMessages, message.body]);
  //     });
  //   };

  //   // 컴포넌트가 언마운트될 때 연결 종료
  //   return () => {
  //     client.deactivate();
  //     console.log('Disconnected from WebSocket');
  //   };
  // }, []); // 컴포넌트가 처음 렌더링될 때만 연결 및 구독

  return (
    <div>
      <h1 style={{ marginTop: "100px" }}>Chat Room</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
