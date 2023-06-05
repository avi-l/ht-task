import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IHouseRecord } from '../types/types';
import { fetchHouseById } from '../api/api';


const HouseDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = useState<IHouseRecord | null>(null);
  
  useEffect(() => {
    const fetchHouse = async () => {
        if(id) {
        const houseId = parseInt(id, 10); // Convert the id from string to number
        const res = await fetchHouseById(houseId)
        setHouse(res)
    }
    }
    fetchHouse()
  }, [id]);

  if (!house) {
    return <div className=''>Loading...</div>;
  }

  return (
    <div className="text-red-500">
      <h3>House Details</h3>
      <p>Address: {house.address}</p>
      <p>Current Value: {house.currentValue}</p>
    </div>
  );
};

export default HouseDetailView;
