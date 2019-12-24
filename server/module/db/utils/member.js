const {knex} = require("../knex");
const table = 'user'

const getCount = (params) => {
    return knex(table).where(params).count()
}

const findList = (params, page, size) => {
    return knex(table).where(params).limit(size).offset((page - 1) * size)
}

const findRepeat = params => {
    return knex(table).where(params)
}

const createMember = params => {
    return knex(table).insert(params).returning("*")
}

const removeById = params => {
    return knex(table).where(params).del()
}

module.exports = {
    findList,
    findRepeat,
    createMember,
    getCount,
    removeById,
};
