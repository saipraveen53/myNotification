import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const NotificationContext = ({ children }) => {
  const [gdata, setGdata] = useState([
    {
      id: 1,
      from: "HR",
      message: "Hey, how are you?",
      timestamp: "2025-01-30T09:10:00Z",
      seen: true,
    },
    {
      id: 2,
      from: "HR",
      message: "Did you complete the task?",
      timestamp: "2025-02-25T09:15:00Z",
      seen: true,
    },
    {
      id: 3,
      from: "ADMIN",
      message: "perfomance have a meeting at 11.",
      timestamp: "2025-03-30T09:20:00Z",
      seen: true,
    },
    {
      id: 4,
      from: "ADMIN",
      message: " attendance Can you send me the file?",
      timestamp: "2025-04-30T09:25:00Z",
      seen: true,
    },
    {
      id: 5,
      from: "MANAGER",
      message: " leave Good morning!",
      timestamp: "2025-05-30T09:30:00Z",
      seen: true,
    },
    {
      id: 6,
      from: "MANAGER",
      message: "leave review my PR.",
      timestamp: "2025-06-30T09:35:00Z",
      seen: false,
    },
    {
      id: 7,
      from: "FINANCE",
      message: "attendance me when you're free.",
      timestamp: "2025-07-30T09:40:00Z",
      seen: false,
    },
    {
      id: 8,
      from: "FINANCE",
      message: "finance at 1?",
      timestamp: "2025-08-30T09:45:00Z",
      seen: false,
    },
    {
      id: 9,
      from: "HR",
      message: "perfomance your inbox.",
      timestamp: "2025-09-30T09:50:00Z",
      seen: false,
    },
    {
      id: 10,
      from: "ADMIN",
      message:
        "finance we reschedule? djfb jewdijehew  fjehferk  jieq lo  ehih   ewhdiewndew iu  iwehjwe hj",
      timestamp: "2025-10-30T09:55:00Z",
      seen: false,
      link: "http://www.google.com",
    },
  ]);
  const [lastSseMsgId, setLastSseMsgId] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/slow-events");

    eventSource.onmessage = (event) => {
      try {
        const newMsg = {
          id: new Date().getTime(),
          from: "unknown",
          message: event.data,
          timestamp: new Date().toISOString(),
          seen: false,
        };
        setGdata((prev) => [newMsg, ...prev]);
        setLastSseMsgId(newMsg.id);
      } catch (e) {
        console.error(e);
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <Context.Provider value={{ gdata, setGdata, lastSseMsgId }}>
      {children}
    </Context.Provider>
  );
};

export default NotificationContext;
