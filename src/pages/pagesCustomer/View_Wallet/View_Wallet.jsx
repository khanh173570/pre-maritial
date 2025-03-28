import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./View_Wallet.css"; // Import the CSS file
import { createWallet, getWalletByUserId } from "../customerServices";

const ViewWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrCreateWallet = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Get the current user
        if (!user || !user.id) {
          throw new Error("User not found or not logged in.");
        }

        // Fetch wallet by userId
        let walletData = await getWalletByUserId(user.id);
        if (!walletData) {
          // If wallet doesn't exist, create a new one
          const payload = {
            userId: user.id,
            balance: 0,
            isActive: true,
          };
          console.log("Creating new wallet with payload:", payload); // Log the payload
          walletData = await createWallet(payload);
        }
        setWallet(walletData);
      } catch (error) {
        console.error("Error fetching or creating wallet:", error);

        // Provide a user-friendly error message
        if (error.response && error.response.status === 500) {
          setError("Server error occurred. Please try again later.");
        } else if (error.response && error.response.status === 404) {
          setError("Wallet not found. Please contact support.");
        } else {
          setError("Failed to load wallet. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateWallet();
  }, []);

  if (loading || !wallet) {
    // Show loading spinner until wallet is fully loaded
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-danger">
        {error}
        <br />
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">My Wallet</h1>
      <div className="wallet-details">
        <p>
          <strong>Wallet ID:</strong> {wallet.id}
        </p>
        <p>
          <strong>Balance:</strong> ${wallet.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ViewWallet;
