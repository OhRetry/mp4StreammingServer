const fs = require('fs');
const Setting = require(require.main.path + '/config/Setting');

module.exports = function(req,res){
    console.log(req.body);
    Setting.reset();
    res.end("Setting has been successfully Reseted");
}
