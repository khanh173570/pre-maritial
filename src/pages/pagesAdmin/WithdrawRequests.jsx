import React, { useEffect, useState } from "react";
import { getWithdrawRequests, updateWithdrawRequest } from "./adminServices";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await getWithdrawRequests(); // Fetch withdraw requests
        console.log("API Response:", data); // Log the API response
        setRequests(data.content || []); // Extract and set the `content` array
      } catch (error) {
        console.error("Error fetching withdraw requests:", error);
        setError("Failed to fetch withdraw requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUserIdFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return parsedUser.id; // Return the user ID
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
    return null; // Return null if no user data is found
  };

  const handleApprove = async (id) => {
    try {
      // Find the request to approve
      const requestToApprove = requests.find((request) => request.id === id);

      if (!requestToApprove) {
        alert("Request not found.");
        return;
      }

      // Get the approver ID from local storage
      const approverId = getUserIdFromLocalStorage();
      if (!approverId) {
        alert("Failed to retrieve approver ID.");
        return;
      }

      // Format today's date in dd/mm/yyyy format
      const today = new Date();
      const approvedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;

      // Create the updated request object
      const updatedRequest = {
        ...requestToApprove,
        isApproved: true, // Set isApproved to true
        approvedDate, // Use the formatted date
        approvedBy: approverId, // Replace with the actual approver ID if available
      };

      // Log the data being sent to the API
      console.log("Payload being sent to API:", updatedRequest);

      // Call the API to update the withdraw request
      await updateWithdrawRequest(id, updatedRequest);

      // Update the state to reflect the changes
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? updatedRequest : request
        )
      );

      alert(`Request ID ${id} has been approved.`);
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve the request.");
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Withdraw Requests</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Request Amount</th>
            <th>Request Date</th>
            <th>Approved By</th>
            <th>Approved Date</th>
            <th>Transaction ID</th>
            <th>Approved</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.userId}</td>
                <td>{request.requestAmount}</td>
                <td>{request.requestDate}</td>
                <td>{request.approvedBy || "N/A"}</td>
                <td>{request.approvedDate || "N/A"}</td>
                <td>{request.transactionId}</td>
                <td>{request.isApproved ? "Yes" : "No"}</td>
                <td>{request.isActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(request.id)}
                    disabled={request.isApproved} // Disable the button if the request is approved
                  >
                    {request.isApproved ? "Approved" : "Approve"}{" "}
                    {/* Change button text */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No withdraw requests available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawRequests;
