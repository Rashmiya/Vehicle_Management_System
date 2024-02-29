//import {StyleSheet} from 'react-native';
import React from 'react';
import {FormControl, Input} from 'native-base';

const TextField = (props: any) => {
  const {
    lable,
    errors,
    placeholder,
    onChangeTextProp,
    keyboardTypeText,
    maxLengthValue,
    value,
  } = props;
  return (
    <FormControl isRequired isInvalid={errors}>
      <FormControl.Label
        _text={{
          bold: true,
        }}>
        {lable}
      </FormControl.Label>
      <Input
        placeholder={placeholder}
        keyboardType={keyboardTypeText}
        onChangeText={onChangeTextProp}
        maxLength={maxLengthValue}
        value={value}
      />
      {errors ? (
        <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText />
      )}
    </FormControl>
  );
};

export default TextField;

//const styles = StyleSheet.create({});
