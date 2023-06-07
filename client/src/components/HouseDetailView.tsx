import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IHouseRecord } from "../types/types";
import { fetchHouseById } from "../api/api";
import HouseCard from "./HouseCard";
import { Spinner } from "react-bootstrap";

const HouseDetailView: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [house, setHouse] = useState<IHouseRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const houseId = parseInt(id, 10); // Convert the id from string to number
        const res = await fetchHouseById(houseId);
        setHouse(res);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && id !== "") fetchHouse();
  }, [id]);

  return (
    <div className="flex w-full h-full d-flex justify-center items-center bg-dark text-yellow-500">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : house ? (
        <HouseCard house={house} />
      ) : (
        <div className="text-center">House not found</div>
      )}
    </div>
  );
};

export default HouseDetailView;
