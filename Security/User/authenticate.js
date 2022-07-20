const Setting = require(require.main.path + '/config/Setting.js');
/*
* return -1 == wrong id or password
* return 1 == user
* return 2 == admin
*
* not using HASH in this version. It just compare password as string. But i'll change to use HASH later.
*/
module.exports.authenticate = function(id,password){
    for(var i in Setting.users){
        let user = Setting.users[i];
        if(user.id == id && user.password == password){
            if(user.admin)
                return 2;
            return 1;
        }
    }
    return -1;
}
