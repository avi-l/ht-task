import { HousesState, IHouseRecord, ModalState } from "../types/types";

const initialHousesState: HousesState = {
  houses: [] as IHouseRecord[],
};

const initialModalState: ModalState = {
  isOpen: false,
};

export const fetchHousesAction = (fetchedHouses: IHouseRecord[]) => ({
  type: "SET_HOUSES",
  payload: fetchedHouses,
});

export const toggleModalAction = () => ({
  type: "TOGGLE_MODAL",
});

export const housesReducer = (
  state = initialHousesState,
  action: { type: string; payload: IHouseRecord | IHouseRecord[] }
) => {
  switch (action.type) {
    case "SET_HOUSES":
      return {
        ...state,
        houses: action.payload,
      };
    case "ADD_HOUSE":
      return {
        ...state,
        houses: [...state.houses, action.payload],
      };
    case "UPDATE_HOUSE": {
      const updatePayload = Array.isArray(action.payload)
        ? action.payload[0]
        : action.payload;
      return {
        ...state,
        houses: state.houses.map((house) =>
          house.id === updatePayload?.id
            ? { ...house, ...updatePayload }
            : house
        ),
      };
    }
    case "DELETE_HOUSE": {
      const deletePayload = Array.isArray(action.payload)
        ? action.payload[0]
        : action.payload;
      return {
        ...state,
        houses: state.houses.filter((house) => house.id !== deletePayload?.id),
      };
    }
    default:
      return state;
  }
};

export const modalReducer = (
  state: ModalState = initialModalState,
  action: { type: string }
) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};
