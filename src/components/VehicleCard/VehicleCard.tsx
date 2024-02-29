/* eslint-disable react-hooks/exhaustive-deps */

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Svg, {Path} from 'react-native-svg';
import AWS from 'aws-sdk';
import {ACCESS_KEY, SECRET_ACCESS_KEY} from '@env';
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});
const s3 = new AWS.S3();
const VehicleCard = (props: any) => {
  const [selected, setSelected] = useState(false);
  const [imgUri, setImgUri] = useState('');

  const toggleSelection = () => {
    setSelected(!selected);
  };
  useEffect(() => {
    const imageName = props.data.arrayOfFilesName[0];
    getImageFromS3(imageName);
  }, []);
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
        setImgUri(tempImgUri);
      }
    });
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.mainArea}
        onPress={() => {
          props.viewVehicle();
        }}>
        <TouchableOpacity onPress={toggleSelection}>
          <View style={styles.container}>
            <Svg
              width={25}
              height={25}
              viewBox="0 0 24 24"
              fill={selected ? '#32ff7e' : 'none'}
              stroke={selected ? '#32ff7e' : '#4b4b4b'}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.heartIcon}>
              <Path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                fillRule="evenodd"
              />
            </Svg>
          </View>
        </TouchableOpacity>
        <View style={styles.imgArea}>
          {imgUri && (
            <Image
              style={styles.img}
              source={{uri: imgUri}}
              //onError={error => console.error('Image Error:', error)}
            />
          )}
        </View>
        <View style={styles.detailsArea}>
          <View style={styles.detailsItem}>
            <Text style={styles.nameTxt}>
              {props.data.brand} - {props.data.model}
            </Text>
            <Text style={styles.dateTxt}>
              Listed: {new Date(props.data.date).toLocaleDateString()}
            </Text>
            <Text style={styles.addressTxt}>{props.data.address}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.priceTxt}>Rs. {props.data.price}.00</Text>
            <Text />
            <View style={styles.millageArea}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill={'#7B7777'}
                data-name="Layer 1"
                viewBox="0 0 24 24"
                {...props}>
                <Path d="M19.976 4.046C17.399 1.744 14.078.69 10.614 1.078 5.206 1.688.784 6.061.1 11.478c-.481 3.806.799 7.516 3.512 10.178a4.665 4.665 0 0 0 3.286 1.345h10.211c1.204 0 2.317-.427 3.135-1.203a11.95 11.95 0 0 0 3.757-8.747 12.09 12.09 0 0 0-4.024-9.004Zm-.421 17.026c-.631.598-1.5.928-2.446.928H6.897a3.667 3.667 0 0 1-2.585-1.058C1.823 18.5.649 15.096 1.092 11.603c.628-4.964 4.679-8.973 9.634-9.531.433-.049.862-.073 1.289-.073 2.701 0 5.254.97 7.294 2.793A11.085 11.085 0 0 1 23 13.05c0 3.063-1.224 5.913-3.445 8.022Zm-.44-5.496-5.14-2.256A2.002 2.002 0 0 0 12.001 11c-1.103 0-2 .897-2 2s.897 2 2 2c.636 0 1.204-.299 1.571-.764l5.141 2.257a.5.5 0 1 0 .402-.916ZM12.001 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7.517-1.001a.5.5 0 0 1-.532-.466C18.746 8.869 15.677 6 12.002 6c-3.859 0-7 3.141-7 7 0 1.941.817 3.812 2.241 5.134a.499.499 0 1 1-.68.732A8.023 8.023 0 0 1 4.001 13c0-4.411 3.589-8 8-8 4.201 0 7.707 3.28 7.982 7.467a.5.5 0 0 1-.466.532Z" />
              </Svg>
              <Text style={styles.milTxt}> {props.data.mileage}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VehicleCard;

const styles = StyleSheet.create({
  mainArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    height: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  imgArea: {
    backgroundColor: 'white',
    height: 110,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 110,
  },
  priceTxt: {
    color: '#E84E4E',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nameTxt: {
    color: '#363434',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dateTxt: {
    color: '#7B7777',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addressTxt: {color: '#7B7777', fontWeight: 'bold', fontSize: 16},
  milTxt: {
    color: '#7B7777',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailsArea: {
    flexDirection: 'row',
    // gap: 90,
    textAlign: 'left',
    width: '100%',
  },
  detailsItem: {
    width: '50%',
    textAlign: 'left',
    paddingLeft: 25,
  },
  container: {
    left: 150,
    position: 'absolute',
  },
  heartIcon: {
    marginRight: 5,
  },
  millageArea: {
    flexDirection: 'row',
  },
});
