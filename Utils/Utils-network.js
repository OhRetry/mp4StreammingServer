const os = require('os');
module.exports.getIPAddress = function getIPAddress(deviceName) {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        if(devName == deviceName){
            var iface = interfaces[devName];            
            for(var i=0;i<iface.length;i++){
                var alias = iface[i];
                return alias.address;
            }
        }
    }
    return null;
  }
