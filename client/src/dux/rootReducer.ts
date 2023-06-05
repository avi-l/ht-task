import { combineReducers } from '@reduxjs/toolkit';
import {housesReducer, modalReducer} from './reducers';

const rootReducer = combineReducers({
  houses: housesReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

