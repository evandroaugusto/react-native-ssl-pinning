import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const ProductList = () => {
  return (
    <SafeAreaView style={style.App}>
      <Text> Detalhe produto </Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  App: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default ProductList;
