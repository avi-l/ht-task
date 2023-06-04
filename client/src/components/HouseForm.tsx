import { ChangeEvent, FormEvent, useState } from 'react';
import { createHouseRecord } from '../api/api';
import { IHouseRecord } from '../types/types';
import { toast } from 'react-toastify';
import isNumeric from 'validator/lib/isNumeric';

const HouseForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<IHouseRecord>({
    address: '',
    currentValue: 0,
    risk: 0,
    loanAmount: 0
  });

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
    console.log(formValues)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true)
      const { address, currentValue } = formValues
      if(!address || !currentValue) return null
      const houseData: IHouseRecord = {
        address,
        currentValue,
        loanAmount: 0,
        risk: 0,
      };

     await createHouseRecord(houseData);
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
    <div className="container">
      <div className="p-2">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter an address"
              value={formValues?.address}
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="form-group ">
            <label htmlFor="currentValue">Current Value</label>
            <input
  type="text"
  name="currentValue"
  className="form-control"
  placeholder="Enter a value"
  value={formValues?.currentValue}
  onChange={handleChange}
/>

          </div>
          <br />
          <button
            type="submit"
            className="btn btn-dark"
            disabled={loading || !formValues?.address || !formValues?.currentValue}
            onClick={() => !loading ? handleSubmit : null}
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </form>
      </div>
    </div>

  );
};
export default HouseForm