var log = require('debug')('images-spider-url');
var url = require('url');
var _ = require('lodash');
var queue = [];
module.exports = function (seed) {
    queue.push(seed);
    allow_domain = url.parse(seed);
    return function ($,spider) {
        $('a').each(function(index, a) {
            f = url.parse($(a).attr('href'));
            if(!f.protocol && (f.host == null || f.host == allow_domain.host)) {
                f.host = allow_domain.host;
                f.protocol = allow_domain.protocol;
                var toQueue = url.format(f);
                if (_.indexOf(queue,toQueue) === -1) {
                    log('url add to queue %s',toQueue);
                    spider.queue(toQueue);
                    queue.push(toQueue);
                }
            }
        });
    }
};