import React, { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

const NotificationSystem = () => {
  const navigate = useNavigate();
  const { gdata, setGdata, lastSseMsgId } = useContext(Context);

  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [senderFilter, setSenderFilter] = useState("");
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
      if (
        senderFilter &&
        !msg.message.toLowerCase().includes(senderFilter.toLowerCase())
      )
        return false;
      const msgDate = new Date(msg.timestamp);
      if (startdate && msgDate < new Date(startdate)) return false;
      if (enddate && msgDate > new Date(enddate)) return false;
      return true;
    });
    setFilteredData(filtered);
  }, [gdata, tab, search, senderFilter, startdate, enddate]);

  useEffect(() => {
    handleSearch();
  }, [gdata, handleSearch]);

  useEffect(() => {
    setCurrentPage(1);
    handleSearch();
  }, [tab, search, senderFilter, startdate, enddate, handleSearch]);

  const handleView = (id) => {
    if (editMode) return;
    setGdata((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, seen: true } : msg))
    );
    navigate(`/msg/${id}`);
  };

  // ✅ SYSTEM NOTIFICATION EFFECT
  useEffect(() => {
    if (!lastSseMsgId) return;

    const newMsg = gdata.find((msg) => msg.id === lastSseMsgId);
    if (!newMsg) return;

    // 🔔 System Notification Logic
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(`📬 ${newMsg.from}`, {
          body: newMsg.message,
          icon: "/favicon.ico",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(`📬 ${newMsg.from}`, {
              body: newMsg.message,
              icon: "/favicon.ico",
            });
          }
        });
      }
    }
  }, [lastSseMsgId, gdata]);

  useEffect(() => {
    if (!editMode) setSelectedIds([]);
  }, [editMode]);

  const totalPages = Math.ceil(filtereddata.length / itemsPerPage);
  const paginatedData = filtereddata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        <div style={{ marginLeft: 30, marginTop: 30 }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {["ATTENDANCE", "LEAVE", "PERFOMANCE", "FINANCE"].map((role) => (
              <li
                key={role}
                onClick={() => setSenderFilter(role)}
                style={{
                  cursor: "pointer",
                  color: senderFilter === role ? "#4af" : "#ccc",
                  fontWeight: senderFilter === role ? "bold" : "normal",
                }}
              >
                {role}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
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
            alignItems: "center",
            gap: 12,
            position: "sticky",
            top: 0,
            background: "#232323",
            padding: "10px 16px",
            borderBottom: "1px solid #333",
            zIndex: 10,
          }}
        >
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setTab("All")}
          >
            All
          </button>
          <button
            className="btn btn-sm btn-info"
            onClick={() => setTab("Unread")}
          >
            Unread
          </button>

          <input
            type="text"
            className="searchfeild"
            placeholder="Search notifications"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* From Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span style={{ marginRight: 4 }}>From:</span>
            <input
              type="date"
              id="start-date"
              value={startdate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                opacity: 0,
                position: "absolute",
                left: 45,
                top: 0,
                width: 24,
                height: 24,
                cursor: "pointer",
              }}
            />
            <i
              className="fa-solid fa-calendar-days"
              title="Start Date"
              onClick={() => document.getElementById("start-date").click()}
              style={{ fontSize: 18, color: "#ccc", cursor: "pointer" }}
            ></i>
          </div>

          {/* To Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <span style={{ marginRight: 4 }}>To:</span>
            <input
              type="date"
              id="end-date"
              value={enddate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                opacity: 0,
                position: "absolute",
                left: 35,
                top: 0,
                width: 24,
                height: 24,
                cursor: "pointer",
              }}
            />
            <i
              className="fa-solid fa-calendar-days"
              title="End Date"
              onClick={() => document.getElementById("end-date").click()}
              style={{ fontSize: 18, color: "#ccc", cursor: "pointer" }}
            ></i>
          </div>

          <button
            className="btn btn-sm btn-success"
            onClick={() => {
              setTab("All");
              setSearch("");
              setStartDate("");
              setEndDate("");
              setSenderFilter("");
            }}
          >
            Clear
          </button>

          {editMode ? (
            <>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setGdata((prev) =>
                    prev.filter((msg) => !selectedIds.includes(msg.id))
                  );
                  setSelectedIds([]);
                  setEditMode(false);
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-sm btn-info"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}

          <div className="notif-bell-wrap" style={{ marginLeft: "auto" }}>
            <i className="fa-regular fa-bell notif-bell"></i>
            <span className="notif-bell-count">
              {gdata.filter((msg) => !msg.seen).length}
            </span>
          </div>
        </div>

        {/* Notification List */}
        <main style={{ flex: 1, overflowY: "auto", padding: 18 }}>
          {paginatedData.length > 0 ? (
            paginatedData.map((msg) => (
              <div
                key={msg.id}
                className="hoveringdiv"
                onClick={() =>
                  editMode
                    ? setSelectedIds((prev) =>
                        prev.includes(msg.id)
                          ? prev.filter((id) => id !== msg.id)
                          : [...prev, msg.id]
                      )
                    : handleView(msg.id)
                }
                style={{
                  cursor: "pointer",
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
                    <i
                      className={`fa-solid ${
                        selectedIds.includes(msg.id)
                          ? "fa-circle-check"
                          : "fa-circle"
                      }`}
                      style={{
                        marginRight: 10,
                        fontSize: 20,
                        color: selectedIds.includes(msg.id)
                          ? "#00e676"
                          : "#aaa",
                      }}
                    ></i>
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
            ))
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
                gap: 16,
              }}
            >
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span style={{ color: "#ccc" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-warning"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NotificationSystem;
