#!/usr/bin/env node
var program = require('commander');
var config = require('./package.json');
program
    .version(config.version)
    .description(config.description)
    .usage('<url>')
    .option('-o, --out <path>', 'image output path')
    .option('-d, --debug', 'output debug message')
    .option('-c, --maxConnections <number>', 'how many Connections you like default 10')
    .parse(process.argv);

if(program.debug)
{
    process.env.DEBUG = 'images-spider*';
}

var Crawler = require("crawler");
var img = require('./lib/getImage')(program.out);
var url = require('./lib/url')(program.args[0]);
var mc = program.maxConnections;
mc = !mc ? 10 : mc;
var c = new Crawler({
    maxConnections : mc,
    callback : function (error, result, $) {
        if(error) {
            console.log(error);
            return;
        }
        if($ !== undefined)
        {
            url($,c);
            img($);
        }
    }
});
c.queue(program.args[0]);

