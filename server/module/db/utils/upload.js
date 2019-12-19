const {knex} = require("../knex");
const table = 'uploadUrl'

const setUrl = (params) => {
    return knex(table).insert(params).returning("*")
}

const getUrl = (params) => {
    return knex(table).where(params)
}

module.exports = {
    setUrl,
    getUrl
};
