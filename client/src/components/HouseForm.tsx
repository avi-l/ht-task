import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createHouseRecord } from '../api/api'; 
import { IHouseRecord } from '../types/types';
import { toast } from 'react-toastify';

const HouseForm: React.FC = () => {
    const [formValues, setFormValues] = useState<IHouseRecord>({
        address: '',
        currentValue: 0,
      });
    
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target || {};
    
        setFormValues((prevFormValues: IHouseRecord) => ({
          ...prevFormValues,
          [name]: value,
        }));
        console.log(formValues)
      };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { address, currentValue} = formValues
          const houseData: IHouseRecord = {
            address,
            currentValue,
            loanAmount: 0,
            risk: 0,
          };
      
          const newHouse = await createHouseRecord(houseData);
            setFormValues({address: '', currentValue: 0})
            toast.success('YAY! Your house data has been saved')
        } catch (error) {
          console.error(error);
          toast.error('Oops, there was a problem saving this data')
        }
      };
      
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </Form.Group>
  
        <Form.Group controlId="currentValue">
          <Form.Label>Current Value</Form.Label>
          <Form.Control
            type="number"
            name="currentValue"
            value={formValues.currentValue}
            onChange={handleChange}
          />
        </Form.Group>
  
        {/* Add more form inputs here */}
        
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  };
  export default HouseForm