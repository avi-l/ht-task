import { combineReducers } from '@reduxjs/toolkit';
import {HousesState, ModalState, housesReducer, modalReducer} from './reducers';

export interface RootState {
  houses: HousesState;
  modal: ModalState;
  // other state slices if any
}
const rootReducer = combineReducers({
  houses: housesReducer,
  modal: modalReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

