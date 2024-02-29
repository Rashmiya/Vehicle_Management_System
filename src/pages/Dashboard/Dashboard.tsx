import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Button, FormControl, Input, Link} from 'native-base';
import {NativeBaseProvider} from 'native-base';
// import {AllCars} from '../AllCars/AllCars';
const Dashboard = ({navigation}: any) => {
  const [opacity, setOpacity] = useState(1);
  const [modalVisible, setModalVisible] = useState('dashboard');

  const openSignInModel = () => {
    const newOpacity = opacity === 1 ? 0.2 : 1;
    setOpacity(newOpacity);
    setModalVisible('signInModel');
  };
  const openSignUpModel = () => {
    setModalVisible('signUpModel');
  };
  const openSignInModelFromSignUP = () => {
    setModalVisible('signInModel');
  };
  function closeSignInModal(): void {
    setOpacity(1);
    setModalVisible('dashboard');
  }
  function closeSignUpModal(): void {
    setOpacity(1);
    setModalVisible('dashboard');
  }
  function signInOnAction(): void {
    setModalVisible('dashboard');
    navigation.navigate('MyTabs');
  }

  return (
    <NativeBaseProvider>
      <View style={styles.background}>
        <View style={[styles.textContainer, {opacity}]}>
          <Text style={styles.textOne}>CAR</Text>
          <Text style={styles.textTwo}>Connect</Text>
        </View>

        <View style={[styles.textContainer, {opacity}]}>
          <Text style={styles.descText}>
            Best Car Buying And Selling Platform
          </Text>
        </View>
        <View style={[styles.imgArea, {opacity}]}>
          <Image
            style={styles.img}
            source={require('../../assets/Images/cars/v12.png')}
          />
        </View>
        <Button onPress={() => openSignInModel()} style={styles.btn}>
          <Text style={{color: 'black', fontSize: 20}}>Explore Now</Text>
        </Button>

        {/* sign in model area */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === 'signInModel' ? true : false}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sign in to continue!</Text>
              <Button
                onPress={() => closeSignInModal()}
                style={styles.closeImgArea}>
                <Image source={require('../../assets/icons/closeBtn.png')} />
              </Button>

              {/* inputs */}
              <View style={styles.signInInputArea}>
                <FormControl>
                  <FormControl.Label>Username or Email</FormControl.Label>
                  <Input placeholder="example@abc.com" />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input type="password" placeholder="***********" />
                  <Link
                    _text={{
                      fontSize: 'xs',
                      fontWeight: '500',
                      color: '#3669EC',
                    }}
                    alignSelf="flex-end"
                    mt="1">
                    Forget Password?
                  </Link>
                </FormControl>
                <Button
                  mt="2"
                  style={styles.signInBtn}
                  onPress={() => signInOnAction()}>
                  <Text style={styles.signInBtnTxt}>Sign in</Text>
                </Button>

                <View style={styles.signUpTxtArea}>
                  <Text style={styles.signUpTxt}>I'm new user.</Text>
                  <Link
                    _text={{
                      fontSize: '16',
                      color: '#3669EC',
                    }}
                    onPress={() => openSignUpModel()}>
                    Sign up
                  </Link>
                </View>

                <View style={styles.separatorArea}>
                  <View style={styles.separator} />
                  <View>
                    <Text style={styles.separatorTxt}>or connect using</Text>
                  </View>
                  <View style={styles.separator} />
                </View>
                <View style={styles.signInOptions}>
                  <Image
                    style={styles.gmail}
                    source={require('../../assets/icons/gmail.png')}
                  />
                  <Image source={require('../../assets/icons/fb.png')} />
                </View>
              </View>
            </View>
          </View>
        </Modal>

        {/* sign up model area */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible === 'signUpModel' ? true : false}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sign up to continue!</Text>
              <Button
                onPress={() => closeSignUpModal()}
                style={styles.closeImgArea}>
                <Image source={require('../../assets/icons/closeBtn.png')} />
              </Button>

              {/* inputs */}
              <View style={styles.signUpInputArea}>
                <FormControl>
                  <FormControl.Label>Username or Email</FormControl.Label>
                  <Input placeholder="example@abc.com" />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input type="password" placeholder="***********" />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input type="password" placeholder="***********" />
                </FormControl>
                <Button mt="2" style={styles.signUpBtn}>
                  <Text style={styles.signInBtnTxt}>Sign up</Text>
                </Button>

                <View style={styles.signUpTxtArea}>
                  <Text style={styles.signUpTxt}>I'm already user.</Text>
                  <Link
                    _text={{
                      fontSize: '16',
                      color: '#3669EC',
                    }}
                    onPress={() => openSignInModelFromSignUP()}>
                    Sign in
                  </Link>
                </View>
                <View style={styles.separatorArea}>
                  <View style={styles.separator} />
                  <View>
                    <Text style={styles.separatorTxt}>or connect using</Text>
                  </View>
                  <View style={styles.separator} />
                </View>
                <View style={styles.signInOptions}>
                  <Image
                    style={styles.gmail}
                    source={require('../../assets/icons/gmail.png')}
                  />
                  <Image source={require('../../assets/icons/fb.png')} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </NativeBaseProvider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: '30%',
  },
  textOne: {
    color: '#EEBC4F',
    fontSize: 36,
  },
  textTwo: {
    color: '#8A7D7D',
    fontSize: 36,
  },
  descText: {
    flexDirection: 'row',
    top: 30,
    color: '#8A7D7D',
    fontSize: 18,
  },
  imgArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  img: {
    marginLeft: 50,
    height: 250,
    width: 450,
  },
  btn: {
    width: '60%',
    backgroundColor: '#DFAD41',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginLeft: '20%',
    bottom: '20%',
  },
  modalArea: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: 'auto',
  },
  loginArea: {
    backgroundColor: 'white',
    width: '100%',
    height: '45%',
    border: '1px solid black',
    bottom: 1,
  },
  closeImgArea: {
    backgroundColor: 'transparent',
    width: '10%',
    flexDirection: 'row',
    bottom: 20,
    left: 175,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 310,
    marginBottom: 'auto',
  },
  modalView: {
    margin: 5,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 500,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#807B7B',
    fontSize: 18,
    top: 10,
    textAlign: 'center',
  },
  inputs: {
    width: 350,
    color: '#585454',
  },
  signInInputArea: {
    backgroundColor: 'transparent',
    width: 350,
    flex: 0.5,
    alignItems: 'center',
  },
  signUpInputArea: {
    backgroundColor: 'transparent',
    width: 350,
    flex: 0.5,
    alignItems: 'center',
    bottom: 20,
  },
  signInBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    marginTop: 30,
  },
  signUpBtn: {
    backgroundColor: '#F9C86A',
    color: 'red',
    width: '100%',
    marginTop: 15,
  },
  signInBtnTxt: {
    color: '#2E2D2D',
    fontSize: 16,
  },
  signUpTxtArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: '6%',
  },
  signUpTxt: {
    color: '#6E6A6A',
    fontSize: 16,
  },
  signUpLink: {
    color: '#3669EC',
    fontSize: 18,
  },
  separatorArea: {
    flexDirection: 'row',
    alignItems: 'center',
    top: '10%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  separatorTxt: {
    color: 'black',
    fontSize: 14,
    width: 150,
    textAlign: 'center',
  },
  signInOptions: {
    flexDirection: 'row',
    margin: '15%',
  },
  gmail: {
    marginRight: '10%',
  },
});
