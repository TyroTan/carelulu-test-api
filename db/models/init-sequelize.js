const pg = require("pg");
const Sequelize = require("sequelize");

const NoteClass = require("./NoteClass");
const { PG_DATABASE, PG_USER, PG_HOST, PG_PORT, PG_PASSWORD } = require("../config");

const sequelize = new Sequelize(
  `${PG_DATABASE}`,
  `${PG_USER}`,
  `${PG_PASSWORD}`,
  {
    dialect: "postgres",
    host: `${PG_HOST}`,
    port: `${PG_PORT}`,
    logging: false,
    // logging: rawQuery => {
    //   console.log("loggger23123", rawQuery);
    // },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci"
    },
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      handleDisconnects: true
    },
    dialectOptions: {
      requestTimeout: 100000
    }
  }
);

const Note = NoteClass({
  sequelize,
  Sequelize
});

module.exports = {
  Note,
  sequelize,
  Sequelize
};
