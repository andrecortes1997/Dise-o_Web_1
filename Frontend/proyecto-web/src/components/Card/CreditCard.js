import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Col } from 'reactstrap';

const CreditCard = ({ tarjeta, name }) => {
  const date = tarjeta.FechaVencimiento.split('-');
  const [focus, setFocus] = useState('');

  return (
    <div onClick={() => (focus === '' ? setFocus('cvc') : setFocus(''))}>
      <Col>
        <Cards
          cvc={tarjeta.CVC}
          expiry={date[1] + date[0]}
          focused={focus}
          name={name}
          number={tarjeta.Numero}
        />
      </Col>
    </div>
  );
};

export default CreditCard;
