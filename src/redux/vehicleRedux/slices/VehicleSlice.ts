/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
import {vehicleModel} from '../../../utils/interface';

export interface ErrorState {
  isError: boolean;
  errorMessage: string;
}
export interface VehicleState {
  loading: boolean;
  errorState: ErrorState | undefined;
  vehicleId: number;
  availableVehicles: [];
  soldOutVehicles: [];
  selectedVehicleData: vehicleModel | null;
  isNewVehicleSaved: boolean;
}

const initialState: VehicleState = {
  loading: true,
  errorState: undefined,
  vehicleId: 0,
  availableVehicles: [],
  soldOutVehicles: [],
  selectedVehicleData: null,
  isNewVehicleSaved: false,
};

export const vehicleSlice = createSlice({
  name: 'vehicleSlice',
  initialState,
  reducers: {
    //get available vehicle by status
    getAvaiableVehicleByStatus: (state, action) => {},
    getAvaiableVehicleByStatusAction: (state, action) => {
      state.availableVehicles = action.payload;
    },

    //get sold out vehicle by status
    getSoldOutVehicleByStatus: (state, action) => {},
    getSoldOutVehicleByStatusAction: (state, action) => {
      state.soldOutVehicles = action.payload;
    },

    //get vehicle by model
    getvehicleByModel: () => {},
    getvehicleByModelAction: (state, action) => {
      state.selectedVehicleData = action.payload;
    },

    //get vehicle by ID
    getvehicleById: (state, action) => {},
    getvehicleByIdAction: (state, action) => {
      state.selectedVehicleData = action.payload;
    },

    //save vehicle
    setNewVehicle: (state, action) => {},
    setNewVehicleAction: (state, action) => {
      state.selectedVehicleData = action.payload;
    },
    setNewVehicleSuccess: (state, action) => {
      state.isNewVehicleSaved = action.payload;
    },

    //update vehicle
    updateVehicle: (state, action) => {},
    updateVehicleAction: (state, action) => {
      state.selectedVehicleData = action.payload;
    },
    updateVehicleSuccess: (state, action) => {
      state.isNewVehicleSaved = action.payload;
    },

    //delete vehicle by ID
    deletevehicleById: (state, action) => {},
    deletevehicleByIdAction: (state, action) => {
      state.selectedVehicleData = action.payload;
    },

    //set loading
    setLoadingAction: (state, action) => {
      state.loading = action.payload;
    },

    //set error
    setErrorStateAction: (state, action) => {
      state.errorState = action.payload;
    },

    //set vehicle ID
    setVehicleId: (state, action) => {
      state.vehicleId = action.payload;
    },
  },
});

export const {
  getAvaiableVehicleByStatus,
  getAvaiableVehicleByStatusAction,
  getSoldOutVehicleByStatus,
  getSoldOutVehicleByStatusAction,
  getvehicleByModel,
  getvehicleByModelAction,
  getvehicleById,
  getvehicleByIdAction,
  setLoadingAction,
  setNewVehicle,
  setNewVehicleAction,
  setErrorStateAction,
  setNewVehicleSuccess,
  setVehicleId,
  updateVehicle,
  updateVehicleAction,
  updateVehicleSuccess,
  deletevehicleById,
  deletevehicleByIdAction,
} = vehicleSlice.actions;
export const vehicleId = (state: any) => state.userReducer.vehicleId;
export const isNewVehicleSaved = (state: any) =>
  state.userReducer.isNewVehicleSaved;

export default vehicleSlice.reducer;
