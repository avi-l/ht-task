import { IHouseRecord } from "../types/types";

export interface HousesState {
    houses: IHouseRecord[];
}

export interface ModalState {
    isOpen: boolean;
}

const initialHousesState: HousesState = {
    houses: [],
};

const initialModalState: ModalState = {
    isOpen: false,
};

export const fetchHousesAction = (fetchedHouses: IHouseRecord[]) => ({
    type: 'SET_HOUSES',
    payload: fetchedHouses,
});

export const toggleModalAction = () => ({
    type: 'TOGGLE_MODAL',
});

export const housesReducer = (state: HousesState = initialHousesState, action: { type: string; payload: { id: number | undefined; } | IHouseRecord | IHouseRecord[] }) => {
    switch (action.type) {
        case 'SET_HOUSES':
            return {
                ...state,
                houses: action.payload,
            };
        case 'ADD_HOUSE':
            return {
                ...state,
                houses: [...state.houses, action.payload],
            };
        case 'DELETE_HOUSE':
            return {
                ...state,
                houses: state.houses.filter((house) => house.id !== action.payload?.id),
            };
        default:
            return state;
    }
};

export const modalReducer = (state: ModalState = initialModalState, action: { type: string; }) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        default:
            return state;
    }
};

