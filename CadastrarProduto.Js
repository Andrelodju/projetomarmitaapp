// components/CadastroProduto.js
import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import db from '../database/db';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = () => {
    if (!nome || !preco) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
        [nome, parseFloat(preco)],
        () => {
          alert('Produto cadastrado com sucesso!');
          setNome('');
          setPreco('');
        },
        error => {
          console.error('Erro ao cadastrar produto: ', error);
          alert('Erro ao cadastrar produto.');
        }
      );
    });
  };

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Title>Cadastrar Produto</Title>
          <Paragraph>Preencha os dados do produto abaixo:</Paragraph>
          <TextInput
            label="Nome do Produto"
            value={nome}
            onChangeText={setNome}
            style={{ marginBottom: 10 }}
          />
          <TextInput
            label="Preço"
            value={preco}
            onChangeText={setPreco}
            keyboardType="numeric"
            style={{ marginBottom: 10 }}
          />
          <Button mode="contained" onPress={handleSubmit}>
            Cadastrar Produto
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CadastroProduto;