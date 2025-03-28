import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Badge, Divider } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// TherapistNotifications.jsx
// This component displays a list of notifications for the therapist.
// Currently, it uses mock data (mockNotifications) to simulate the notifications that would normally come from the API.
// The mark as read and mark all as read functionality is also mocked by updating the local state.
// TODO: For the development team
// 1. Replace the mock data with a real API call to fetch notifications.
//    - Endpoint: GET /notifications (or similar, check Swagger UI).
//    - Expected response: An array of notification objects (see mockNotifications for the structure).
// 2. Implement the mark as read functionality with an API call.
//    - Endpoint: PUT /notifications/{id}/read (or similar).
// 3. Implement the mark all as read functionality with an API call.
//    - Endpoint: PUT /notifications/mark-all-read (or similar).
// See the TODO comments in the code for detailed instructions.

const TherapistNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock data to simulate notifications that would normally come from the API
  const mockNotifications = [
    {
      id: 1,
      title: "New Booking Request",
      description: "Client John Doe booked a session on March 28, 2025, at 10:00 AM.",
      timestamp: "2025-03-27T08:00:00Z", // 2 hours ago from current time (March 27, 2025, 10:00 AM)
      isRead: false,
    },
    {
      id: 2,
      title: "Booking Cancellation",
      description: "Client Jane Smith canceled their session on March 29, 2025.",
      timestamp: "2025-03-27T07:00:00Z", // 3 hours ago
      isRead: false,
    },
    {
      id: 3,
      title: "Upcoming Appointment Reminder",
      description: "You have a session with Client Mike Johnson tomorrow at 2:00 PM.",
      timestamp: "2025-03-27T06:00:00Z", // 4 hours ago
      isRead: true,
    },
  ];

  // Simulate fetching notifications on mount
  useEffect(() => {
    // TODO: For the development team
    // Replace this mock data with an API call to fetch notifications
    // Example:
    /*
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://54.179.45.72:8080/notifications", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications. Please try again.");
      }
    };
    fetchNotifications();
    */

    // For now, use mock data
    setNotifications(mockNotifications);

    // Calculate initial unread count
    const unread = mockNotifications.filter((n) => !n.isRead).length;
    setUnreadCount(unread);
  }, []);

  // Function to format the timestamp (e.g., "2 hours ago")
  const formatTimestamp = (timestamp) => {
    const now = new Date("2025-03-27T10:00:00Z"); // Current date for consistency
    const notificationDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - notificationDate) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  };

  // Mark a single notification as read
  const handleMarkAsRead = (id) => {
    // TODO: For the development team
    // Replace this mock logic with an API call to mark the notification as read
    // Example:
    /*
    const markAsRead = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://54.179.45.72:8080/notifications/${id}/read`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to mark notification as read");
      } catch (error) {
        console.error("Error marking notification as read:", error);
        toast.error("Failed to mark notification as read. Please try again.");
        return;
      }
    };
    markAsRead(id);
    */

    // Update local state
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );

    // Update unread count
    setUnreadCount((prev) => prev - 1);
    toast.success("Notification marked as read!");
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    // TODO: For the development team
    // Replace this mock logic with an API call to mark all notifications as read
    // Example:
    /*
    const markAllAsRead = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://54.179.45.72:8080/notifications/mark-all-read", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to mark all notifications as read");
      } catch (error) {
        console.error("Error marking all notifications as read:", error);
        toast.error("Failed to mark all notifications as read. Please try again.");
        return;
      }
    };
    markAllAsRead();
    */

    // Update local state
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );

    // Update unread count
    setUnreadCount(0);
    toast.success("All notifications marked as read!");
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">
          You have <Badge badgeContent={unreadCount} color="primary">{unreadCount} unread</Badge> notification(s)
        </Typography>
        {unreadCount > 0 && (
          <Button variant="contained" color="primary" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </Box>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {notifications.length === 0 ? (
          <Typography>No notifications available.</Typography>
        ) : (
          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    backgroundColor: notification.isRead ? "inherit" : "action.hover",
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={notification.isRead ? "normal" : "bold"}>
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2">{notification.description}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimestamp(notification.timestamp)}
                        </Typography>
                      </>
                    }
                  />
                  {!notification.isRead && (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default TherapistNotifications;