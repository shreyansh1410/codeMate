declare global {
  interface Window {
    Razorpay: any;
  }
}

import axios from "axios";
import { VITE_API_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    verifyPremium();
  });
  const verifyPremium = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/payment/verify`, {
        withCredentials: true,
      });
      console.log("Payment API response:", response.data);
      if (response.data.isPremium) {
        setIsPremium(true);
        alert("You are already a premium user!");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
    }
  };

  const handleBuyClick = async (type: String) => {
    try {
      const response = await axios.post(
        `${VITE_API_URL}/payment/create`,
        { planType: type }, // Make sure this matches what your backend expects (type vs planType)
        { withCredentials: true }
      );

      console.log("Payment API response:", response.data);

      const { orderId, keyId, amount, currency, notes } = response.data;

      if (!orderId || !keyId) {
        console.error("Missing required payment information", response.data);
        return;
      }

      var options = {
        key: keyId,
        amount: amount,
        currency: currency,
        order_id: orderId,
        name: "CodeMate",
        description: "Connect with other developers",
        prefill: {
          name:
            notes && notes.firstName && notes.lastName
              ? `${notes.firstName} ${notes.lastName}`
              : "",
          email: notes && notes.emailId ? notes.emailId : "",
        },
        theme: { color: "#3399cc" },
        handler: verifyPremium(),
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return isPremium ? (
    <div>You are already a premium member</div>
  ) : (
    <div className="m-10 mt-20">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 1000 connection Requests per day</li>
            <li> - Blue Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-secondary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
