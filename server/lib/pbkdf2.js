const pbkdf2 = require('pbkdf2')

const salt = (code) => {
    //加盐方式 = 时间
    let date = new Date().getTime()
    let derivedKey = pbkdf2.pbkdf2Sync(code, date.toString(), 10000, 16, 'sha512')
    return derivedKey.toString('base64')
}

module.exports = {
    salt
}