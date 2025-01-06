import React, { useEffect, useState } from "react";
import { getLogs } from "../services/logService";
import "../styles/LogsPage.css";

function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const fetchedLogs = await getLogs();
        console.log("Fetched logs:", fetchedLogs); 
        setLogs(fetchedLogs);
      } catch (error) {
        console.error("Failed to fetch logs:", error.message);
      }
    }
    fetchLogs();
  }, []);

  const groupLogsByDate = (logs) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1); 
    yesterday.setHours(0, 0, 0, 0);

    return logs.reduce((acc, log) => {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0); 

      let key;
      if (logDate.getTime() === today.getTime()) {
        key = "Today";
      } else if (logDate.getTime() === yesterday.getTime()) {
        key = "Yesterday";
      } else {
        key = logDate.toLocaleDateString("en-GB"); // Format as "DD/MM/YYYY"
      }

      if (!acc[key]) acc[key] = [];
      acc[key].push(log);
      return acc;
    }, {});
  };

  const groupedLogs = groupLogsByDate(logs);

  return (
    <div className="logs-page mx-20">
      {Object.keys(groupedLogs).map((date) => (
        <div key={date} className="log-group">
          <p className="text-4xl mt-12 mb-6 font-bold">{date}</p>
          {groupedLogs[date].map((log, index) => (
            <p key={index} className="text-2xl mt-3">{log.message}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LogsPage;
