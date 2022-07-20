const Setting = require(require.main.path + '/config/Setting');

module.exports.user = function(req,res,next){
    if(req.session.user){
        next();
    }
    else if(Setting.users.length == 0){
        req.session.user = {};
        req.session.user.auth = "Admin";
        next();
    }
    else{        
        res.redirect('/login');
        
    }
}
module.exports.admin = function(req,res,next){ 
    if(req.session.user.auth == "Admin" || Setting.users.length == 0){
        next();        
    }
    else if(Setting.users.length == 0){
        req.session.user = {};
        req.session.user.auth = "Admin";
        next();
    }
    else{        
        res.redirect('/login');        
    }
}