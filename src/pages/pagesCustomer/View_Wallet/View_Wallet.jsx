import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./View_Wallet.css"; // Import the CSS file
import {
  createMoMoPayment,
  createWallet,
  getWalletByUserId,
  updateWalletBalance,
} from "../customerServices";

const ViewWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceToAdd, setBalanceToAdd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const hasRun = useRef(false); // Flag to check if the effect has run

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

  // Handle the redirection after MoMo payment
  useEffect(() => {
    if (!wallet) {
      console.log("Wallet is not loaded yet.");
      return; // Exit if the wallet is not loaded
    }

    const queryParams = new URLSearchParams(location.search); // Parse the query parameters
    const amount = queryParams.get("amount"); // Get the amount parameter
    const resultCode = queryParams.get("resultCode"); // Get the resultCode parameter

    console.log("Amount from URL:", amount);
    console.log("Result Code from URL:", resultCode);

    // Use a flag to prevent multiple updates
    const isPaymentProcessed =
      sessionStorage.getItem("isPaymentProcessed") === "true";

    if (
      wallet &&
      resultCode === "0" &&
      amount &&
      !isPaymentProcessed &&
      !hasRun.current
    ) {
      // Payment was successful
      hasRun.current = true; // Mark as run to prevent duplicate execution
      const updateBalance = async () => {
        try {
          console.log("Calling updateWalletBalance with:", wallet?.id, amount);
          await updateWalletBalance(wallet.id, Number(amount)); // Call the API to update the wallet balance
          setWallet((prevWallet) => ({
            ...prevWallet,
            balance: prevWallet.balance + Number(amount), // Update the balance in the UI
          }));
          alert("Wallet balance updated successfully!");
          sessionStorage.setItem("isPaymentProcessed", "true"); // Mark the payment as processed

          // Reset the URL to remove query parameters
          navigate(location.pathname, { replace: true }); // Remove query parameters
        } catch (error) {
          console.error("Error updating wallet balance:", error);
          alert("Failed to update wallet balance. Please try again.");
        }
      };

      updateBalance();
    } else if (isPaymentProcessed) {
      console.log("Payment already processed for this amount.");
    } else if (resultCode || amount) {
      // Log only if resultCode or amount exists but the payment is not processed
      console.log("Payment not successful or missing required parameters.");
    }
  }, [location.search, wallet, navigate]);

  const handleAddBalance = async () => {
    try {
      if (!balanceToAdd || isNaN(balanceToAdd) || Number(balanceToAdd) <= 0) {
        alert("Please enter a valid balance to add.");
        return;
      }

      // Reset the flag before starting a new payment
      sessionStorage.removeItem("isPaymentProcessed"); // Clear the flag to allow new payment processing

      // Call the MoMo payment API
      const amount = Number(balanceToAdd); // Use the entered balance as the payment amount
      console.log("Amount being sent to createMoMoPayment:", amount);

      const response = await createMoMoPayment(amount); // Call the MoMo API

      console.log("MoMo Payment Response:", response);

      if (response && response.payUrl) {
        // Redirect to the MoMo payment page
        window.location.href = response.payUrl;
      } else {
        alert("Failed to retrieve payment URL. Please try again.");
      }
    } catch (error) {
      console.error("Error adding balance:", error);
      alert("Failed to add balance. Please try again.");
    } finally {
      setBalanceToAdd(""); // Clear the input field
    }
  };

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
          <strong>Balance:</strong> {wallet.balance.toFixed(2)}VND
        </p>
      </div>

      {/* Form to add balance */}
      <div className="add-balance-form">
        <h3>Add Balance</h3>
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount to add"
          value={balanceToAdd}
          onChange={(e) => setBalanceToAdd(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={handleAddBalance}>
          Add Balance
        </button>
      </div>
    </div>
  );
};

export default ViewWallet;
