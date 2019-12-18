const {psql} = require("./knex");

const list = (table, params) => {
    return psql(table).where(params)
}

const up = (table, params) => {
    return psql(table).insert(params).returning("*");
}


module.exports = {
    list,
    up
};
