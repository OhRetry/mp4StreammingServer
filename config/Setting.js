const baseLoc = "../"

const fs = require('fs');
const path = require('path');


var Utils_network = require(baseLoc + './Utils/Utils-network.js');

function init() {

    /*
        1. try to get ip from NetworkInterface
        2. if unavailable, use specific ip from Setting.json
        3. if 1,2 fail, set loopback to IP
    */
    
    if (setting.getIPfromInterface == true) {
        setting.ip = undefined;
        if (setting.NetworkInterface != undefined) {
            setting.ip = Utils_network.getIPAddress(setting.NetworkInterface);
        }
    }
    
    if (setting.ip == undefined || setting.ip == '') {
        console.log("\n");
        console.log('\x1b[31m');
        console.log("unavailable network interface and no preset ip at Setting")
        console.log("set 127.0.0.1(loopback) to IP. its only available on your compter and other computer can't access to this server.")
        console.log('\x1b[0m');
        setting.ip = "127.0.0.1";
    }
    
    if(setting.port == null){
        console.log("\n");
        console.log('\x1b[31m');
        console.log("Error => port is null");
        console.log("set port 3000");
        console.log('\x1b[0m');
        setting.port = 3000;
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
