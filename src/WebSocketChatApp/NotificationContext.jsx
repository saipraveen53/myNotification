import axios from "axios";
import React, { createContext, useState, useEffect, useCallback } from "react";

export const Context = createContext();

const NotificationContext = ({ children }) => {
  const [gdata, setGdata] = useState([]);
  const [lastSseMsgId, setLastSseMsgId] = useState(null);
  const [sseError, setSseError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const username = "John_Doe";

  // Get backend URL from environment variables
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8081";

  const fetchNotifications = useCallback(async () => {
    try {
      setApiError(null);
      const res = await axios.get(
        `${backendUrl}/api/notifications/all/${username}`
      );
      const data = res.data;
      setGdata(data);

      const unread = data.find((msg) => !msg.read);
      setLastSseMsgId(unread ? unread.id : null);

      console.log("Initial notification fetch:", data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setApiError(err.message || "Failed to fetch notifications");
    }
  }, [username, backendUrl]);

  useEffect(() => {
    const sseUrl = `${backendUrl}/api/notifications/subscribe/${username}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.addEventListener("notification", (event) => {
      try {
        setSseError(null);
        const incoming = JSON.parse(event.data);
        console.log("New Notification (SSE):", incoming);

        setGdata((prev) => {
          const isDuplicate = prev.some((n) => n.id === incoming.id);
          return isDuplicate ? prev : [incoming, ...prev];
        });

        setLastSseMsgId(incoming.id);
      } catch (err) {
        console.error("Error parsing SSE data:", err);
        setSseError("Failed to process real-time update");
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
      setSseError("Realtime connection failed - attempting to reconnect...");
      eventSource.close();
    };

    return () => {
      console.log("Closing SSE connection");
      eventSource.close();
    };
  }, [username, backendUrl]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Context.Provider
      value={{
        gdata,
        setGdata,
        lastSseMsgId,
        errors: {
          sse: sseError,
          api: apiError,
        },
        refetch: fetchNotifications,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default NotificationContext;
