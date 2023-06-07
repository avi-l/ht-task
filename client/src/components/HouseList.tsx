import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { fetchHouses } from "../api/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../dux/rootReducer";
import { IHouseRecord } from "../types/types";
import HouseCard from "../components/HouseCard";
import "./HousePages.css";
import { ToggleModalBtn } from "./ToggleModalBtn";

const HouseList: React.FC = () => {
  const dispatch = useDispatch();
  const houses = useSelector((state: RootState) => state.houses.houses) || {};
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadHouses = async () => {
      try {
        const fetchedHouses = await fetchHouses();
        dispatch({ type: "SET_HOUSES", payload: fetchedHouses });
      } catch (error) {
        console.error(error);
        toast.error("Error fetching houses");
      } finally {
        setIsLoading(false);
      }
    };
    loadHouses();
  }, [dispatch]);

  return (
    <div className="flex w-full h-full d-flex justify-center items-center  text-yellow-500">
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <div className="scrollable-container">
          <div className="scrollable-content d-flex flex-wrap justify-content-end">
            {houses.length === 0 ? (
              <div className="flex w-full h-full justify-center items-center text-gray-500">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Welcome to Housetable!
                  </h2>
                  <p className="text-lg">Please click here to add a house!</p>
                  <ToggleModalBtn />
                </div>
              </div>
            ) : (
              houses?.map((house: IHouseRecord) => (
                <div key={house.id} className="col-lg-4 col-md-6 col-sm-12 p-1">
                  <HouseCard house={house} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseList;
