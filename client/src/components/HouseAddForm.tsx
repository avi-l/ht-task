import { ChangeEvent, FormEvent, useState } from "react";
import { createHouseRecord, fetchRandomHousePic } from "../api/api";
import { IHouseRecord } from "../types/types";
import { toast } from "react-toastify";
import isNumeric from "validator/lib/isNumeric";
import { useDispatch } from "react-redux";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Stack,
  Alert,
  Spinner,
} from "react-bootstrap";
import { toggleModalAction } from "../dux/reducers";
import { useNavigate } from "react-router-dom";
import { validateNumericInput } from "../utils/utils";

const HouseForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newHouseID, setNewHouseId] = useState<number>(0);
  const [formValues, setFormValues] = useState<IHouseRecord>({
    address: "",
    currentValue: 0,
    risk: 0,
    loanAmount: 0,
    image: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setFormValues({
      address: "",
      currentValue: 0,
      loanAmount: 0,
      risk: 0,
      image: "",
    });
    dispatch(toggleModalAction());
  };

  const handleNavigate = () => {
    navigate(`/houses/${newHouseID}`);
    handleClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target || {};
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { address, currentValue, loanAmount } = formValues;
      if (!address || !currentValue || !loanAmount) return null;
      const image = await fetchRandomHousePic();
      console.log("image", image);
      const houseData: IHouseRecord = {
        address,
        currentValue,
        loanAmount,
        risk: 0,
        image,
      };

      const newHouse: IHouseRecord = await createHouseRecord(houseData);
      dispatch({ type: "ADD_HOUSE", payload: newHouse });
      setNewHouseId(newHouse?.id as number);
      toast.success("YAY! Your house data has been saved");
    } catch (error) {
      console.error(error);
      toast.error("Oops, there was a problem saving this data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="flex items-center">
            <h3>Add New House</h3>
          </div>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  disabled={!!newHouseID}
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
                  disabled={!!newHouseID}
                  type="text"
                  name="currentValue"
                  placeholder="Enter a value"
                  value={formValues?.currentValue}
                  onKeyDown={(e) => validateNumericInput(e)}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="loanAmount">
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                  disabled={!!newHouseID}
                  type="text"
                  name="loanAmount"
                  placeholder="Enter your loan amount"
                  value={formValues?.loanAmount}
                  onKeyDown={(e) => validateNumericInput(e)}
                  onChange={handleChange}
                />
              </Form.Group>

              {newHouseID > 0 && (
                <div className="m-1 text-center">
                  <hr />
                  <Alert variant="warning">
                    Success! Your newly created ID: {newHouseID}
                    <div className="p-2 flex justify-center items-center">
                      {" "}
                      <Button
                        variant="warning"
                        size="sm"
                        disabled={!newHouseID}
                        onClick={handleNavigate}
                      >
                        Take me to the house!
                      </Button>
                    </div>{" "}
                  </Alert>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Stack direction="horizontal" gap={2}>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="warning"
                    disabled={
                      loading ||
                      !formValues?.address ||
                      !formValues?.currentValue
                    }
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <>
                        {" "}
                        <Spinner size="sm" /> Saving{" "}
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </Stack>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HouseForm;
