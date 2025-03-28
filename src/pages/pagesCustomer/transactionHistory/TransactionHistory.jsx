import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWalletByUserId, getTransactions } from "../customerServices";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Retrieve the logged-in user from localStorage
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.id) {
          toast.error("User not found. Please log in again.");
          return;
        }
        // Fetch the wallet for the logged-in user
        const wallet = await getWalletByUserId(user.id);

        if (wallet && wallet.id) {
          // Fetch all transactions
          const allTransactions = await getTransactions();

          // Filter transactions for the user's wallet ID
          const userTransactions = allTransactions.filter(
            (transaction) => transaction.walletId === wallet.id
          );

          setTransactions(userTransactions); // Set the transactions in state
        } else {
          toast.error("No wallet found for the user.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Transaction Time</th>
              <th>Status</th>
              <th>Transaction Fee</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>
                  {new Date(transaction.transactionTime).toLocaleString()}
                </td>
                <td>{transaction.transactionStatus}</td>
                <td>{transaction.transactionFee}</td>
                <td>{transaction.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;
