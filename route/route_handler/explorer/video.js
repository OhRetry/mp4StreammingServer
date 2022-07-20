const fs = require('fs');
const path = require('path')

const Setting = require(require.main.path + '/config/Setting');

module.exports = function (req, res) {

    //remove /video/root/
    const realpath = Setting.root + req.url.substring(12, req.url.length);
    const range = req.headers.range;

    fs.stat(realpath, function (err, stats) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end();
            return;
        }
        if (range) {
            const range_splited = range.replace(/bytes=/, '').split('-')
            const start = parseInt(range_splited[0]);
            const end = range_splited[1] ? parseInt(range_splited[1]) : stats.size - 1;
            const VideoStream = fs.createReadStream(realpath, { start, end });
            res.writeHead(206, {
                'Content-Type': 'video/mp4',
                'Content-Range': 'bytes ' + start + '-' + end + '/' + stats.size,
                'Content-Length': end - start + 1,
                'Accept-Ranges': 'bytes'
            })
            VideoStream.pipe(res);
        }
        else {                      
            res.writeHead(200, {
                'Content-Type': 'video/mp4',
                'Content-Length': stats.size                
            });
            fs.createReadStream(realpath).on('end',function(){
                res.end();
            }).pipe(res);
        }
    });
}
    


  /*
        var stream = fs.createReadStream(realpath);
        stream.on('data', function (data) {
            res.write(data);
        });

        stream.on('end', function () {
            res.end();
        });

        stream.on('error', function (err) {
            console.log(err);
            res.end('500 Internal Server ' + err);
        });
        */