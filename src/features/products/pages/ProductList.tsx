import React, {useEffect, useState} from 'react';
import {
  Button,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../api/products.api';
import {Product} from '../models/Product';

const ProductList = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const hasProducts = () => !isLoading && products.length > 0;

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      const loadedProducts = await api.fetchProducts();
      setProducts(loadedProducts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goDetails = () => {
    navigation.navigate('Transações');
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <SafeAreaView style={style.App}>
      <ScrollView>
        {isLoading && <Text>Carregando...</Text>}

        {hasProducts() &&
          products.map(product => {
            return (
              <View style={style.ProductItem} key={product.id}>
                <ImageBackground
                  resizeMode="contain"
                  style={style.Image}
                  source={{uri: `${product.image}`}}
                />
                <Text style={style.ProductTitle}>{product.title}</Text>

                <Button onPress={goDetails} title="Ver detalhes" />
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  App: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',
    margin: 20,
  },
  ProductTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
  },
  ProductItem: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 20,
    padding: 20,
  },
  Image: {
    width: '100%',
    height: 200,
  },
  Button: {
    marginTop: 12,
  },
});

export default ProductList;
