const fs = require('fs');
const path = require('path')
const Setting = require(require.main.path + '/config/Setting');
const util_extends = require(require.main.path + '/Utils/extends');

const {
    extends_MIME,
    extends_to_Icons,
    Icons_set,
    Image_set,
    Image_Kinds,
    Video_set,
    Video_Kinds
} = util_extends




module.exports = function (req, res) {

    var info = {
        url: req.url,
        root: Setting.root,
        //remove /root/
        realpath: Setting.root + req.url.substring(6, req.url.length)
    }

    //console.log(info.realpath);
    fs.stat(info.realpath, function (err, stats) {
        if (err) {
            console.log(info.realpath);
            console.log("에러 발생");
            console.log(err);
            return;
        }

        if (stats.isDirectory()) {
            handle_Directory(req, res, info);
        }
        else {
            info.ext = path.extname(info.realpath);
            if (Video_set.has(info.ext)) {
                handle_video(req, res, info);
            }
            else {
                handle_File(req, res, info);
            }
        }
    })
}

function handle_Directory(req, res, info) {
    var dirPath = info.url[info.url.length - 1] == '/' ? info.url : info.url + '/';
    info.realpath = info.realpath[info.realpath.length - 1] == '/' ? info.realpath : info.realpath + '/';

    fs.readdir(info.realpath, function (err, files) {
        var context = {
            upper_base: path.dirname(dirPath) + '/',
            base: dirPath,
            dir: [],
            file: {},
            video: [],
            image: []
        };

        //If Empty Directory
        if (files == undefined)
            files = [];

        //classify type of files and add to context
        var promiss_arr = [];
        for (let filename of files) {
            promiss_arr.push(
                new Promise(function (resolve, reject) {
                    fs.stat(info.realpath + filename, function (err, stats) {
                        if (err) {
                            //console.log("fs.stat error");
                            //console.log(err);
                            context.file[filename] = "";
                            resolve();
                            return;
                        }
                        
                        //is file directory?
                        if (stats.isDirectory()) {
                            context.dir.push(filename);
                        }
                        else {
                            let ext = path.extname(filename).toLowerCase();
                            //is file video?
                            if (Video_set.has(ext)) {
                                context.video.push(filename);
                            }
                            //is file Image?
                            else if (Image_set.has(ext)) {
                                context.image.push(filename);
                            }
                            //all file except video&image(Because of Thumbnail)
                            else {
                                //change extension if they sharing same Icon
                                if (extends_to_Icons[ext] != undefined) {
                                    ext = extends_to_Icons[ext];
                                }
                                //all extension that server doesn't have Icon
                                if (!Icons_set.has(ext)) {
                                    ext = "";
                                }
                                context.file[filename] = ext;
                            }
                        }
                        resolve();
                    });
                })
            );
        }
        //sync with all stat function
        Promise.all(promiss_arr).then(function () {
            req.app.render('explorer', context, function (err, html) {
                if (err) {
                    console.log("뷰 렌더링 에러 발생"); 
                    console.log(err);
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
                res.end(html);
            });
        })
    })

}
function handle_File(req, res, info) {
    const mime = extends_MIME[info.ext];
    if (mime === undefined) {
        res.writeHead(200);
    }
    else {
        res.writeHead(200, { "Content-Type": mime });
    }

    fs.createReadStream(info.realpath).on('error',function(err){
        console.log(err);
    }).pipe(res);
    
}
function handle_video(req, res, info) {
    var context = {
        videoSource: '/video' + info.url
    }
    if (info.ext == ".mp4") {
        req.app.render('explorer_video_mp4', context, function (err, html) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
            res.end(html);
        });
    }
    else if(info.ext == '.ts'){
        req.app.render('explorer_video_ts',context,function(err,html){
            if(err){
                console.log(err);
                res.writeHead(500);
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
            res.end(html);
        })
    }
}


