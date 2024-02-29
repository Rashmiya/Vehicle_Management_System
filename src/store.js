import {configureStore} from '@reduxjs/toolkit';
import vehicleReducer from './redux/vehicleRedux/slices/VehicleSlice';
import createSagaMiddleware from 'redux-saga';
import vehicleSaga from './redux/vehicleRedux/saga/VehicleSaga';
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    vehicleSlice: vehicleReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(vehicleSaga);
export default store;
