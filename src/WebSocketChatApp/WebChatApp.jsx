import NotificationSystem from "./NotificationSystem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotificationLogic from "./NotificationLogic";
import NotificationContext from "./NotificationContext";
import "./notification.css";

const WebChatApp = () => {
  return (
    <NotificationContext>
      <Router>
        <Routes>
          <Route path="/msg/:id" element={<NotificationLogic />} />
          <Route path="/" element={<NotificationSystem />} />
        </Routes>
      </Router>
    </NotificationContext>
  );
};

export default WebChatApp;
