import React from 'react';
import axios from 'axios';

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Create an order on the backend
      const response = await axios.post('http://localhost:5000/api/v1/payments/create-order', {
        amount: 500, // Amount in INR
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      const { orderId, amount } = response.data;

      // Step 2: Razorpay options
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: orderId,
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

          // Step 3: Verify payment on the backend
          const verifyResponse = await axios.post('http://localhost:3001/api/v1/payments/verify-payment', {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });

          alert(verifyResponse.data.message);
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#6366F1', // Tailwind Indigo color
        },
      };

      // Step 4: Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error('Error during payment:', error.message);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
