/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import DataForm from '../../components/DataForm/DataForm';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils/Enums/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNewVehicle,
  setNewVehicleSuccess,
} from '../../redux/vehicleRedux/slices/VehicleSlice';
import {vehicleModel} from '../../utils/interface';
import AWS from 'aws-sdk';
import {ACCESS_KEY, SECRET_ACCESS_KEY} from '@env';
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

const s3 = new AWS.S3();

const AddCar = ({navigation}: any, props: any) => {
  function backToList() {
    navigation.navigate('MyTabs');
  }
  const dispatch = useDispatch();
  let isLoading = useSelector((state: any) => state.vehicleSlice.loading);
  let isNewVehicleSavedState = useSelector(
    (state: any) => state.vehicleSlice.isNewVehicleSaved,
  );
  // const [frontImgLocation, setFrontImgLocation] = useState('');
  // const [backImgLocation, setBackImgLocation] = useState('');
  useEffect(() => {
    console.log(isNewVehicleSavedState);
    if (isNewVehicleSavedState) {
      ToastAndroid.showWithGravityAndOffset(
        'The vehicle successfully saved!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      navigation.navigate('MyTabs');
      dispatch(setNewVehicleSuccess(false));
    }
  }, [isNewVehicleSavedState]);

  const saveOnAction = async (formData: vehicleModel) => {
    const {arrayOfFilesName, ...rest} = formData;
    console.log(rest);
    const frontImgData = await fetch(arrayOfFilesName[0]).then(response =>
      response.blob(),
    );
    const backImgData = await fetch(arrayOfFilesName[1]).then(response =>
      response.blob(),
    );

    const params1 = {
      Bucket: 'vehicleimgurl',
      Key: `vehicle-frontImage-name-${Date.now()}-1.jpg`,
      Body: frontImgData,
    };

    const params2 = {
      Bucket: 'vehicleimgurl',
      Key: `vehicle-backImage-name-${Date.now()}-2.jpg`,
      Body: backImgData,
    };

    s3.upload(params1, (err1: any, data1: any) => {
      if (err1) {
        console.error('Error uploading image to S3:', err1);
      } else {
        console.log('Image uploaded successfully. S3 URL:', data1.Location);

        s3.upload(params2, (err2: any, data2: any) => {
          if (err2) {
            console.error('Error uploading image to S3:', err2);
          } else {
            console.log('Image uploaded successfully. S3 URL:', data2.Location);
            arrayOfFilesName[0] = params1.Key;
            arrayOfFilesName[1] = params2.Key;
            dispatch(setNewVehicle(formData));
          }
        });
      }
    });
  };
  return (
    <View style={styles.mainView}>
      {isLoading ? (
        <View style={styles.item}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
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
            title="Add new Vehicle"
            btnColor={Colors.SAVE}
            btnText="Submit"
            btnTextColor={Colors.WHITE}
            onSubmitAction={saveOnAction}
            svgPath="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
          />
        </>
      )}
    </View>
  );
};

export default AddCar;

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
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
});
