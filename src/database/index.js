// import SQLite from "react-native-sqlite-storage";
import * as SQLite from 'expo-sqlite';

const database_name = "crypto.db";
export const db = SQLite.openDatabase(database_name);

export default class Database {
  initDatabase() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists Cryptocurrencies (id, name, priceUsd, changePercent24Hr)"
      );
      tx.executeSql(
        "create table if not exists Favourites (id, name, priceUsd, changePercent24Hr)"
      );
    });
  }

  getAllCryptocurrencies = async () => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(
        "select * from Cryptocurrencies",
        null,
        (_, { rows: { _array } }) => resolve(_array),
        reject
      );
    }))
  }

  getFavouritesCryptocurrencies = async () => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(
        "select * from Favourites",
        null,
        (_, { rows: { _array } }) => resolve(_array),
        reject
      );
    }))
  }

  saveCryptocurrencies(data) {
    db.transaction(tx => {
      data.map(e => {
        tx.executeSql("insert or replace into Cryptocurrencies (id, name, priceUsd, changePercent24Hr) values (?, ?, ?, ?)",
          [e.id, e.name, e.priceUsd, e.changePercent24Hr],
          () => console.log('success'),
          () => console.log('error')
        );
      })
    });
  }

  addFavourite(currency) {
    console.log(currency)
    db.transaction(tx => {
      tx.executeSql("insert or replace into Favourites (id, name, priceUsd, changePercent24Hr) values (?, ?, ?, ?)",
        [currency.id, currency.name, currency.priceUsd, currency.changePercent24Hr],
        () => console.log('success'),
        () => console.log('error')
      );
    });
  }
};

export const database = new Database();
