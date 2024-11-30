import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import db from '../database/db';

const CadastroPedido = () => {
  const [nome, setNome] = useState('');
  const [produto, setProduto] = useState('');
  const [endereco, setEndereco] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [opcoes, setOpcoes] = useState('');

  const handleSubmit = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO pedidos (nome, produto, endereco, forma_pagamento, opcoes, data) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, produto, endereco, formaPagamento, opcoes, new Date().toISOString()],
        () => {
          console.log('Pedido cadastrado com sucesso!');
        },
        error => {
          console.error('Erro ao cadastrar pedido: ', error);
        }
      );
    });
  };

  return (
    <View>
      <TextInput placeholder="Nome do Cliente" value={nome} onChangeText={setNome} />
      <TextInput placeholder="Produto" value={produto} onChangeText={setProduto} />
      <TextInput placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput placeholder="Forma de Pagamento" value={formaPagamento} onChangeText={setFormaPagamento} />
      <TextInput placeholder="Opções (opcional)" value={opcoes} onChangeText={setOpcoes} />
      <Button title="Cadastrar Pedido" onPress={handleSubmit} />
    </View>
  );
};

export default CadastroPedido;