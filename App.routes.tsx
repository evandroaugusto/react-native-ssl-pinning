import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

// modules
import {ProductsModule} from './src/features/products/index.module';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Products" component={ProductsModule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
