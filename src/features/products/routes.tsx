import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductDetail from './pages/ProductDetail';
import ProductList from './pages/ProductList';
import TransactionList from './pages/TransactionList';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transações" component={TransactionList} />
      <Stack.Screen name="Produtos" component={ProductList} />
      <Stack.Screen name="Detalhe" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default Routes;
