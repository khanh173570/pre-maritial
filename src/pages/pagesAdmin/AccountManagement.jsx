import React, { useEffect, useState } from "react";
import { deleteUsers, getUsers } from "./adminServices";
import { useNavigate } from "react-router-dom";
import UserTable from "../../components/componentsAdmin/userTable/UserTable";
import { Pagination } from "../../components/Pagination/Pagination";
import { Button } from "react-bootstrap";

const AccountManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 8; // Số lượng mục cố định mỗi trang

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

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUsers(userId);
      if (response) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
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

  const handleAddUser = () => {
    navigate("/users/new");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Lấy danh sách hiển thị cố định trên mỗi trang
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <h1>Account Management</h1>
      <Button
        variant="primary"
        onClick={handleAddUser}
        style={{ marginBottom: 10 }}
      >
        Add User
      </Button>
      <UserTable
        users={currentPosts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={users.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default AccountManagement;
