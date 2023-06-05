import { ChangeEvent, FormEvent, useState } from 'react';
import { createHouseRecord } from '../api/api';
import { IHouseRecord } from '../types/types';
import { toast } from 'react-toastify';
import isNumeric from 'validator/lib/isNumeric';
import { useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col, Stack, Alert } from 'react-bootstrap';
import { toggleModalAction } from '../dux/reducers';
import { useNavigate } from 'react-router-dom';

const HouseForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [newHouseID, setNewHouseId] = useState<number>(0)
  const [formValues, setFormValues] = useState<IHouseRecord>({
    address: '',
    currentValue: 0,
    risk: 0,
    loanAmount: 0
  });
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClose = () => dispatch(toggleModalAction())

  const handleNavigate = () => navigate(`/houses/${newHouseID}`);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target || {};
    let updatedValue = value;

    if (name === 'currentValue') {
      // Validate the input as numeric using isNumeric function
      updatedValue = isNumeric(value) ? value : '';
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: updatedValue,
    }));
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { address, currentValue } = formValues
      if (!address || !currentValue) return null
      const houseData: IHouseRecord = {
        address,
        currentValue,
        loanAmount: 0,
        risk: 0,
      };

      const newHouse: IHouseRecord = await createHouseRecord(houseData);
      console.log('New house')
      dispatch({type: 'ADD_HOUSE', payload: newHouse})
      setNewHouseId(newHouse?.id as number)
      setFormValues({ address: '', currentValue: 0 })
      toast.success('YAY! Your house data has been saved')
    } catch (error) {
      console.error(error);
      toast.error('Oops, there was a problem saving this data')
    } finally {
      setLoading(false)
     
    }

  };

  return (
    
    <Container>
      <Row>
        <div className='flex items-center'><h3>Add New House</h3></div>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter an address"
                value={formValues?.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="currentValue">
              <Form.Label>Current Value</Form.Label>
              <Form.Control
                type="text"
                name="currentValue"
                placeholder="Enter a value"
                value={formValues?.currentValue}
                onChange={handleChange}
              />
            </Form.Group>
            
      { newHouseID > 0 &&  <><hr /><Alert variant='info'>
              Success! Your newly created ID: {newHouseID}
              <Button disabled={!newHouseID} onClick={handleNavigate}>Take me to the house!</Button>
            </Alert></>}
            <hr />
            <div className="flex justify-end">
              <Stack direction="horizontal" gap={2}>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="warning"
                  disabled={loading || !formValues?.address || !formValues?.currentValue}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Stack>
            </div>
          </Form>
        </Col>
      </Row>

    </Container>
  );
};
export default HouseForm