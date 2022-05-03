import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

//create a custom hook to check to see if we're inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }
  return context;
}

const calculateSubtotal = (orderType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
};

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts };

      // update option count for this item with the new value
      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));
    }

    // getter: object counts containing scoops and options, subtotals and totals
    // setter: updateOptionsCount set options counts and caluculates totals and subtotals
    return [{ ...optionCounts, totals }];
  }, [optionCounts, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
