const pbkdf2 = require('pbkdf2')

const salt = (code) => {
    //加盐方式 = 时间
    //let date = new Date().getTime() 没办法解密
    //钥匙
    let data = 'xx'
    let derivedKey = pbkdf2.pbkdf2Sync(code, data, 10000, 16, 'sha512')
    return derivedKey.toString('base64')
}

module.exports = {
    salt
}