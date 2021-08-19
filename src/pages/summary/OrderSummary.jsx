import { useOrderDetails } from "../../context/OrderDetails";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();

  const scoopsArray = Array.from(orderDetails.scoops.entries());
  const scoopsList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingsArray = Array.from(orderDetails.toppings.entries());
  const toppingsList = toppingsArray.map((key) => (
    <li key={key}>
      Cherries
    </li>
  ))

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Scoops {orderDetails.totals.scoops}</p>
      <ul>
        {scoopsList}
      </ul>

      {orderDetails.toppings.size && (
        <p>Toppings {orderDetails.totals.toppings}</p>
      )}
      <ul>
        {toppingsList}
      </ul>
     
      <SummaryForm setOrderPhase={() => setOrderPhase('completed')} />
    </div>
  );
}

export default OrderSummary;
