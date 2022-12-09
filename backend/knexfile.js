// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'inventory_db',
      user:     'postgres',
      password: 'docker',
      port: '5432',
      host: '127.0.0.1'
    }
  },

  production:{
    client:'postgresql',
    connection:process.env.DATAbASE_URL+'?ssl=no-verify',
    pool:{
      min:2,
      max:10
    },
    migrations:{
      directory: './migrations'
    },
    seeds:{
      directory:'./seeds'
    }
  }
  

// production use will reengage after development
// ,
//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }

};
