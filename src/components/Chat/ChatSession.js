import { Client, Message } from "@stomp/stompjs";

const client = new StompJs.Client();
client.brokerURL = "ws://localhost:15674/ws";

const client = new StompJs.Client({
  brokerURL: "ws://localhost:15674/ws",
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
};

client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};

client.activate();

client.deactivate();

client.publish({ destination: "/topic/general", body: "Hello world" });

// There is an option to skip content length header
client.publish({
  destination: "/topic/general",
  body: "Hello world",
  skipContentLengthHeader: true,
});

// Additional headers
client.publish({
  destination: "/topic/general",
  body: "Hello world",
  headers: { priority: "9" },
});

/* 구독 */
const subscription = client.subscribe("/queue/test", callback);

callback = function (message) {
  // called when the client receives a STOMP message from the server
  if (message.body) {
    alert("got message with body " + message.body);
  } else {
    alert("got empty message");
  }
};

// const subscription = client.subscribe("queue/test", onmessage);

// // ... use the subscription ...

// subscription.unsubscribe();

const quote = { symbol: "AAPL", value: 195.46 };
client.publish({
  destination: "/topic/stocks",
  body: JSON.stringify(quote),
});

client.subscribe("/topic/stocks", function (message) {
  const quote = JSON.parse(message.body);
  alert(quote.symbol + " is at " + quote.value);
});
