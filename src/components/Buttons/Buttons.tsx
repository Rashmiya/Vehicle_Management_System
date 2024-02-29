import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, Text, View} from 'native-base';
import Svg, {Path} from 'react-native-svg';
const Buttons = (props: any) => {
  const dynamicStyle = {
    btn: {
      width: props.btnWidth,
    },
    btnText: {
      color: props.btnTextColor,
      fontSize: 20,
    },
  };
  return (
    <Button
      shadow={2}
      size={props.size}
      backgroundColor={props.btnColor}
      style={dynamicStyle.btn}
      onPress={props.onPress}>
      <View style={styles.btnContainer}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={styles.svg}
          fill={props.btnTextColor}
          viewBox="0 0 30 30"
          {...props}>
          <Path d={props.svgPath} />
        </Svg>
        <Text style={dynamicStyle.btnText}>{props.btnName}</Text>
      </View>
    </Button>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  svg: {
    width: 30,
    height: 30,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
