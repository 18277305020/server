const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: 'localhost',
        user: 'wanhuatong',
        password: 'wanhuatong',
        database: 'wanhuatong_db'
    },

});

module.exports = {knex}