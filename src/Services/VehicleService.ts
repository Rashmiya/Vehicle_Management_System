import {vehicleModel} from '../utils/interface';
import axios from 'axios';
const baseUrl = 'http://13.55.29.64:8000/vehicle';

export const getVehicleByStatusService = async (status: string) => {
  console.log(status);
  //const res = await axios.get(baseUrl);
  const res = await axios.get(baseUrl + '/status/' + status);
  return res;
};
export const getVehicleByModelService = async (model: string) => {
  const res = await axios.get(`${baseUrl}/model/${model}`);
  return res;
};
export const getVehicleByIdService = async (id: string) => {
  const res = await axios.get(`${baseUrl}/id/${id}`);
  return res;
};
export const saveVehicleService = async (vehicle: vehicleModel) => {
  const res = await axios.post(baseUrl, vehicle, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export const updateVehicleService = async (vehicle: vehicleModel) => {
  const res = await axios.put(baseUrl, vehicle);
  return res;
};
export const deletehicleService = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/delete/${id}`);
  return res;
};
