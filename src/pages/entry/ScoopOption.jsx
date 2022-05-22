import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

export default function ScoopOption({ imagePath, name, updateItemCount }) {
  const changeHandler = (event) => {
    updateItemCount(name, event.target.value);
  };

  return (
    <Col xs={12} sm={6} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={changeHandler}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

//export default ScoopOption;
