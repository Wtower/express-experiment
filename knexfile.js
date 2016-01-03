// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.dev.sqlite3'
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'sqlite3',
    connection: {
      filename: './db.dev.sqlite3'
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './db.dev.sqlite3'
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
