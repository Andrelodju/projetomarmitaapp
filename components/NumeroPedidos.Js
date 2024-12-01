// components/NumeroPedidos.js
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import db from '../database/db';

const NumeroPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT produto, forma_pagamento, COUNT(*) as quantidade FROM pedidos GROUP BY produto, forma_pagamento',
          [],
          (_, { rows }) => {
            const pedidosArray = [];
            for (let i = 0; i < rows.length; i++) {
              pedidosArray.push(rows.item(i));
            }
            setPedidos(pedidosArray);
          },
          error => {
            console.error('Erro ao buscar pedidos: ', error);
          }
        );
      });
    };

    fetchPedidos();
  }, []);

  return (
    <View style={{ padding : 16 }}>
      <FlatList
        data={pedidos}
        keyExtractor={item => item.produto + item.forma_pagamento}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Content>
              <Title>{item.produto}</Title>
              <Paragraph>Forma de Pagamento: {item.forma_pagamento}</Paragraph>
              <Paragraph>Quantidade: {item.quantidade}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default NumeroPedidos;
