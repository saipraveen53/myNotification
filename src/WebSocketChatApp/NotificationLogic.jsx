import React, { useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Context } from "./NotificationContext";

const NotificationLogic = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";

  const { gdata, setGdata } = useContext(Context);
  const message = gdata.find((msg) => msg.id === Number(id));

  const deleteHandler = (id) => {
    setGdata((prev) => prev.filter((msg) => msg.id !== id));
    navigate(`/?page=${page}`);
  };

  if (!message)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg w-full text-center">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Message not found.
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            The notification you're trying to access doesn't exist.
          </p>
          <button
            className="btn btn-sm btn-warning mt-4"
            onClick={() => navigate(`/?page=${page}`)}
          >
            ← Back to Notifications
          </button>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg w-full">
        <button
          className="btn btn-sm btn-primary mb-4"
          onClick={() => navigate(`/?page=${page}`)}
        >
          ← Back to Notifications
        </button>

        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-blue-800 dark:text-white">
            Notification from {message.sender}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            🕒 {new Date(message.createdAt).toLocaleString()}
          </p>
          <p className="text-base text-gray-800 dark:text-gray-100 mt-4">
            {message.message}
          </p>

          {message.link && (
            <a
              href={message.link}
              className="text-blue-600 dark:text-blue-300 hover:underline mt-4 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.link}
            </a>
          )}

          <br />
          <button
            className="btn btn-sm btn-info mt-4"
            onClick={() => deleteHandler(message.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationLogic;
