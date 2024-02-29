//import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CheckIcon, FormControl, Select, WarningOutlineIcon} from 'native-base';

const Selector = (props: any) => {
  const {errors, lable, placeholder, items, onChangeTextProp, value} = props;
  return (
    <FormControl w="3/4" maxW="300" isRequired isInvalid={errors}>
      <FormControl.Label
        _text={{
          bold: true,
        }}>
        {lable}
      </FormControl.Label>
      <Select
        minWidth="370"
        accessibilityLabel="Choose Service"
        placeholder={placeholder}
        selectedValue={value}
        _selectedItem={{
          bg: 'teal.600',
          endIcon: <CheckIcon size={5} />,
        }}
        mt="1"
        onValueChange={onChangeTextProp}>
        {items.map((item: any, index: number) => (
          <Select.Item key={index} label={item.label} value={item.value} />
        ))}
      </Select>
      {errors && (
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Please make a selection!
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};

export default Selector;

//const styles = StyleSheet.create({});
