/* eslint-disable react-hooks/exhaustive-deps */
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import ViewCarDataGrid from '../../components/ViewCarDataGrid/ViewCarDataGrid';
import {useSelector} from 'react-redux';
import {getvehicleByIdAction} from '../../redux/vehicleRedux/slices/VehicleSlice';
//import {vehicleModel} from '../../utils/interface';

const ViewCar = ({navigation, route}: any) => {
  //let vehicleId = useSelector((state: any) => state.vehicleSlice.vehicleId);
  let isLoading = useSelector((state: any) => state.vehicleSlice.loading);
  //const [dataObj, setDataObj] = useState<null | vehicleModel>();
  // let selectedVehicle = useSelector(
  //   (state: any) => state.vehicleSlice.selectedVehicleData,
  // );
  const {itemData} = route.params;
  //const dispatch = useDispatch();
  useEffect(() => {
    //fetchSelectedVehicleData(_id);
    console.log('ss- ', itemData);
    getvehicleByIdAction(itemData);
  }, [itemData]);

  // function fetchSelectedVehicleData(_id: any) {
  //   dispatch(getvehicleById(_id));
  // }

  // useEffect(() => {
  //   if (selectedVehicle !== null) {
  //     if (_id === selectedVehicle[0]._id) {
  //       //const dataObj = selectedVehicle[0];
  //     }
  //   } else {
  //     console.log('emplty');
  //   }
  // }, [selectedVehicle]);
  return (
    <View style={styles.mainView}>
      {isLoading && itemData === null ? (
        <View style={styles.item}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ViewCarDataGrid itemData={itemData} navigation={navigation} />
      )}
    </View>
  );
};

export default ViewCar;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
});
