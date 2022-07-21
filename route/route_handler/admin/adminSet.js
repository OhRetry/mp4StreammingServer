const fs = require('fs');
const Setting = require(require.main.path + '/config/Setting');

module.exports = function(req,res){
    var targ = req.body.setting;
    
    /*
    //check new setting has right format
    var Format_msg = checkFormat(targ);
    if(Format_msg != undefined){
        res.end(Format_msg);
        return;
    }
    */
    //check if the system needs to be restarted
    var reboot = checkReBoot(targ);

    Setting.change(targ);
    Setting.save();
    
    if(reboot){
        res.end("Setting is changed. You have to restart server");
    }
    else{
        res.end("Setting is changed.");
    }
    
}
function checkFormat(targ){
    if(typeof targ.getIPfromInterface !== "boolean"){
        return "getIPfromInterface's value is must be true or false";
    }
    if(targ.getIPfromInterface){
        if(targ.NetworkInterface == ""){
            return "you have to choose NetworkInterface to use";
        }
    }

}
function checkReBoot(targ){
    var reboot = false;

    
    if(Setting.getIPfromInterface != targ.getIPfromInterface){
        reboot = true;
    }
    else if(targ.getIPfromInterface == true && Setting.NetworkInterface != targ.NetworkInterface){
        reboot = true;
    }
    else if(targ.getIPfromInterface == false && Setting.ip != targ.ip){
        reboot = true;
    }
    else if(Setting.port != targ.port){
        reboot = true;
    }

    return reboot;
}
