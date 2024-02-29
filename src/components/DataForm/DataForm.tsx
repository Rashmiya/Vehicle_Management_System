/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  Stack,
  FormControl,
  NativeBaseProvider,
  Center,
  Modal,
  Button,
} from 'native-base';
import TextField from '../TextField/TextField';
import Selector from '../Selector/Selector';
import Buttons from '../Buttons/Buttons';

const DataForm = (props: any) => {
  const {
    title,
    btnColor,
    btnText,
    onSubmitAction,
    btnTextColor,
    svgPath,
    data,
  } = props;
  const [frontImageSource, setFrontImageSource] = React.useState<any>(null);
  const [backtImageSource, setBackImageSource] = React.useState<any>(null);
  const [fileArray, setFileArray] = React.useState<any>({});
  const deviceWidth = Dimensions.get('window').width;
  const [formData, setData] = React.useState<any>({});
  const [errors, setErrors] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [btnName, setBtnName] = React.useState('');

  //fiels value states
  const [brandValue, setBrandValue] = React.useState('');
  const [modelValue, setModelValue] = React.useState('');
  const [colorValue, setColorValue] = React.useState('');
  const [fuelTypeValue, setFuelTypeValue] = React.useState('');
  const [mileageValue, setMileageValue] = React.useState('');
  const [transmissionValue, setTransmissionValue] = React.useState('');
  const [conditionValue, setConditionValue] = React.useState('');
  const [engineCapacityValue, setEngineCapacityValue] = React.useState('');
  const [priceValue, setPriceValue] = React.useState('');
  const [statusValue, setStatusValue] = React.useState('');
  const [addressValue, setAddressValue] = React.useState('');
  const [year, setYear] = React.useState('');
  const [contactValue, setContactValue] = React.useState('');

  useEffect(() => {
    //console.log(data.price, data.contact);

    if (frontImageSource && backtImageSource) {
      setData({
        ...formData,
        arrayOfFilesName: [frontImageSource, backtImageSource],
      });
      setImagesToFormData();
    }
  }, [frontImageSource, backtImageSource]);
  useEffect(() => {
    if (data) {
      setBrandValue(data.brand);
      setModelValue(data.model);
      setColorValue(data.color);
      setFuelTypeValue(data.fuelType);
      setMileageValue(data.mileage);
      setTransmissionValue(data.transmission);
      setConditionValue(data.condition);
      setEngineCapacityValue(data.engineCapacity);
      setPriceValue(data.price);
      setStatusValue(data.status);
      setAddressValue(data.address);
      setContactValue(data.contact);
    }
  }, []);
  const setImagesToFormData = () => {
    console.log('f-', frontImageSource);
    console.log('b-', backtImageSource);
  };
  interface Errors {
    [key: string]: boolean;
  }
  const ImagePicker = (btnName: string, imgSource: string) => {
    const handleImagePicker = (response: any, imageType: string) => {
      if (response.assets && response.assets.length > 0) {
        if (imageType === 'frontImg') {
          setFrontImageSource(response.assets[0].uri);
        } else {
          setBackImageSource(response.assets[0].uri);
        }
      }
    };

    let options: any = {
      storageOptions: {
        path: 'image',
      },
    };

    if (btnName === 'frontImageBtn') {
      if (imgSource === 'camera') {
        launchCamera(options, response =>
          handleImagePicker(response, 'frontImg'),
        );
        console.log('fc');
      } else {
        launchImageLibrary(options, response =>
          handleImagePicker(response, 'frontImg'),
        );
        console.log('fg');
      }
    } else {
      if (imgSource === 'camera') {
        launchCamera(options, response =>
          handleImagePicker(response, 'backImg'),
        );
        console.log('bc');
      } else {
        launchImageLibrary(options, response =>
          handleImagePicker(response, 'backImg'),
        );
        console.log('bg');
      }
    }
  };
  const imageSelectionOnAction = (btnName: any) => {
    setBtnName(btnName);
    setShowModal(true);
  };
  const imgSourceModal = () => {
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
            <Modal.Header>Select your Image source!</Modal.Header>
            <Modal.Body>
              <Button.Group space={2}>
                <Button
                  colorScheme="blueGray"
                  onPress={() => {
                    //setImgSource('gallery');
                    ImagePicker(btnName, 'gallery');
                    setShowModal(false);
                  }}>
                  From Gallery
                </Button>
                <Button
                  onPress={() => {
                    //setImgSource('camera');
                    ImagePicker(btnName, 'camera');
                    setShowModal(false);
                  }}>
                  From Camera
                </Button>
              </Button.Group>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Center>
    );
  };
  const frontHandleCancel = () => {
    setFrontImageSource(null);
  };
  const backtHandleCancel = () => {
    setBackImageSource(null);
  };
  const fieldsToValidate = [
    {name: 'brand', minLength: 3},
    {name: 'model', minLength: 3},
    {name: 'color', minLength: 3},
    {name: 'fuelType', minLength: 3},
    {name: 'mileage', minLength: 3},
    {name: 'transmission', minLength: 3},
    {name: 'condition', minLength: 3},
    {name: 'engineCapacity', minLength: 3},
    {name: 'price', minLength: 3},
    {name: 'status', minLength: 3},
    {name: 'address', minLength: 3},
    {name: 'contact', minLength: 3},
  ];
  const validateOnAction = (
    field: string,
    value: string | any[] | undefined,
    minLength: number,
  ) => {
    if (value === undefined) {
      setErrors({...errors, [field]: true});
      ToastAndroid.showWithGravityAndOffset(
        'Please check the required fields !',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return false;
    } else if (value.length < minLength) {
      setErrors({...errors, [field]: true});
      return false;
    }
    return true;
  };
  const validate = () => {
    const allValidFields = fieldsToValidate.every(field =>
      validateOnAction(field.name, formData[field.name], field.minLength),
    );
    console.log(allValidFields);
    return allValidFields;
  };

  // function setChangedText(e: any) {
  //   setData(e);
  //   //console.log(formData);
  // }
  const setValues = () => {
    onSubmitAction(formData);
  };
  const onSubmit = (setValuesOnAction: () => void) => {
    setValuesOnAction();
    // if (validate()) {
    //   setValuesOnAction();
    // } else {
    //   console.log('Validation Failed');
    // }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.contentBody, {width: deviceWidth}]}>
          <FormControl>
            <Stack space={5}>
              {/* brand field */}
              <Stack>
                <Selector
                  key={data ? data.brand : 'defaultKey'}
                  lable={'brand'}
                  errors={'brand' in errors}
                  placeholder={'Toyota'}
                  items={[
                    {label: 'Toyota', value: 'toyota'},
                    {label: 'Mitsubishi', value: 'mitsubishi'},
                    {label: 'Nissan', value: 'nissan'},
                    {label: 'Suzuki', value: 'suzuki'},
                    {label: 'Honda', value: 'honda'},
                    {label: 'Isuzu', value: 'isuzu'},
                    {label: 'Tata', value: 'tata'},
                    {label: 'BMW', value: 'bmw'},
                    {label: 'Mercedes-Benz', value: 'mercedes-benz'},
                    {label: 'Audi', value: 'audi'},
                  ]}
                  value={brandValue}
                  onChangeTextProp={(value: any) => {
                    setBrandValue(value);
                    setData({...formData, brand: value});
                  }}
                />
              </Stack>

              {/* model field */}
              <Stack>
                <TextField
                  lable={'Model'}
                  errors={'model' in errors}
                  placeholder={'Axio'}
                  value={modelValue}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, model: value});
                    setModelValue(value);
                  }}
                />
              </Stack>

              {/* color field */}
              <Stack>
                <TextField
                  lable={'Color'}
                  errors={'color' in errors}
                  value={colorValue}
                  keyboardTypeText="ascii-capable"
                  placeholder={'White'}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, color: value});
                    setColorValue(value);
                  }}
                />
              </Stack>

              {/* fuel type field */}
              <Stack>
                <Selector
                  lable={'Fuel type'}
                  errors={'fuelType' in errors}
                  placeholder={'Petrol'}
                  value={fuelTypeValue}
                  items={[
                    {label: 'Petrol', value: 'petrol'},
                    {label: 'Diesel', value: 'diesel'},
                    {label: 'Electric', value: 'electric'},
                    {label: 'Hybrid', value: 'hybrid'},
                  ]}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, fuelType: value});
                    setFuelTypeValue(value);
                  }}
                />
              </Stack>

              {/* mileage field */}
              <Stack>
                <TextField
                  lable={'Mileage (Km)'}
                  errors={'mileage' in errors}
                  placeholder={'12000'}
                  value={mileageValue}
                  keyboardTypeText={'numeric'}
                  maxLengthValue={7}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, mileage: value + ' Km'});
                    setMileageValue(value);
                  }}
                />
              </Stack>

              {/* transmission field */}
              <Stack>
                <Selector
                  lable={'Transmission'}
                  errors={'transmission' in errors}
                  placeholder={'Manual'}
                  value={transmissionValue}
                  items={[
                    {label: 'Auto', value: 'auto'},
                    {label: 'Manual', value: 'manual'},
                  ]}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, transmission: value});
                    setTransmissionValue(value);
                  }}
                />
              </Stack>

              {/* Condition field */}
              <Stack>
                <Selector
                  lable={'Condition'}
                  errors={'condition' in errors}
                  placeholder={'Used'}
                  value={conditionValue}
                  items={[
                    {label: 'Used', value: 'used'},
                    {label: 'Brand new', value: 'brand new'},
                  ]}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, condition: value});
                    setConditionValue(value);
                  }}
                />
              </Stack>

              {/* Engine capacity field */}
              <Stack>
                <TextField
                  lable={'Engine Capacity (cc)'}
                  errors={'engineCapacity' in errors}
                  placeholder={'1600'}
                  value={engineCapacityValue}
                  keyboardTypeText={'numeric'}
                  maxLengthValue={4}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, engineCapacity: value + 'cc'});
                    setEngineCapacityValue(value);
                  }}
                />
              </Stack>

              {/* price field */}
              <Stack>
                <TextField
                  lable={'price (LKR)'}
                  errors={'price' in errors}
                  placeholder={'5600000'}
                  keyboardTypeText={'numeric'}
                  value={String(priceValue)}
                  maxLengthValue={9}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, price: value});
                    setPriceValue(value);
                  }}
                />
              </Stack>

              {/* status field */}
              <Stack>
                <Selector
                  lable={'Status'}
                  errors={'status' in errors}
                  placeholder={'Available'}
                  value={statusValue}
                  items={[
                    {label: 'Available', value: 'available'},
                    {label: 'Sold out', value: 'sold out'},
                  ]}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, status: value});
                    setStatusValue(value);
                  }}
                />
              </Stack>

              {/* Address field */}
              <Stack>
                <TextField
                  lable={'Address'}
                  errors={'address' in errors}
                  value={addressValue}
                  placeholder={'No 25/1,Jambugasmulla,Nugegoda'}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, address: value});
                    setAddressValue(value);
                  }}
                />
              </Stack>

              {/* Year field */}
              <Stack>
                <TextField
                  lable={'Year'}
                  errors={'year' in errors}
                  value={year}
                  placeholder={'2012'}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, year: value});
                    setYear(value);
                  }}
                />
              </Stack>

              {/* Contact field */}
              <Stack>
                <TextField
                  lable={'Contact No'}
                  errors={'contact' in errors}
                  placeholder={'0123456789'}
                  keyboardTypeText={'numeric'}
                  value={String(contactValue)}
                  maxLengthValue={10}
                  onChangeTextProp={(value: any) => {
                    setData({...formData, contact: value});
                    setContactValue(value);
                  }}
                />
              </Stack>

              {/* images field */}
              <Stack>
                <FormControl.Label>Photos</FormControl.Label>
                <View style={styles.btnArea}>
                  {/* for front img */}

                  {!frontImageSource && (
                    <TouchableOpacity
                      onPress={() => {
                        //ImagePicker('frontImageBtn');
                        imageSelectionOnAction('frontImageBtn');
                      }}>
                      <View
                        style={[
                          styles.upload,
                          {height: backtImageSource ? 180 : 48},
                        ]}>
                        <Text style={styles.text}>Front Side Photo</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  {frontImageSource && (
                    <>
                      <View style={{width: 180, height: 180, margin: 5}}>
                        <Image
                          source={{uri: frontImageSource}}
                          style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}
                        />
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={frontHandleCancel}>
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../assets/icons/cancelBtn.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}

                  {/* for back img */}

                  {!backtImageSource && (
                    <TouchableOpacity
                      onPress={() => {
                        //ImagePicker('backImageBtn');
                        imageSelectionOnAction('backImageBtn');
                      }}>
                      <View
                        style={[
                          styles.upload,
                          {height: frontImageSource ? 180 : 48},
                        ]}>
                        <Text style={styles.text}>Back Side Photo</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  {backtImageSource && (
                    <>
                      <View
                        style={{
                          width: 180,
                          height: frontImageSource ? 180 : 'auto',
                          margin: 5,
                        }}>
                        <Image
                          source={{uri: backtImageSource}}
                          style={{
                            width: 180,
                            height: 180,
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}
                        />
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={backtHandleCancel}>
                          <Image
                            style={{width: 20, height: 20}}
                            source={require('../../assets/icons/cancelBtn.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
                {imgSourceModal()}
              </Stack>

              {/* btn field */}
              <Stack>
                <Buttons
                  btnColor={btnColor}
                  btnWidth={370}
                  btnName={btnText}
                  btnTextColor={btnTextColor}
                  onPress={() => {
                    onSubmit(setValues);
                  }}
                  svgPath={svgPath}
                />
              </Stack>
            </Stack>
          </FormControl>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default DataForm;

const styles = StyleSheet.create({
  contentBody: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'yellow',
    flexDirection: 'column',
    gap: 35,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: 'black',
    padding: 20,
  },
  cancelButton: {
    position: 'absolute',
    top: 5,
    right: 7,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  btnArea: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    backgroundColor: 'white',
  },
  upload: {
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 175,
  },
  text: {
    fontSize: 16,
    padding: 10,
    color: 'black',
  },
});
