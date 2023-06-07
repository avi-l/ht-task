import { combineReducers } from "@reduxjs/toolkit";
import { housesReducer, modalReducer } from "./reducers";
import { HousesState, ModalState } from "../types/types";

export interface RootState {
  houses: HousesState;
  modal: ModalState;
}
const rootReducer = combineReducers({
  houses: housesReducer,
  modal: modalReducer,
});

export default rootReducer;
