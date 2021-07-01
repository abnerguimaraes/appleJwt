"use strict";

const jwt =    require('jsonwebtoken');
const fs =     require('fs');
const { token } = require('apn');

module.exports = TtJwt;

var fileToken = "";
var hourNow   = new Date().getTime();
var tokenHour = "";
const version = "1.0";
var secretKey = fs.readFileSync("AuthKey_49762PN3A2.p8");

var opt = {
    algorithm: "ES256"
}

var now = new Date();
var epoch = Math.round(now.getTime() / 1000);

var setToken = function(){
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

    fs.writeFile("token/token.jwt", apnsToken, function(err){
        if (err){
            console.log(`TtTJwt.setNewToken().error - error trying to set token on file`);
        }else{
            console.log(`TtTJwt.setNewToken().sucess`);
            return apnsToken;
        }
    })
    
}

var setHoraToken = function(){
    var hourString = hourNow.toString();
    fs.writeFile("token/time.json", hourString, function(err){
        if (err){
            console.log(`TtTJwt.setHoraToken().error - error trying to set time on file`);
        }else{
            console.log(`TtTJwt.setHoraToken().sucess`);
            return setToken();
        }
    })
}

var getHoraToken = function(){
    fs.readFile("token/time.json", "utf-8", function(err, data){
        if (err){
            console.log(`TtTJwt.getHoraToken().error - ${err}`);
        }else{
            tokenHour = data;
            console.log(`TtTJwt.getHoraToken().sucess ${tokenHour}`);

            if((parseInt(tokenHour) + 1800000) > hourNow){
                return validaToken();
            }else{
                console.log("teste invalido");
                setHoraToken();
            }

            return tokenHour;
        }
    });
}

var validaToken = function(){
    fs.readFile("token/token.jwt", "utf-8", function(err, data){
        if (err){
            console.log(`TtTJwt.validaToken().error - ${err}`);
        }else{
            fileToken = data;
            console.log(`TtTJwt.validaToken().sucess ${fileToken}`);
            return fileToken;
        }
    });
}

function TtJwt(){
    this.getToken = function(){
        getHoraToken();
    }
}