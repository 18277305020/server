
exports.up = function(knex, Promise) {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').then(function () {
        return knex.schema.createTable("uploadUrl",table=>{
            table.uuid("uid").unique().primary().defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("url");
        })
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("uploadUrl");
};
