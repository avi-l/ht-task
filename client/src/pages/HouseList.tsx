import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { fetchHouses } from '../api/api';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../dux/rootReducer';
import { IHouseRecord } from '../types/types';
import HouseCard from '../components/HouseCard';

const HouseList: React.FC = () => {
  const dispatch = useDispatch()
  const houses = useSelector((state: RootState) => state.houses.houses) || {};

  useEffect(() => {
    const loadHouses = async () => {
      try {
        const fetchedHouses = await fetchHouses();
        dispatch({ type: 'SET_HOUSES', payload: fetchedHouses });
      } catch (error) {
        console.log(error);
        toast.error('Error fetching houses');
      }
    };
    loadHouses();
  }, [dispatch]);
  

  return (
    <div className='pt-2 flex flex-row justify-center'>
    <Container fluid>
      <Row className="justify-content-md-center">
        {houses?.map((house: IHouseRecord) => (
          <Col key={house.id}>
           <HouseCard house={house} />
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

export default HouseList;
