const baseLoc = "../"

const fs = require('fs');
const path = require('path');


var Utils_network = require(baseLoc + './Utils/Utils-network.js');

function init() {

    /*
        1. try to get ip from NetworkInterface
        2. if unavailable, set loopback to IP        
    */
    
    setting.ip = undefined;
    if (setting.NetworkInterface != undefined) {
        setting.ip = Utils_network.getIPAddress(setting.NetworkInterface);
    }

    
    if (setting.ip == undefined) {
        console.log("\n");
        console.log('\x1b[31m');
        console.log("Error => unavailable network interface \"" + setting.NetworkInterface + "\"");
        console.log("set 127.0.0.1(loopback) to IP. This address is only available on your compter and other computer can't access with this address.");
        console.log("If this computer is in private network like Wi-Fi, other computer can access with private ip address");
        console.log("You can find your private ip address by ipconfig command");
        console.log('\x1b[0m');
        setting.ip = "127.0.0.1";
    }
    
    if(typeof(setting.port) != "number"){
        console.log("\n");
        console.log('\x1b[31m');
        console.log("Error => port is not number");
        console.log("set port to 3000");
        console.log('\x1b[0m');
        setting.port = 3000;
    }
        
    if(!(fs.existsSync(setting.root) && fs.statSync(setting.root).isDirectory())){        
        console.log("\n");
        console.log('\x1b[31m');
        console.log("Error => root(" + setting.root + ") is not exists or not directory");
        console.log("Explorer will not work properly. Check Setting's root folder");
        console.log('\x1b[0m');
    }
    
}

/*
Change current Setting.
*/
function change(json) {
    /*
    Changed Setting should be applied to current runtime 
    and current runtime is referencing object created in init() function.

    So if we write code like 
    setting = json
    it will not be applied to current runtime    
    */
    setting_data = json;
    for (var attr in json) {
        setting[attr] = json[attr];
    }
}

/*
Save current Setting to Setting.json

To prevent simultaneous access, this function is performed synchronously.
To protect Setting file(from like crash), write to temp file and rename it to Setting.json
1.write new setting json data to Setting_temp
2.rename Setting.json to Setting_backup.json(if Setting.json is existing)
3.rename Setting_temp to Setting.json
4.delete Setting_backup.json(if Setting_backup.json is existing)
*/
function save(){
    var data = JSON.stringify(setting_data);

    var path_Setting = path.resolve(__dirname, 'Setting.json');
    var path_temp = path.resolve(__dirname, 'Setting_temp');
    var path_backup = path.resolve(__dirname, 'Setting_backup');

    //1
    fs.writeFileSync(path_temp, data);
    //2
    if(fs.existsSync(path_Setting))
        fs.renameSync(path_Setting, path_backup);

    //3
    fs.renameSync(path_temp, path_Setting);
    //4
    if(fs.existsSync(path_backup))
        fs.unlinkSync(path_backup);
}

/*
reset Setting to default

*/
function reset(){
    json = fs.readFileSync(path.resolve(__dirname, 'default.json'), 'utf8');
    json = JSON.parse(json);
    change(json);
    save();
}











var setting = undefined;
try{
    setting = fs.readFileSync(path.resolve(__dirname, 'Setting.json'), 'utf8');
    //setting_data is pure json object except functions
    setting_data = JSON.parse(setting);
    setting = JSON.parse(setting);
}
catch(err){
    if(typeof setting != 'object'){
        console.log("\n");
        console.log('\x1b[31m');
        console.log("fatal error on Setting.json file.");
        console.log("Reset Setting.json");
        console.log('\x1b[0m');
        setting = {};
        reset();
    }    
}


setting.init = init;
setting.change = change;
setting.save = save;
setting.reset = reset;

module.exports = setting;
console.log(setting)
