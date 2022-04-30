import React from 'react';
import { Col } from 'react-bootstrap';

const ScoopOption = ({ imagePath, name }) => {
  return (
    <Col xs={12} sm={6} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
    </Col>
  );
};

export default ScoopOption;
