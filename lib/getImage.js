var log = require('debug')('images-spider-img');
var path = require('path');
var request = require('request');
var url = require('url');
var fs =  require('fs');
var _ = require('lodash');
var number = 0;
var queue = [];
module.exports =  function (dest) {
    dest = !dest ? process.cwd() : dest;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    return function ($) {
        $('img').each(function(index,img) {
            var imgurl = $(img).attr('src');
            if (url.parse(imgurl).protocol === null || _.indexOf(queue,imgurl) !== -1) {
                return;
            }

            log('imgurl %s',imgurl);
            var ext = path.extname(imgurl);
            var out = path.join(dest,number+ext);
            request.get(imgurl)
                .on('error',function(err){
                 console.log(err);
                })
                .pipe(fs.createWriteStream(out));
            number++;
            queue.push(imgurl);
        });
    }
};