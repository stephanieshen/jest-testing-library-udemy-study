import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { pricePerItem } from '../../constants';
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';
import AlertBanner from '../common/AlertBanner';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateCount={(itemName, newItemCount) => (
        updateItemCount(itemName, newItemCount, optionType)
      )}
    />
  ))

  return (
    <>
      {error ? (
        <AlertBanner />
      ) : (
        <>
          <h2>{title}</h2>
          <p>{formatCurrency(pricePerItem[optionType])} each</p>
          <p>{title} total {orderDetails.totals[optionType]}</p>
          <Row>
            {optionItems}
          </Row>
        </>
      )}
    </>
  )
}

export default Options;
