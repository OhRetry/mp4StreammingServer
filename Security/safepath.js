const urlencode = require('urlencode');

module.exports = function(req,res,next){
    //for decoding urlencoding
    req.url = urlencode.decode(req.url);
    //for security remove ../ 
    req.url = req.url.replace(/\.\.\//g, '');

    next();
}