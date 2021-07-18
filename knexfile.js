module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/db/database.sqlite3',
    },
    migrations: {
      directory: './server/db/migrations',
    },
    seeds: {
      directory: './server/db/seeds',
    },
    useNullAsDefault: true,
  },

};
