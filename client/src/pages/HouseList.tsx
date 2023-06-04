import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { fetchHouses } from '../api/api';
import { IHouseRecord } from '../types/types';
import { toast } from 'react-toastify'

const HouseList: React.FC = () => {
  const [houses, setHouses] = useState<IHouseRecord[]>([]);

  useEffect(() => {
    const loadHouses = async () => {
      try {
        const fetchedHouses = await fetchHouses();
        setHouses(fetchedHouses);
      } catch (error) {
        console.log(error)
        toast.error('Error fetching houses');
      }
    };
    loadHouses();
  }, []);

  return (
    <Container>
      <Row>
        {houses?.map((house) => (
          <Col key={house.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>{house.address}</Card.Title>
                <Card.Text>Current Value: {house.currentValue}</Card.Text>
                <Card.Text>Loan Amount: {house.loanAmount}</Card.Text>
                <Card.Text>Risk: {house.risk}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HouseList;
