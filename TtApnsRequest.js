"use strict";

const ttJwt = require('./TtJwt');
const http2 = require('http2');
const fs    = require( 'fs');


const args = process.argv;
const environment = args[2];
const corpo       = args[3];
const device      = ["5ea5b9f0f99d5db23ba86e425df1fee26c1f465e06cd0574255ab956870078ae", "b241ea5e15670d1d4093c49c9c5e3a79890e1f646ca4d71af008018f7eb1a98f"] //args[4];

var topic = "";
var body = "";

var tortoJwt = new ttJwt();

if (environment == "th"){
    topic = "br.com.bradesco.link.tu";
}else{
    topic = "br.com.bradesco.link.pr";
}

if (corpo && corpo != undefined && corpo != ""){
    body = copo;
}else{
    body = {
        "aps": {
            "alert": "hello",
            "content-available": 1
        }
    }
}

tortoJwt.getToken();

fs.readFile("token/token.jwt", "utf-8", function(err, data){
    data;
    callApns(data)
});



var callApns = function(bearerToken){
    
    console.log(`"TtApnsRequest() - about to send.... '${bearerToken}' to ${device.length} devices.`)

    var client = http2.connect('https://api.push.apple.com');

    client.on('error', (err) => console.error(err));
    client.on('socketError', (err) => console.error(err));

    if (device.length > 0){
        for (var i = 0; i < device.length; i++){    

            var request = {
                ':method' : 'POST',  
                ':scheme' : 'https',  
                ':path' : `/3/device/${device[i]}`,
                'authorization' : `bearer ${bearerToken}`,
                'content-type' : '',
                'apns-topic': topic
            };

            var req = client.request(request);

            req.on('response', (headers, flags) => {
                for (const name in headers) {
                    if(name === ':status') {
                        console.log(`Returned: ${name}: ${headers[name]}`);
                    }
                    console.log(name);
                }
            });

            req.on('error', function(err) {
                console.log(err);
            });

            req.setEncoding('utf8');
            let outdata = '';

            req.on('data', (chunk) => { outdata += chunk; });

            req.on('end', () => {
                console.log("End...");
            });

            req.write(JSON.stringify(body));
            req.end();
        }
    } else{
        console.log("TtApnsRequest() - No devices providen");
    }

}