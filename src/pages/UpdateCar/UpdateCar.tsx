import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DataForm from '../../components/DataForm/DataForm';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils/Enums/Colors';
import {useDispatch} from 'react-redux';
import {updateVehicle} from '../../redux/vehicleRedux/slices/VehicleSlice';

const UpdateCar = ({navigation, route}: any, props: any) => {
  const {itemData} = route.params;
  const dispatch = useDispatch();
  function backToList() {
    navigation.navigate('ViewCar', {itemData});
  }

  const updateOnAction = (formData: any) => {
    console.log('update formData:- ', formData);
    const updatedDataObj = {...itemData, ...formData};
    dispatch(updateVehicle(updatedDataObj));
    navigation.navigate('ViewCar', {itemData: updatedDataObj});
    ToastAndroid.showWithGravityAndOffset(
      'The vehicle successfully updated!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.titleArea}
        onPress={() => {
          backToList();
        }}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={styles.backBtnSvg}
          fill={'#636e72'}
          className="icon"
          viewBox="0 0 1024 1024"
          {...props}>
          <Path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-.8 88.8l309.6 280z" />
        </Svg>
        <Text style={styles.title}>All Vehicles</Text>
      </TouchableOpacity>
      <DataForm
        title="Update Vehicle"
        btnColor={Colors.UPDATE}
        btnText="Update"
        btnTextColor={Colors.BLACK}
        onSubmitAction={updateOnAction}
        data={itemData}
        svgPath="m29.126 12.16-3.644 3.64-3.612-3.64c-.45-.464-1.2.234-.71.71l3.967 3.993a.521.521 0 0 0 .71 0l4-3.994c.49-.488-.238-1.18-.71-.71zM15.53 4.012c-4.307-.187-8.5 2.164-10.467 6.28-.288.6.59 1 .875.44 2.39-5 8.41-7.13 13.437-4.75A9.992 9.992 0 0 1 25 13.574c.095.693 1.102.46 1-.156-.534-3.642-2.88-6.765-6.22-8.345-1.377-.652-2.813-1-4.25-1.062zM.875 17.843l3.644-3.64 3.612 3.64c.45.464 1.2-.234.71-.71L4.873 13.14a.521.521 0 0 0-.71 0l-4 3.993c-.49.488.238 1.18.71.71zM14.47 25.99c4.307.187 8.5-2.165 10.468-6.28.287-.6-.592-1-.875-.44-2.39 5-8.41 7.13-13.438 4.75A9.987 9.987 0 0 1 5 16.428c-.095-.693-1.102-.458-1 .156.534 3.642 2.88 6.764 6.22 8.344 1.377.653 2.813 1 4.25 1.063z"
      />
    </View>
  );
};

export default UpdateCar;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleArea: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  title: {
    color: '#636e72',
    fontSize: 20,
    margin: 5,
  },
  backBtnSvg: {
    width: 30,
    height: 30,
    margin: 5,
  },
});
