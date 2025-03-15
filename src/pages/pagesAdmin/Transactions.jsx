import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getTransactions } from "./adminServices";
import { Pagination } from "../../components/Pagination/Pagination";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số lượng mục cố định mỗi trang

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getTransactions(token);
        setTransactions(data.content);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Lấy danh sách hiển thị cố định trên mỗi trang
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div>
      <h1>Transactions</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Wallet ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Time</th>
            <th>Status</th>
            <th>Balance Before</th>
            <th>Transaction Fee</th>
            <th>Total Amount</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.walletId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.transactionType}</td>
              <td>{new Date(transaction.transactionTime).toLocaleString()}</td>
              <td>{transaction.transactionStatus}</td>
              <td>{transaction.balanceBefore}</td>
              <td>{transaction.transactionFee}</td>
              <td>{transaction.totalAmount}</td>
              <td>{transaction.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        postsPerPage={itemsPerPage}
        totalPosts={transactions.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Transactions;
