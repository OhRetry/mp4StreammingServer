const Setting = require(require.main.path + '/config/Setting');

module.exports = function(req,res){
    var context = {
        user : req.session.user
    };
    req.app.render('index', context, function (err, html) {
        if (err) {
            console.log("뷰 렌더링 에러 발생");
            console.log(err);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html;charset=utf8" });
        res.end(html);
    });
}