// Update with your config settings.
module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            database: 'wanhuatong_db',
            user: 'wanhuatong',
            password: 'wanhuatong'
        },
        migrations: {
            directory: "./server/module/migrations"
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'wanhuatong_db',
            user: 'wanhuatong',
            password: 'wanhuatong'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./server/module/migrations"
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'wanhuatong_db',
            user: 'wanhuatong',
            password: 'wanhuatong'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./server/module/migrations"
        }
    }
};
