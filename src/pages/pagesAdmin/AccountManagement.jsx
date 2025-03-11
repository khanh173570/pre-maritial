import React, { useEffect, useState } from "react";
import { deleteUsers, getUsers } from "./adminServices";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/componentsAdmin/userTable/UserTable";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState([
  //   {
  //     id: 5,
  //     firstName: "string",
  //     lastName: "string",
  //     email: "user@gmail.com",
  //     username: "user",
  //     roleId: 1,
  //     street: "string",
  //     city: "string",
  //     state: "string",
  //     postalCode: "8372491623",
  //     country: "string",
  //     isActive: true,
  //   },
  //   {
  //     id: 6,
  //     firstName: null,
  //     lastName: null,
  //     email: "anh@gmail.com",
  //     username: "anh",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 7,
  //     firstName: "string",
  //     lastName: "string",
  //     email: "string@gmail",
  //     username: "khanh",
  //     roleId: 2,
  //     street: "string",
  //     city: "string",
  //     state: "string",
  //     postalCode: "591223",
  //     country: "string",
  //     isActive: true,
  //   },
  //   {
  //     id: 8,
  //     firstName: null,
  //     lastName: null,
  //     email: "testK@gmail.com",
  //     username: "testK",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 9,
  //     firstName: null,
  //     lastName: null,
  //     email: "khanhne@gmail.com",
  //     username: "khanhne",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 10,
  //     firstName: null,
  //     lastName: null,
  //     email: "swd",
  //     username: "string",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 11,
  //     firstName: null,
  //     lastName: null,
  //     email: "khanh@gmail.com",
  //     username: "khanh",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 13,
  //     firstName: null,
  //     lastName: null,
  //     email: "customer@gmail.com",
  //     username: "customer",
  //     roleId: 3,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 14,
  //     firstName: null,
  //     lastName: null,
  //     email: "therapist@gmail.com",
  //     username: "therapist",
  //     roleId: 2,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  //   {
  //     id: 15,
  //     firstName: null,
  //     lastName: null,
  //     email: "admin@gmail.com",
  //     username: "admin",
  //     roleId: 1,
  //     street: null,
  //     city: null,
  //     state: null,
  //     postalCode: null,
  //     country: null,
  //     isActive: null,
  //   },
  // ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleDelete = async (userId) => {
  //   try {
  //     await deleteUsers(userId);
  //     setUsers(users.filter((user) => user.id !== userId));
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //     setError(error);
  //   }
  //   console.log(`Delete user with ID: ${userId}`);
  // };

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUsers(userId);
      if (response) {
        setUsers(users.filter((user) => user.id !== userId));
        console.log(`Deleted user with ID: ${userId}`);
      } else {
        console.error("Failed to delete user from the database");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Account Management</h1>
      <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
      {/* <UserTable users={users} /> */}
    </div>
  );
};

export default AccountManagement;
