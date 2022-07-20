//require
    const os = require('os')
    const express = require("express");
    const fs = require('fs');
    const http = require('http');
    const https = require('https');
    const static = require('serve-static');
    const path = require('path');
    const cookieParser = require('cookie-parser');
    const expressSession = require('express-session');
    const Setting = require('./config/Setting.js');
    const thumbnail_Manager = require('./video_Process/thumbnail/thumbnail_Manager');
//Initialize
Setting.init();
thumbnail_Manager.init(10000,false,"120x?",10);

//Server start
var app = express();
app.set('port', Setting.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public',static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));



//set router
const router_loader = require('./route/route_loader');
const router_info = require('./route/route_info');
const loginCheck = require('./Security/User/loginCheck');
const safepath = require('./Security/safepath');
var router;



router = express.Router();
router_loader(router,router_info.login);
app.use('/', router);

router = express.Router();
router.use(loginCheck.user);
router_loader(router,router_info.index);
app.use('/',router);

router = express.Router();
//router.use(loginCheck.user);
router.use(safepath);
router_loader(router,router_info.explorer);
app.use('/', router);

router = express.Router();
router.use(loginCheck.admin);
router_loader(router,router_info.admin);
app.use('/', router);




console.log("\n==========================================\n");

//create server
if (Setting.https == true) {
    try{
        var server = https.createServer({
            key: fs.readFileSync('./cert/key.pem'),
            cert: fs.readFileSync('./cert/cert.pem')
        }, app)
    }
    catch(e){
        console.log("\n");
        console.log('\x1b[31m');
        console.log(e.message);
        if(e.code == 'ENOENT'){
            console.log("system secure setting is 'https' but some file is missing.")
            console.log("you need to make 'key.pem' and 'cert.pem' at 'cert' directory.\n try to make them with openssl");
        }
        console.log("system changed setting 'https' to 'http'");
        console.log('\x1b[0m');
        Setting.https = false;
    }
}
if(Setting.https == false) {
    var server = http.createServer(app);
}


//make server listen
let IsSecure = Setting.https ? "s" : "";
function getServerAddress(IsSecure,ip,port){
    return "http" + IsSecure + "://" + ip + ':' + port;
}

server = server.listen(app.get('port'));
server.on('listening',function(){
    var addr = getServerAddress(IsSecure,Setting.ip,Setting.port);
    console.log('\x1b[44m');
    console.log("server started");
    console.log("server address  =>  " + addr);
    console.log('\x1b[0m');
    //if os is window, execute browser with cmd
    var exec = require('child_process').exec;
    const exp = require("constants");

    exec("start /max " + addr, function (err, stdout, stderr) {
        //error or os is not window
        if (err) {  
            //console.log('cannot open browser with cmd');
        }
    });
})
server.on('error',function(e){
    if(e.code == "EADDRINUSE"){
        console.log('\x1b[31m');
        console.log('Someone is already using port ' + Setting.port);
        console.log('port changed to ' + (Setting.port + 1));
        console.log('\x1b[0m');
        Setting.port += 1;
        app.set('port',Setting.port);
        server = server.listen(app.get('port'));
    }
})








