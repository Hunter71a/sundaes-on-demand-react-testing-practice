import React from 'react';
import { Col } from 'react-bootstrap';

const ToppingOption = ({ name, imagePath }) => {
  return (
    <Col>
      <img src={`http://localhost3030/${imagePath}`} alt={`${name} topping`} />
    </Col>
  );
};

export default ToppingOption;
