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
import SoldOutCarsCard from '../../components/SoldOutCarsCard/SoldOutCarsCard';
import {useDispatch, useSelector} from 'react-redux';
import {getSoldOutVehicleByStatus} from '../../redux/vehicleRedux/slices/VehicleSlice';

export default function SoldOutCars({navigation}: any) {
  const [refreshState, setRefreshState] = useState(false);
  const refreshAction = () => {
    setRefreshState(false);
    fetchData();
    setRefreshState(false);
  };
  const dispatch = useDispatch();
  const vehicles = useSelector(
    (state: any) => state.vehicleSlice.soldOutVehicles,
  );
  let isLoading = useSelector((state: any) => state.vehicleSlice.loading);

  function openVehicleView(): void {
    navigation.navigate('ViewCar');
  }
  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    dispatch(getSoldOutVehicleByStatus('sold out'));
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
          <View>
            <View style={styles.topArea}>
              <SearchBar />
            </View>
          </View>
          {isLoading ? (
            <View style={styles.item}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            vehicles.map((item: {vid: any}) => {
              return (
                <SoldOutCarsCard
                  key={item.vid}
                  data={item}
                  viewVehicle={() => openVehicleView()}
                />
              );
            })
          )}
          {}
        </ScrollView>
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
  btn: {
    height: 45,
    margin: '4%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    fontSize: 40,
  },
});
