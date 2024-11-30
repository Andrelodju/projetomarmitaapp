import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { createTables } from './database/db';
import CadastroPedido from './components/CadastroPedido';
import CadastroProduto from './components/CadastroProduto';
import ListaClientes from './components/ListaClientes';
import NumeroPedidos from './components/NumeroPedidos';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cadastrar Pedido" component={CadastroPedido} />
          <Stack.Screen name="Cadastrar Produto" component={CadastroProduto} />
          <Stack.Screen name="Lista de Clientes" component={ListaClientes} />
          <Stack.Screen name="Número de Pedidos" component={NumeroPedidos} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Button title="Cadastrar Pedido" onPress={() => navigation.navigate('Cadastrar Pedido')} />
      <Button title="Cadastrar e Retirar Produtos" onPress={() => navigation.navigate('Cadastrar Produto')} />
      <Button title="Lista de Clientes" onPress={() => navigation.navigate('Lista de Clientes')} />
      <Button title="Número de Pedidos na Semana" onPress={() => navigation.navigate('Número de Pedidos')} />
    </View>
  );
};

export default App;