const fs = require('fs');
const path = require('path');

const Setting = require(require.main.path + '/config/Setting');

module.exports = function(req,res){        

    //remove /download/root/
    var Rpath = req.url.substring(15,req.url.length);

    fs.stat(Setting.root + Rpath,function(err,ststs){
        if(err || ststs.isDirectory()){
            res.writeHead(404);
            res.end('Error Code 404. Wrong Access');
            return;
        }
        const context={
            explorer_path : req.url,
            filename : path.basename(req.url)
        }
        console.log(context.explorer_path);
        console.log(context.filename);
        req.app.render('download',context,function(err,html){
            if(err){
                console.log("뷰 렌더링 에러 발생");
                console.log(err);
                return;
            }
            res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
            res.end(html);
        });
    })
    
}