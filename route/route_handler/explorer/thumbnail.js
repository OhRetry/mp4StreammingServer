const fs = require('fs');
const Readable = require('stream').Readable;

const extends_MIME = require(require.main.path + '/Utils/extends').extends_MIME;
const Setting = require(require.main.path + '/config/Setting');
const thumbnail_Manager = require(require.main.path + '/video_Process/thumbnail/thumbnail_Manager');


const MIME = extends_MIME['.jpg'];

module.exports = function(req,res){

    //remove /thumbnail/root/
    var realpath = Setting.root + req.url.substring(16,req.url.length);

    res.writeHead(200,{"Content-Type":MIME});
    var thumb_req = thumbnail_Manager.request(realpath);
    thumb_req.then(function(buf){     
        let Rstream = Readable.from(buf);
        Rstream.on('error',function(err){
            console.log("thumbnail stream read error")
        })
        .on('end',function(){
            res.end();
        })
      .pipe(res,{end:true});
    })

}
