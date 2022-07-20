const authenticate = require(require.main.path + '/Security/User/authenticate.js');
module.exports = function(req,res){
    var id = req.body.id;
    var password = req.body.password;
    var result = authenticate.authenticate(id,password);


    if(result != -1){
        req.session.user = {};
        if(result == 1){
            req.session.user.auth = "Guest";
        }
        else if(result == 2){
            req.session.user.auth = "Admin";
        }
        req.session.user.id = id;
    }

    res.redirect('/');
}