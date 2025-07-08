import React, { useState } from "react";
import { motion } from "framer-motion";

const WebChat = () => {
  let [connected, setConnected] = useState(false);
  let [popup, setPopup] = useState(null);
  let [message, setMessage] = useState([]);
  let [readIndex, setreadIndex] = useState([]);
  let receiveMessages = () => {
    if (connected) return;
    let newEventSource = new EventSource("http://localhost:8000/slow-events");
    newEventSource.onmessage = (event) => {
      setMessage((prev) => {
        let updatedMessage = [...prev, event.data];
        setPopup(event.data);
        setTimeout(() => setPopup(null), 3000);
        return updatedMessage;
      });
    };
    newEventSource.onerror = (err) => {
      setConnected(false);
      console.error("connection error", err);
      newEventSource.close();
    };
    setConnected(true);
  };

  let readMessage = (index) => {
    if (!readIndex.includes(index)) {
      setreadIndex((prev) => [...prev, index]);
    }
  };

  let unreadMsg = message.length - readIndex.length;

  return (
    <div>
      <div className="body">
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
          className="unreadMessageContainer"
        >
          <button disabled={connected} onClick={receiveMessages}>
            Get Notifications
          </button>
          &emsp;
          <span>
            <i class="fa-regular fa-bell"></i>
          </span>
          <span style={{ position: "absolute", fontSize: "15px", top: "0px" }}>
            {unreadMsg}
          </span>
        </div>
        {message.map((msg, index) => {
          let isRead = readIndex.includes(index);
          return (
            <div
              style={{ marginTop: "5px" }}
              onClick={() => readMessage(index)}
              key={index}
            >
              <li
                style={{
                  fontWeight: isRead ? "normal" : "bold",
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor: isRead ? "#f0f0f0" : "#d1e7dd",
                  border: "1px solid #ced4da",
                  borderRadius: "5px",
                  margin: "5px 0",
                }}
              >
                {msg}
              </li>
            </div>
          );
        })}
      </div>
      <div className="newMessageContainer">
        {popup && (
          <motion.div
            initial={{ opacity: "0", x: "200px" }}
            animate={{ opacity: "1", x: "0" }}
            transition={{ duration: "0.3" }}
            style={{
              height: "60px",
              width: "500px",
              backgroundColor: "red",
              position: "fixed",
              right: "0px",
              display: "flex",
              alignItems: "center",
              bottom: "0px",
              paddingLeft: "30px",
            }}
            className="newMessage"
          >
            {popup}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebChat;
