const http = require('http')

const api = (data) => {
    return new Promise((resolve, reject) => {
        data = data ? JSON.stringify(data) : ''
        let opt = {
            host: 'localhost',
            port: '8000',
            method: 'GET',
            path: '/',
            headers: {
                "Content-Type": 'application/json'
            }
        }

        let body = '';
        let req = http.request(opt, (res) => {
            res.on('data', (data) => {
                body += data;
            }).on('end', () => {
                resolve(body)
            })
        }).on('error', (e) => {
            console.log("error: " + e.message);
            reject(e)
        })

        req.write(data);
        req.end()
    })
}

module.exports = {api}
