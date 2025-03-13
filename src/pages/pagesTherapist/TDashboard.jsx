import React from "react";
import { BsFillCalendarFill, BsFillPersonFill, BsFillCheckCircleFill, BsWalletFill } from "react-icons/bs";
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for the charts
const data = [
  { name: "Jan", sessions: 12, earnings: 1500 },
  { name: "Feb", sessions: 15, earnings: 1800 },
  { name: "Mar", sessions: 10, earnings: 1200 },
  { name: "Apr", sessions: 20, earnings: 2400 },
  { name: "May", sessions: 18, earnings: 2200 },
  { name: "Jun", sessions: 22, earnings: 2500 },
];

const TDashboard = () => {
  return (
    <main className="tdashboard">
      <h3 className="title">Therapist Dashboard</h3>

      {/* Dashboard Stats */}
      <div className="stats">
        <div className="stat-card">
          <BsFillPersonFill className="icon" />
          <h3>Total Clients</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <BsFillCalendarFill className="icon" />
          <h3>Upcoming Sessions</h3>
          <p>10</p>
        </div>
        <div className="stat-card">
          <BsFillCheckCircleFill className="icon" />
          <h3>Completed Sessions</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <BsWalletFill className="icon" />
          <h3>Earnings</h3>
          <p>$6,000</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sessions" fill="#8884d8" />
            <Bar dataKey="earnings" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
            <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default TDashboard;