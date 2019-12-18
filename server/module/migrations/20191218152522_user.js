
exports.up = function(knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
        return knex.schema.createTable("user",table=>{
            table.uuid("uid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("username");
            table.string("password");
        })
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("user");
};
