module.exports = CallEmsg;


    var startCall = function(){

        const https = require('https');

        const data = JSON.stringify({
            "service": "notifyUser",
            "request": {
                "systemKey": "a5a027ab91baf4753c84680aad1f3584378029431fd74e2ddf5d9cc300199a556c50ea5a381bff02340fe3d2df9e3292b017d73d8466461ff88adf347f0cdc14",
                "user": "9953812",
                "message": {
                    "message": "Teste do Abner Individual"
                }
            }
        })

        const options = {
        hostname: '10.194.69.76',
        port: 55041,
        path: '/storkServerApi',
        method: 'POST',
        rejectUnauthorized: false,
        headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()

    }

    
function CallEmsg(){

    this.callIt = function(){
        startCall();
    }
}

