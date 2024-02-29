import {call, put, takeEvery} from 'redux-saga/effects';
import {
  deletevehicleById,
  deletevehicleByIdAction,
  getAvaiableVehicleByStatus,
  getAvaiableVehicleByStatusAction,
  getSoldOutVehicleByStatus,
  getSoldOutVehicleByStatusAction,
  getvehicleById,
  getvehicleByIdAction,
  setErrorStateAction,
  setLoadingAction,
  setNewVehicle,
  setNewVehicleAction,
  setNewVehicleSuccess,
  updateVehicle,
  updateVehicleAction,
  updateVehicleSuccess,
} from '../slices/VehicleSlice';
import {
  deletehicleService,
  getVehicleByIdService,
  getVehicleByStatusService,
  saveVehicleService,
  updateVehicleService,
} from '../../../Services/VehicleService';

function* getvehicleByStatusOnAction(action: any): any {
  try {
    setLoadingAction(true);
    const response = yield call(getVehicleByStatusService, action.payload);
    if (response) {
      if (action.payload === 'available') {
        yield put(getAvaiableVehicleByStatusAction(response.data));
        yield put(setLoadingAction(false));
      } else {
        yield put(getSoldOutVehicleByStatusAction(response.data));
        yield put(setLoadingAction(false));
      }
    } else {
      yield put(
        setErrorStateAction({
          isError: true,
          errorMessage: 'Failed to fetch vehicle!',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    setLoadingAction(false);
  }
}

function* setNewVehicleOnAction(action: any): any {
  try {
    yield put(setLoadingAction(true));
    const response = yield call(saveVehicleService, action.payload);
    if (response) {
      yield put(setNewVehicleAction(response.data));
      yield put(setLoadingAction(false));
      yield put(setNewVehicleSuccess(true));
    } else {
      yield put(
        setErrorStateAction({
          isError: true,
          errorMessage: 'Failed to add vehicle!',
        }),
      );
      yield put(setLoadingAction(false));
    }
  } catch (error) {
    console.log(error);
    setLoadingAction(false);
  }
}

function* getvehicleByIdOnAction(action: any): any {
  try {
    setLoadingAction(true);
    const response = yield call(getVehicleByIdService, action.payload);
    if (response) {
      yield put(getvehicleByIdAction(response.data));
      yield put(setLoadingAction(false));
    } else {
      yield put(
        setErrorStateAction({
          isError: true,
          errorMessage: 'Failed to fetch vehicle!',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    setLoadingAction(false);
  }
}

function* updateVehicleOnAction(action: any): any {
  try {
    yield put(setLoadingAction(true));
    const response = yield call(updateVehicleService, action.payload);
    if (response) {
      yield put(updateVehicleAction(response.data));
      yield put(setLoadingAction(false));
      yield put(updateVehicleSuccess(true));
    } else {
      yield put(
        setErrorStateAction({
          isError: true,
          errorMessage: 'Failed to update vehicle!',
        }),
      );
      yield put(setLoadingAction(false));
    }
  } catch (error) {
    console.log(error);
    setLoadingAction(false);
  }
}

function* deleteVehicleOnAction(action: any): any {
  try {
    yield put(setLoadingAction(true));
    const response = yield call(deletehicleService, action.payload);
    if (response) {
      yield put(deletevehicleByIdAction(response.data));
      yield put(setLoadingAction(false));
    } else {
      yield put(
        setErrorStateAction({
          isError: true,
          errorMessage: 'Failed to delete vehicle!',
        }),
      );
      yield put(setLoadingAction(false));
    }
  } catch (error) {
    console.log(error);
    setLoadingAction(false);
  }
}
function* vehicleSaga() {
  yield takeEvery(getAvaiableVehicleByStatus, getvehicleByStatusOnAction);
  yield takeEvery(getSoldOutVehicleByStatus, getvehicleByStatusOnAction);
  yield takeEvery(setNewVehicle, setNewVehicleOnAction);
  yield takeEvery(getvehicleById, getvehicleByIdOnAction);
  yield takeEvery(updateVehicle, updateVehicleOnAction);
  yield takeEvery(deletevehicleById, deleteVehicleOnAction);
}
export default vehicleSaga;
