import { useEffect, useMemo, useState, useContext, createContext } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

const calculateSubtotal = (optionType, optionCounts) => {
  let optionsTotal = 0;
  for (const count of optionCounts[optionType].values()) {
    optionsTotal += count;
  }

  return optionsTotal * pricePerItem[optionType];
}

const OrderDetails = createContext();

// custom hook
export const useOrderDetails = () => {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  }

  return context;
}

// provider
export const OrderDetailsProvider = (props) => {
  const defaultValue = formatCurrency(0);
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  });

  const [totals, setTotals] = useState({
    scoops: defaultValue,
    toppings: defaultValue,
    grandTotal: defaultValue
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal)
    });
  }, [optionCounts]);


  const value = useMemo(() => {
    const updateItemCount = (itemName, newItemCount, optionType) => {
      const newOptionCounts = { ...optionCounts };
      const option = newOptionCounts[optionType];
      option.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }
  
    // getter: object containing option count for scoop and toppings, subtotal and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
