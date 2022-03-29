import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../api/transaction.api';
import {Transaction} from '../models/Transaction';

const TransactionList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const hasTransactions = () => !isLoading && transactions.length > 0;

  const loadTransations = async () => {
    setIsLoading(true);

    try {
      const loadedTransactions = await api.fetchTransactions();
      setTransactions(loadedTransactions);

      Alert.alert('Conteúdo carregado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro: Não foi possível carregar o conteúdo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.App}>
      <ScrollView>
        {isLoading && <Text>Carregando...</Text>}

        {hasTransactions() &&
          transactions.map(transaction => {
            return (
              <View style={style.TransactionItem} key={transaction.date}>
                <Text style={style.Text}>{transaction.date}</Text>
                <Text style={style.Text}>Ammount: {transaction.ammount}</Text>
              </View>
            );
          })}

        <View style={style.BtnContainer}>
          <Button title={'Carregar conteúdo'} onPress={loadTransations} />
        </View>
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
  TransactionItem: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 20,
    padding: 20,
  },
  Text: {
    fontWeight: '300',
    marginTop: 6,
  },
  BtnContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginTop: 24,
  },
});

export default TransactionList;
