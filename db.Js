import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'marmitas.db',
    location: 'default',
  },
  () => {},
  error => {
    console.error(error);
  }
);

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, produto TEXT, endereco TEXT, forma_pagamento TEXT, opcoes TEXT, data TEXT)',
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, preco REAL)',
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data_pedido TEXT)',
    );
  });
};

export default db;