/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  NativeBaseProvider,
  VStack,
  Text,
  Modal,
  Button,
  Center,
  ToastProvider,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../utils/Enums/Colors';
import Buttons from '../Buttons/Buttons';
import {useDispatch} from 'react-redux';
import {
  deletevehicleById,
  updateVehicle,
} from '../../redux/vehicleRedux/slices/VehicleSlice';
import AWS from 'aws-sdk';
import {ACCESS_KEY, SECRET_ACCESS_KEY} from '@env';
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});
const s3 = new AWS.S3();
const deviceWidth = Dimensions.get('window').width;
const ViewCarDataGrid = ({navigation, itemData}: any, props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [actualPriceModal, setActualPriceModal] = useState(false);
  const [actualPrice, setActualPrice] = useState('');
  const [active, setActive] = useState(0);
  const [imgUri, setImgUri] = useState<any>([]);
  const [tempState, setTempState] = useState(false);
  const {
    _id,
    brand,
    model,
    color,
    fuelType,
    mileage,
    transmission,
    condition,
    engineCapacity,
    price,
    status,
    address,
    year,
    contact,
    arrayOfFilesName,
  } = itemData;
  const dispatch = useDispatch();

  useEffect(() => {
    const images = [arrayOfFilesName[0], arrayOfFilesName[1]];
    console.log('ii-', images);
    setActualPrice('Rs.5000000');
    images.forEach(imageName => getImageFromS3(imageName));
  }, [tempState]);
  const getImageFromS3 = async (imageName: any) => {
    const params = {
      Bucket: 'vehicleimgurl',
      Key: imageName,
    };

    s3.getObject(params, (err: any, data: any) => {
      if (err) {
        console.error('Error getting image from S3:', err);
      } else {
        console.log('Image retrieved successfully.');
        const tempImgUri = `data:${
          data.ContentType
        };base64,${data.Body.toString('base64')}`;
        setImgUri((prev: any) => [...prev, tempImgUri]);
      }
    });
  };
  function backToList() {
    navigation.navigate('MyTabs');
    setTempState(true);
  }
  function deleteFunction() {
    console.log(_id);
    dispatch(deletevehicleById(_id));
    setDeleteModal(false);
    console.log('Deleted!');
    ToastAndroid.showWithGravityAndOffset(
      'The vehicle successfully deleted!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    navigation.navigate('MyTabs');
  }
  const onScrollChange = ({nativeEvent}: any) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  function sellingFunction() {
    const updatedDataObj = {...itemData, status: 'sold out'};
    dispatch(updateVehicle(updatedDataObj));
    setShowModal(false);
    ToastAndroid.showWithGravityAndOffset(
      'The vehicle successfully sold!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    navigation.navigate('MyTabs');
  }
  const sellModal = () => {
    return (
      <Center>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Confirm your sale!</Modal.Header>
            <Modal.Body>
              Are you sure you want to sell this vehicle? Then press the sell
              button below, otherwise, you can select the cancel button.
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    sellingFunction();
                  }}>
                  Sell
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const deleteModal = () => {
    return (
      <Center>
        <Modal
          isOpen={DeleteModal}
          onClose={() => setDeleteModal(false)}
          _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
          <Modal.Content maxWidth="350" maxH="212">
            <Modal.CloseButton />
            <Modal.Header>Confirm your delete!</Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this vehicle? Then press the
              delete button below, otherwise, you can select the cancel button.
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setDeleteModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    deleteFunction();
                  }}>
                  Delete
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const actualPriceModalView = () => {
    return (
      <Center>
        <Modal
          isOpen={actualPriceModal}
          onClose={() => setActualPriceModal(false)}
          _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'warmGray.50',
          }}>
          <Modal.Content maxWidth="350" maxH="300">
            <Modal.CloseButton />
            <Modal.Header>Actual Price Of This Vehicle!</Modal.Header>

            <Modal.Body>
              <Modal.Body>{actualPrice}</Modal.Body>
              Are you sure you want to update this vehicle price? Then press the
              update button below, otherwise, you can select the Done button.
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    navigation.navigate('UpdateCar', {itemData});
                  }}>
                  Update price
                </Button>
                <Button
                  colorScheme="red"
                  onPress={() => {
                    setActualPriceModal(false);
                  }}>
                  Done
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const getActualPrice = async () => {
    console.log(itemData);
    //if response true
    setActualPriceModal(true);
  };
  return (
    <NativeBaseProvider>
      <ToastProvider>
        <Box style={style.mainView}>
          <TouchableOpacity style={style.titleArea}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              style={style.backBtnSvg}
              fill={'#636e72'}
              className="icon"
              viewBox="0 0 1024 1024"
              onPress={() => {
                backToList();
              }}
              {...props}>
              <Path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-.8 88.8l309.6 280z" />
            </Svg>
            <Text
              style={style.title}
              onPress={() => {
                backToList();
              }}>
              helllo new
            </Text>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              style={style.deleteBtn}
              fill="none"
              viewBox="0 0 24 24"
              onPress={() => {
                setDeleteModal(true);
              }}
              {...props}>
              <Path
                fill="#71717A"
                d="M1.5 3.75a.75.75 0 0 0 0 1.5v-1.5Zm21 1.5a.75.75 0 0 0 0-1.5v1.5Zm-21 0h21v-1.5h-21v1.5Z"
              />
              <Path
                fill="#71717A"
                d="M9.75 1.5V.75v.75ZM8.25 3H7.5h.75ZM7.5 4.5a.75.75 0 0 0 1.5 0H7.5Zm7.5 0a.75.75 0 0 0 1.5 0H15Zm.75-1.5h.75-.75ZM14.25.75h-4.5v1.5h4.5V.75Zm-4.5 0a2.25 2.25 0 0 0-1.591.659l1.06 1.06a.75.75 0 0 1 .531-.219V.75Zm-1.591.659A2.25 2.25 0 0 0 7.5 3H9a.75.75 0 0 1 .22-.53L8.159 1.409ZM7.5 3v1.5H9V3H7.5Zm9 1.5V3H15v1.5h1.5Zm0-1.5a2.25 2.25 0 0 0-.659-1.591l-1.06 1.06c.14.141.219.332.219.531h1.5Zm-.659-1.591A2.25 2.25 0 0 0 14.25.75v1.5a.75.75 0 0 1 .53.22l1.061-1.061ZM9 17.25a.75.75 0 0 0 1.5 0H9Zm1.5-7.5a.75.75 0 0 0-1.5 0h1.5Zm0 7.5v-7.5H9v7.5h1.5ZM13.5 17.25a.75.75 0 0 0 1.5 0h-1.5Zm1.5-7.5a.75.75 0 0 0-1.5 0H15Zm0 7.5v-7.5h-1.5v7.5H15ZM18.865 21.124l-.747-.062.747.062ZM17.37 22.5v-.75.75Zm-10.739 0v-.75.75Zm-1.495-1.376.747-.062-.747.062ZM4.497 4.438a.75.75 0 0 0-1.494.124l1.494-.124Zm16.5.124a.75.75 0 1 0-1.494-.124l1.494.124Zm-2.88 16.5a.75.75 0 0 1-.239.49l1.016 1.104a2.25 2.25 0 0 0 .718-1.47l-1.494-.124Zm-.239.49a.75.75 0 0 1-.508.198v1.5a2.25 2.25 0 0 0 1.524-.595l-1.016-1.103Zm-.508.198H6.631v1.5H17.37v-1.5Zm-10.74 0a.75.75 0 0 1-.507-.198l-1.016 1.104c.416.382.96.594 1.524.594v-1.5Zm-.507-.198a.75.75 0 0 1-.24-.49l-1.494.124a2.25 2.25 0 0 0 .718 1.47l1.016-1.104Zm-.24-.49L4.497 4.438l-1.494.124 1.386 16.624 1.494-.124Zm13.62-16.624-1.385 16.624 1.494.124 1.385-16.624-1.494-.124Z"
              />
            </Svg>
          </TouchableOpacity>
          <ScrollView>
            <View style={style.carDetailAreaContainer}>
              <View style={style.imgArea}>
                {imgUri && (
                  <>
                    <FlatList
                      horizontal
                      onScroll={onScrollChange}
                      showsHorizontalScrollIndicator={false}
                      data={imgUri}
                      pagingEnabled
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => (
                        <View style={style.imgSlider}>
                          <Image source={{uri: item}} style={style.img} />
                        </View>
                      )}
                    />
                    <View style={style.pagination}>
                      {imgUri.map((_: any, index: any) => (
                        <Text
                          key={index}
                          style={
                            index === active ? style.activeDot : style.dot
                          }>
                          •
                        </Text>
                      ))}
                    </View>
                  </>
                )}
              </View>
              <View style={style.vehicleDetailArea}>
                <VStack space={5} style={style.detailsBody} alignItems="center">
                  {/*top Details*/}
                  <View style={style.nameContainer}>
                    <View style={style.leftNameContainerPart}>
                      <View style={style.leftContentBox}>
                        <Text fontSize="2xl" color={Colors.WHITE}>
                          {brand} {model}
                          {'\n'}
                          <Text fontSize="sm" color={Colors.TEXT_GRAY}>
                            Located in {address}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={style.rightNameContainerPart}>
                      <View style={style.rightContentBox}>
                        <Text
                          fontSize="2xl"
                          color={Colors.WHITE}
                          backgroundColor={Colors.WHITE}>
                          LKR {price}
                          {'\n'}
                          <Text fontSize="sm" color={Colors.TEXT_GRAY}>
                            {status}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={style.middleArea}>
                    <View style={style.dummy} />

                    <Text
                      fontSize="md"
                      style={style.priceCheck}
                      color={Colors.SECONDARY}
                      width={'40%'}
                      onPress={() => {
                        getActualPrice();
                      }}>
                      Check Actual Price
                    </Text>
                  </View>
                  {/*Brand Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Brand
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {brand}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*model Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Model
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {model}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*color Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Color
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {color}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*fuel type Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Fuel Type
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {fuelType}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*mileage Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Mileage
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {mileage}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*transmission Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Transmission
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {transmission}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*condition Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Condition
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {condition}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*year Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Year
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {year}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*engine capacity Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Engine Capacity
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {engineCapacity}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>

                  {/*Contact Details*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Text fontSize="xl" color={Colors.WHITE}>
                        Contact No
                      </Text>
                      <Text fontSize="xl" color={Colors.TEXT_GRAY}>
                        {contact}
                      </Text>
                    </View>
                    <View style={style.separator} />
                  </View>
                  {/*buttons*/}
                  <View style={style.itemContainer}>
                    <View style={style.textContainer}>
                      <Buttons
                        btnColor="#FACC15"
                        btnWidth={170}
                        btnName="Update"
                        btnTextColor="black"
                        onPress={() =>
                          navigation.navigate('UpdateCar', {itemData})
                        }
                        svgPath="m29.126 12.16-3.644 3.64-3.612-3.64c-.45-.464-1.2.234-.71.71l3.967 3.993a.521.521 0 0 0 .71 0l4-3.994c.49-.488-.238-1.18-.71-.71zM15.53 4.012c-4.307-.187-8.5 2.164-10.467 6.28-.288.6.59 1 .875.44 2.39-5 8.41-7.13 13.437-4.75A9.992 9.992 0 0 1 25 13.574c.095.693 1.102.46 1-.156-.534-3.642-2.88-6.765-6.22-8.345-1.377-.652-2.813-1-4.25-1.062zM.875 17.843l3.644-3.64 3.612 3.64c.45.464 1.2-.234.71-.71L4.873 13.14a.521.521 0 0 0-.71 0l-4 3.993c-.49.488.238 1.18.71.71zM14.47 25.99c4.307.187 8.5-2.165 10.468-6.28.287-.6-.592-1-.875-.44-2.39 5-8.41 7.13-13.438 4.75A9.987 9.987 0 0 1 5 16.428c-.095-.693-1.102-.458-1 .156.534 3.642 2.88 6.764 6.22 8.344 1.377.653 2.813 1 4.25 1.063z"
                      />
                      <Buttons
                        btnColor="#0C8CE9"
                        btnWidth={170}
                        btnName="Sell"
                        btnTextColor="white"
                        onPress={() => setShowModal(true)}
                        svgPath="M11.948 1.25h.104c.899 0 1.648 0 2.242.08.628.084 1.195.27 1.65.725.456.456.642 1.023.726 1.65.06.44.075.964.079 1.57.648.021 1.226.06 1.74.128 1.172.158 2.121.49 2.87 1.238.748.749 1.08 1.698 1.238 2.87.153 1.14.153 2.595.153 4.433v.112c0 1.838 0 3.294-.153 4.433-.158 1.172-.49 2.121-1.238 2.87-.749.748-1.698 1.08-2.87 1.238-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153-1.172-.158-2.121-.49-2.87-1.238-.748-.749-1.08-1.698-1.238-2.87-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433.158-1.172.49-2.121 1.238-2.87.749-.748 1.698-1.08 2.87-1.238.514-.069 1.092-.107 1.74-.128.004-.606.02-1.13.079-1.57.084-.627.27-1.194.725-1.65.456-.455 1.023-.64 1.65-.725.595-.08 1.345-.08 2.243-.08ZM8.752 5.252c.378-.002.775-.002 1.192-.002h4.112c.417 0 .814 0 1.192.002-.004-.57-.018-1-.064-1.347-.063-.461-.17-.659-.3-.789-.13-.13-.328-.237-.79-.3-.482-.064-1.13-.066-2.094-.066s-1.612.002-2.095.067c-.461.062-.659.169-.789.3-.13.13-.237.327-.3.788-.046.346-.06.776-.064 1.347ZM5.71 6.89c-1.006.135-1.586.389-2.01.812-.422.423-.676 1.003-.811 2.009-.138 1.027-.14 2.382-.14 4.289 0 1.907.002 3.262.14 4.29.135 1.005.389 1.585.812 2.008.423.423 1.003.677 2.009.812 1.028.138 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14 1.005-.135 1.585-.389 2.008-.812.423-.423.677-1.003.812-2.009.138-1.027.14-2.382.14-4.289 0-1.907-.002-3.261-.14-4.29-.135-1.005-.389-1.585-.812-2.008-.423-.423-1.003-.677-2.009-.812-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14ZM12 9.25a.75.75 0 0 1 .75.75v.01c1.089.274 2 1.133 2 2.323a.75.75 0 0 1-1.5 0c0-.384-.426-.916-1.25-.916-.824 0-1.25.532-1.25.916s.426.917 1.25.917c1.385 0 2.75.96 2.75 2.417 0 1.19-.911 2.048-2 2.323V18a.75.75 0 0 1-1.5 0v-.01c-1.089-.274-2-1.133-2-2.323a.75.75 0 0 1 1.5 0c0 .384.426.916 1.25.916.824 0 1.25-.532 1.25-.916s-.426-.917-1.25-.917c-1.385 0-2.75-.96-2.75-2.417 0-1.19.911-2.049 2-2.323V10a.75.75 0 0 1 .75-.75Z"
                      />
                    </View>
                    {sellModal()}
                    {deleteModal()}
                    {actualPriceModalView()}
                  </View>
                </VStack>
              </View>
            </View>
          </ScrollView>
        </Box>
      </ToastProvider>
    </NativeBaseProvider>
  );
};

export default ViewCarDataGrid;

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    width: deviceWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnSvg: {
    width: 30,
    height: 30,
    margin: 5,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 2,
    //backgroundColor: '#DFDFDF',
  },
  middleArea: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  dummy: {
    flexGrow: 20,
  },
  priceCheck: {},
  title: {
    color: '#636e72',
    fontSize: 20,
  },
  carDetailAreaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
  },
  imgArea: {
    width: 300,
    height: 170,
    backgroundColor: '#DFDFDF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    top: 10,
    position: 'absolute',
  },
  img: {
    width: 230,
    flex: 1,
    margin: 20,
  },
  deleteBtn: {
    marginLeft: 230,
  },
  imgSlider: {
    width: 300,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleDetailArea: {
    height: 'auto',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    marginTop: 100,
    zIndex: -1,
  },
  detailsBody: {
    marginTop: 80,
    width: deviceWidth,
    marginBottom: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    width: deviceWidth,
    //padding: 15,
  },
  rightNameContainerPart: {
    marginTop: 10,
    width: deviceWidth / 2,
    flex: 1,
    height: deviceWidth / 6,
    textAlign: 'right',
    //paddingTop: 15,
    paddingRight: 15,
    //backgroundColor: 'yellow',
    alignItems: 'flex-end',
  },
  leftNameContainerPart: {
    marginTop: 10,
    width: deviceWidth / 2,
    flex: 1,
    height: deviceWidth / 6,
    textAlign: 'left',
    paddingLeft: 15,
    //paddingTop: 15,
    //backgroundColor: 'yellow',
    alignItems: 'flex-start',
  },
  leftContentBox: {
    //height: 'auto',
    //backgroundColor: 'green',
  },
  rightContentBox: {
    //height: 'auto',
    //backgroundColor: 'red',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: deviceWidth,
  },
  separator: {
    height: 1,
    width: 350,
    backgroundColor: Colors.SEP,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth,
    paddingLeft: 30,
    paddingRight: 30,
  },
  navigationButtons: {
    backgroundColor: 'yellow',
    position: 'absolute',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
  },
  dot: {
    color: 'white',
    fontSize: 30,
  },
  activeDot: {
    color: '#5C5C5D',
    fontSize: 30,
  },
});
