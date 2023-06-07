import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Form, Spinner, Stack } from "react-bootstrap";

import { toast } from "react-toastify";
import { deleteHouseById, updateHouseById } from "../api/api";
import { HouseCardProps, IHouseRecord } from "../types/types";
import { calculateRisk, validateNumericInput } from "../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

const HouseCard: React.FC<HouseCardProps> = ({ house }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    address,
    currentValue,
    loanAmount,
    risk = 0,
    id = 0,
    image = "",
  } = house;

  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [isOnHousePage, setIsOnHousePage] = useState<boolean>(false);

  const [editedValues, setEditedValues] = useState({
    address: address,
    currentValue: currentValue,
    loanAmount: loanAmount,
    risk: risk,
    image,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === `/houses/${id}`) {
      setIsOnHousePage(true);
    }
  }, [id, location.pathname]);

  useEffect(() => {
    setEditedValues((prevState) => {
      return {
        ...prevState,
        risk: calculateRisk({
          currentValue: editedValues.currentValue || 0,
          loanAmount: editedValues.loanAmount || 0,
        }),
      };
    });
  }, [editedValues.currentValue, editedValues.loanAmount, image]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteHouseById(id);
      dispatch({ type: "DELETE_HOUSE", payload: house });
      toast.success("Record Deleted");
      if (isOnHousePage) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ooops, problem deleting this record");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const houseData: IHouseRecord = { ...editedValues, id };
      await updateHouseById(id, houseData);
      dispatch({ type: "UPDATE_HOUSE", payload: houseData });
    } catch (error) {
      toast.error("Error updating house");
    } finally {
      setLoading(false);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedValues({
      address: address,
      currentValue: currentValue,
      loanAmount: loanAmount,
      risk: risk,
      image: "",
    });
    setEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Card bg="light" className={`text-yellow-600 p-2`}>
      <div className="relative">
        {!editing && (
          <>
            <Card.Img
              onClick={() => {
                navigate(isOnHousePage ? "/" : `/houses/${id}`);
              }}
              variant="top"
              src={image || "default_house.jpg"}
              className="object-cover rounded cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 right-2 p-2 bg-neutral-700 bg-opacity-50 rounded">
              <div className="text-white font-bold text-l">{address}</div>
            </div>
          </>
        )}
      </div>
      <Card.Body>
        {editing ? (
          <Form>
            <Form.Group controlId="editAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="address"
                value={editedValues.address}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editCurrentValue">
              <Form.Label>Current Value</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="currentValue"
                value={editedValues.currentValue}
                onKeyDown={(e) => validateNumericInput(e)}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editLoanAmount">
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="loanAmount"
                value={editedValues.loanAmount}
                onKeyDown={(e) => validateNumericInput(e)}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editRisk">
              <Form.Label>Risk</Form.Label>
              <Form.Control
                disabled
                type="text"
                name="risk"
                value={editedValues.risk?.toFixed(4)}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="flex items-center ">
                <div className="font-semibold">Current Value:</div>
                <div className="ml-2">${currentValue}</div>
              </div>
              <div className="flex items-center ">
                <div className="font-semibold">Loan Amount:</div>
                <div className="ml-2">${loanAmount}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Risk:</div>
                <div className="ml-2">{risk?.toFixed(4)}</div>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end pt-2">
          {editing ? (
            <Stack direction="horizontal" gap={2}>
              <Button size="sm" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" variant="warning" onClick={handleSave}>
                {loading ? (
                  <div className="pr-1">
                    {" "}
                    <Spinner animation="border" variant="dark" size="sm" />{" "}
                    Saving
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </Stack>
          ) : (
            <Stack direction="horizontal" gap={2}>
              <Button size="sm" variant="secondary" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="warning"
                disabled={loading}
                onClick={handleDelete}
              >
                {loading ? (
                  <div className="pr-1">
                    {" "}
                    <Spinner animation="border" variant="dark" size="sm" />{" "}
                    Deleting
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </Stack>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default HouseCard;
