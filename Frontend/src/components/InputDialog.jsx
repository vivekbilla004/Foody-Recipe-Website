import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const InputDialog = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const endpoint = isSignUp ? "SignUp" : "SignIN";
        const res = await axios.post(`http://localhost:8000/${endpoint}`, { email, password });
  
        // Store token & user data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
  
        // Clear the modal on successful login/signup
        onClose();
      } catch (error) {
        setError(error.response?.data.error || "Something went wrong!");
      }
  };

  // Handle Esc key press to close the modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed  right-0 top-0 mr-144 mt-4 h-[285px] rounded-md bg-blend-color-dodge backdrop-blur-sm flex justify-end">
      {/* Sliding Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="w-96 h-full bg-white shadow-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Modal Content */}
            <h2 className="text-2xl font-semibold text-gray-900">
              {isSignUp ? "Signup" : "Login"}
            </h2>
            <p className="text-sm text-gray-500">
              or{" "}
              <span
                className="text-orange-600 font-medium cursor-pointer"
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                }}
              >
                {isSignUp ? "already has a account" : "create an account"}
              </span>
            </p>

            {/* Input email Field */}
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="text"
              placeholder="email"
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
            />

            {/* input password       */}
            <input
              onChange={(e) => {
               setPassword(e.target.value)
              }}
              type="password"
              placeholder="password"
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            >
              {isSignUp ? "SIGNUP" : "SIGNIN"}
            </button>
             {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default InputDialog;
