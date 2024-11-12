import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    pincode: "",
    gst: "",
  });

  const handleSubmit = async (userId, planId) => {
    try {
      const { fullName, email, phone, city, pincode, gst } = formData;
      if (!fullName || !email || !phone || !city || !pincode || !gst) {
        toast.error("Please fill in all fields before submitting");
        return;
      }
      const response = await fetch(
        "http://localhost:5000/api/v1/user/purchase-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            planId,
            formData,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Plan purchased successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Error purchasing plan:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Redirect if no token is found
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                    dark:from-gray-900 dark:to-gray-800 p-6"
    >
      <div className="mt-8 mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Complete Your Purchase
          </h1>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Cart</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Checkout
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-200 ease-in-out">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b dark:border-gray-700">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Personal Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"Full Name"}{" "}
                      {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"text"}
                      name={"fullName"}
                      placeholder={"Enter your full name"}
                      value={formData["fullName"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"Email Address"}{" "}
                      {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"email"}
                      name={"email"}
                      placeholder={"you@example.com"}
                      value={formData["email"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"Phone Number"}{" "}
                      {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"text"}
                      name={"phone"}
                      placeholder={"Enter your phone number"}
                      value={formData["phone"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"City"} {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"text"}
                      name={"city"}
                      placeholder={"Enter your city"}
                      value={formData["city"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"Pincode"}{" "}
                      {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"text"}
                      name={"pincode"}
                      placeholder={"Enter your pincode"}
                      value={formData["pincode"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {"GST Number (Optional)"}{" "}
                      {true && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={"text"}
                      name={"gst"}
                      placeholder={"Enter GST number"}
                      value={formData["gst"]} // Ensure input value is tied to state
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 
                 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                 transition-all duration-200 ease-in-out
                 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            {/* Order Summary Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-200 ease-in-out">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-4 border-b dark:border-gray-700">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600 dark:text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Plan Name
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {location.state?.plan?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Plan Duration
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {location.state?.duration || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Base Amount
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${location.state?.pricing || "0.00"}
                    </span>
                  </div>
                  <div className="pt-4 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        ${location.state?.pricing || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 
                                 dark:bg-blue-500 dark:hover:bg-blue-600
                                 text-white font-medium rounded-lg
                                 transform transition-all duration-200 ease-in-out
                                 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() =>
                    handleSubmit(
                      localStorage.getItem("userId"),
                      location.state.plan?._id
                    )
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCheckout;
