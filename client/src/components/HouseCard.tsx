import React from 'react';
import Card from 'react-bootstrap/Card';
import { HouseCardProps } from '../types/types';



const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  const { address, currentValue, loanAmount, risk } = house;

  // Replace the placeholder image URL with an actual house picture URL
  const houseImageUrl = 'https://example.com/house-image.jpg';

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={houseImageUrl} />
      <Card.Body>
        <Card.Title>{address}</Card.Title>
        <Card.Text>
          Current Value: {currentValue}
          <br />
          Loan Amount: {loanAmount}
          <br />
          Risk: {risk}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
