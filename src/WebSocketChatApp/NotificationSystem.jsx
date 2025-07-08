import React, { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

const NotificationSystem = () => {
  const navigate = useNavigate();
  const { gdata, setGdata, lastSseMsgId } = useContext(Context);

  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(null);
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [filtereddata, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const itemsPerPage = 5;

  const handleSearch = useCallback(() => {
    let filtered = gdata.filter((msg) => {
      if (tab === "Unread" && msg.seen) return false;
      if (search && !msg.from.toLowerCase().includes(search.toLowerCase()))
        return false;
      const msgDate = new Date(msg.timestamp);
      if (startdate && msgDate < new Date(startdate)) return false;
      if (enddate && msgDate > new Date(enddate)) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [gdata, tab, search, startdate, enddate]);

  useEffect(() => {
    handleSearch();
  }, [gdata, handleSearch]);

  useEffect(() => {
    setCurrentPage(1);
    handleSearch();
  }, [tab, search, startdate, enddate, handleSearch]);

  const handleView = (id) => {
    if (editMode) return;
    setGdata((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, seen: true } : msg))
    );
    navigate(`/msg/${id}`);
  };

  useEffect(() => {
    if (!lastSseMsgId) return;
    const newMsg = gdata.find((msg) => msg.id === lastSseMsgId);
    setPopup(newMsg);
    setTimeout(() => setPopup(null), 3000);
  }, [lastSseMsgId, gdata]);

  const totalPages = Math.ceil(filtereddata.length / itemsPerPage);
  const paginatedData = filtereddata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!editMode) {
      setSelectedIds([]);
    }
  }, [editMode]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#222",
        color: "#eee",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 180,
          background: "#181818",
          borderRight: "1px solid #333",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 12 }}>Inbox</div>
      </aside>

      <div
        style={{
          flex: 1,
          marginLeft: 180,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "sticky",
            top: 0,
            background: "#232323",
            padding: "10px 16px",
            borderBottom: "1px solid #333",
            alignItems: "center",
            gap: 12,
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setTab("All")}
            style={{
              padding: "6px 16px",
              borderRadius: 4,
              border: "1px solid #444",
              background: tab === "All" ? "#2e7d32" : "#181818",
              color: tab === "All" ? "#fff" : "#ccc",
              marginRight: 6,
              cursor: "pointer",
            }}
          >
            All
          </button>
          <button
            onClick={() => setTab("Unread")}
            style={{
              padding: "6px 16px",
              borderRadius: 4,
              border: "1px solid #444",
              background: tab === "Unread" ? "#2e7d32" : "#181818",
              color: tab === "Unread" ? "#fff" : "#ccc",
              marginRight: 16,
              cursor: "pointer",
            }}
          >
            Unread
          </button>
          <input
            type="text"
            placeholder="Search notifications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: 4,
              border: "1px solid #444",
              background: "#181818",
              color: "#eee",
              minWidth: 0,
              marginRight: 16,
            }}
          />
          <input
            type="datetime-local"
            value={startdate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #444",
              borderRadius: "6px",
              backgroundColor: "#1e1e1e",
              color: "#eee",
              fontSize: "14px",
              width: "200px",
              cursor: "pointer",
            }}
          />
          <input
            type="datetime-local"
            value={enddate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #444",
              borderRadius: "6px",
              backgroundColor: "#1e1e1e",
              color: "#eee",
              fontSize: "14px",
              width: "200px",
              cursor: "pointer",
            }}
          />
          <button
            onClick={() => {
              setTab("All");
              setSearch("");
              setStartDate("");
              setEndDate("");
            }}
            style={{
              marginLeft: 8,
              padding: "6px 14px",
              borderRadius: 4,
              border: "1px solid #888",
              background: "#333",
              color: "#fff",
              cursor: "pointer",
              width: "75px",
              height: "45px",
              backgroundColor: "orange",
              borderRadius: "8px",
            }}
          >
            Clear
          </button>

          {/* Edit/Delete/Cancel Buttons */}
          {editMode ? (
            <>
              <button
                onClick={() => {
                  if (selectedIds.length > 0) {
                    setGdata((prev) =>
                      prev.filter((msg) => !selectedIds.includes(msg.id))
                    );
                    setSelectedIds([]);
                  }
                  setEditMode(false);
                }}
                style={{
                  marginLeft: 8,
                  padding: "6px 14px",
                  borderRadius: 4,
                  border: "1px solid #888",
                  background: "#7b1e1e",
                  color: "#fff",
                  cursor: "pointer",
                  height: "45px",
                  borderRadius: "10px",
                  backgroundColor: "red",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setSelectedIds([]);
                }}
                style={{
                  marginLeft: 8,
                  padding: "6px 14px",
                  borderRadius: 4,
                  border: "1px solid #888",
                  background: "#555",
                  color: "#fff",
                  cursor: "pointer",
                  height: "45px",
                  borderRadius: "10px",
                  backgroundColor: "#a3be8c",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              style={{
                marginLeft: 8,
                padding: "6px 14px",
                borderRadius: 4,
                border: "1px solid #888",
                background: "#555",
                color: "#fff",
                cursor: "pointer",
                height: "45px",
                borderRadius: "10px",
                backgroundColor: "#00bfff",
              }}
            >
              Edit
            </button>
          )}

          <div className="notif-bell-wrap">
            <i className="fa-regular fa-bell notif-bell"></i>
            <span className="notif-bell-count">
              {gdata.filter((msg) => !msg.seen).length}
            </span>
          </div>
        </div>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: "auto", padding: 18 }}>
          {paginatedData.length > 0 ? (
            <>
              {paginatedData.map((msg) => (
                <div
                  className="hoveringdiv"
                  onClick={() => handleView(msg.id)}
                  key={msg.id}
                  style={{
                    cursor: editMode ? "default" : "pointer",
                    borderRadius: 5,
                    padding: 12,
                    marginBottom: 12,
                    borderLeft: `4px solid ${msg.seen ? "#666" : "#2e7d32"}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundImage: msg.seen
                      ? "linear-gradient(135deg, #495057, #86a17d)"
                      : "linear-gradient(135deg, #4F84C4, #9932cc)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {editMode && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(msg.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds((prev) => [...prev, msg.id]);
                          } else {
                            setSelectedIds((prev) =>
                              prev.filter((id) => id !== msg.id)
                            );
                          }
                        }}
                        style={{ marginRight: 10 }}
                      />
                    )}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div style={{ fontWeight: "bold", color: "#4af" }}>
                        {msg.from}
                      </div>
                      <div style={{ margin: "4px 0", color: "#eee" }}>
                        {msg.message.slice(0, 50)}...
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "white",
                      marginLeft: 16,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                    gap: 16,
                  }}
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: "6px 12px",
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Prev
                  </button>
                  <span style={{ color: "#ccc" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    style={{
                      padding: "6px 12px",
                      background: "#333",
                      color: "#fff",
                      border: "1px solid #555",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                color: "#aaa",
              }}
            >
              <div
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}
              >
                All caught up
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Popup Notification */}
      {popup && (
        <div
          onClick={() => handleView(popup.id)}
          style={{
            position: "fixed",
            cursor: "pointer",
            left: 24,
            bottom: 24,
            background: "linear-gradient(135deg,blue,red)",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 6,
            boxShadow: "0 2px 8px #0008",
            display: "flex",
            alignItems: "center",
            zIndex: 100,
            animation: "slideInLeft 0.5s",
          }}
        >
          <i
            className="fa-regular fa-bell"
            style={{ fontSize: 22, marginRight: 12 }}
          ></i>
          <div>
            <div style={{ fontWeight: "bold" }}>New Notification</div>
            <div style={{ fontSize: 13 }}>{popup.message}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;
