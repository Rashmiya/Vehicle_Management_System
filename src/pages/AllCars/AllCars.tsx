/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {Box, NativeBaseProvider} from 'native-base';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import Svg, {Path} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {getAvaiableVehicleByStatus} from '../../redux/vehicleRedux/slices/VehicleSlice';
import {vehicleModel} from '../../utils/interface';
//import {getVehicleByStatusService} from '../../Services/VehicleService';

export default function AllCars({navigation}: any, props: any) {
  const [refreshState, setRefreshState] = useState(false);
  let vehicles = useSelector(
    (state: any) => state.vehicleSlice.availableVehicles,
  );

  let isLoading = useSelector((state: any) => state.vehicleSlice.loading);
  const refreshAction = () => {
    setRefreshState(false);
    fetchData();
    setRefreshState(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, [isLoading]);
  function fetchData() {
    dispatch(getAvaiableVehicleByStatus('available'));
  }
  function openCarAddingPage(): void {
    navigation.navigate('AddCar');
  }
  function openVehicleView(itemData: vehicleModel): void {
    //dispatch(setVehicleId(_id));
    console.log(itemData);
    navigation.navigate('ViewCar', {itemData});
  }
  return (
    <NativeBaseProvider>
      {/*  */}
      <Box style={styles.mainArea}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={refreshAction}
              refreshing={refreshState}
            />
          }>
          <View style={styles.topArea}>
            <SearchBar />
          </View>

          {isLoading ? (
            <View style={styles.item}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            vehicles.map((item: vehicleModel) => {
              return (
                <VehicleCard
                  key={item.vid}
                  data={item}
                  viewVehicle={() => openVehicleView(item)}
                />
              );
            })
          )}
        </ScrollView>
        <>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            onPress={() => openCarAddingPage()}
            style={styles.addBtn}
            fill="none"
            viewBox="0 0 24 24"
            {...props}>
            <Path
              fill="#17c0eb"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
              opacity={0.4}
            />
            <Path
              fill="#ffffff"
              d="M16 11.25h-3.25V8c0-.41-.34-.75-.75-.75s-.75.34-.75.75v3.25H8c-.41 0-.75.34-.75.75s.34.75.75.75h3.25V16c0 .41.34.75.75.75s.75-.34.75-.75v-3.25H16c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
            />
          </Svg>
        </>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  topArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    borderRadius: 100,
    margin: '4%',
    position: 'absolute',
    backgroundColor: '#17c0eb',
    bottom: 20,
    right: 20,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
});
