import React from 'react';
import {Input, NativeBaseProvider, VStack} from 'native-base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
export default function SearchBar() {
  return (
    <NativeBaseProvider>
      <VStack my="4" space={5} w="100%" maxW="300px">
        <VStack w="100%" space={5} alignSelf="center">
          <Input
            placeholder="Search"
            variant="filled"
            width={
              Dimensions.get('window').width > 500 ? wp('170%') : wp('93%')
            }
            borderRadius="10"
            height="45"
            backgroundColor={'#D9D9D9'}
            py="1"
            px="2"
            onChangeText={e => {
              console.log(e);
            }}
            // InputLeftElement={
            //   <Icon
            //     ml="2"
            //     size="4"
            //     color="gray.400"
            //     as={<Ionicons name={require('./path/to/your/icon.png')} />}
            //   />
            // }
          />
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
}
