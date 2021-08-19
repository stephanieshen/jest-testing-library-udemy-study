import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../../context/OrderDetails";

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post('http://localhost:3030/order')
      .then((response) => {
        setOrderNumber(response.data.orderNumber)
      })
      .catch(() => {
        alert('error order');
      });
  }, []);

  const handleNewOrder = () => {
    resetOrder();
    setOrderPhase('inProgress');
  }

  return (
    <>
      {orderNumber ? (
        <div>
          <h2>Thank you</h2>
          <p>Your order number is {orderNumber} </p>
    
          <Button type="button" onClick={handleNewOrder}>
            New Order
          </Button>
        </div>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </>
  )
}

export default OrderConfirmation;
