import React, { useEffect, useState } from "react";
import { getConsultationBookings } from "./adminServices";

const ConsultationBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await getConsultationBookings(); // Fetch bookings
        console.log("API Response:", data); // Log the API response
        setBookings(data.content || []); // Set the bookings data
      } catch (error) {
        console.error("Error fetching consultation bookings:", error);
        setError("Failed to fetch consultation bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Consultation Bookings</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Therapist Schedule ID</th>
            <th>User ID</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Meet URL</th>
            <th>Category ID</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bookings) ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.therapistScheduleId}</td>
                <td>{booking.userId}</td>
                <td>{booking.transactionId}</td>
                <td>{booking.status}</td>
                <td>{booking.amount}</td>
                <td>
                  {booking.meetUrl ? (
                    <a
                      href={booking.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {booking.meetUrl}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{booking.categoryId}</td>
                <td>{booking.isActive ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No bookings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultationBookings;
