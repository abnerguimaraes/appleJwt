"use strict";

const jwt =    require('jsonwebtoken');
const fs =     require('fs');
const { token } = require('apn');

module.exports = TtJwt;

var fileToken = "";
var hourNow   = new Date().getTime();
var tokenHour = "";


function TtJwt(){

    const version = "1.0";
    var secretKey = fs.readFileSync("AuthKey_49762PN3A2.p8");

    var opt = {
        algorithm: "ES256"
    }

    var now = new Date();
    var epoch = Math.round(now.getTime() / 1000);

    this.getToken = function(){
        var apnsToken = jwt.sign(
            {
                "iss": "PK9554KK9W",
                "iat": epoch
            },
            secretKey,
            {
                header: {
                    "alg": "ES256",
                    "kid": "49762PN3A2"
                }

            }

        );
        console.log(`TtTJwt.setToken().success - ${apnsToken}`);
        return apnsToken;        
    }
}