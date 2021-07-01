"use strict";

const TtEmsg = require('./TtCallEmsg');
const http2 = require('http2');
const fs    = require( 'fs');

var ttEmsg = new TtEmsg();

setInterval(function(){
    ttEmsg.callIt();
}, 60000);
