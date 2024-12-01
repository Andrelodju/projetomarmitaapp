// components/ListaClientes.js
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import db from '../database/db';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM pedidos ORDER BY data ASC',
          [],
          (_, { rows }) => {
            const clientesArray = [];
            for (let i = 0; i < rows.length; i++) {
              clientesArray.push(rows.item(i));
            }
            setClientes(clientesArray);
          },
          error => {
            console.error('Erro ao buscar clientes: ', error);
          }
        );
      });
    };

    fetchClientes();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        data={clientes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.nome}</Title>
              <Paragraph>{item.data}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default ListaClientes;
