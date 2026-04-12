import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api";

const AdminLogins = () => {
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLoginActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(getApiUrl("/api/auth/login-activities"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to fetch login activities");
    }
  };

  useEffect(() => {
    fetchLoginActivities();
  }, []);

  return (
    <section className="page">
      <div className="page-head">
        <h1>Recent Logins</h1>
        <p className="muted">Track which users logged in and when.</p>
      </div>

      {message && <p className="status-text error">{message}</p>}

      {!activities.length ? (
        <div className="glass-card empty-state">No login activity found.</div>
      ) : (
        <div className="glass-card table-card">
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>IP</th>
                  <th>Login Time</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>{item.ipAddress || "N/A"}</td>
                    <td>{new Date(item.loggedInAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminLogins;
