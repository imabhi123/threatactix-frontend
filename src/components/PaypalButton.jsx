import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const PayPalButton = ({ amount }) => {
  const createOrder = async () => {
    try {
      const response = await axios.post('/api/payment/create-order', {
        total: amount
      });
      return response.data.orderID;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post(`/api/payment/capture/${data.orderID}`);
      if (response.data.success) {
        console.log('Payment completed successfully');
        // Handle successful payment (e.g., update order status, show success message)
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      style={{ layout: "vertical" }}
    />
  );
};

export default PayPalButton;