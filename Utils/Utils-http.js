
module.exports.utf8_to_base64 = function(source){
    let buffer = Buffer.from(source);
    return buffer.toString('base64');
}
module.exports.base64_to_utf8 = function(source){
    let buffer = Buffer.from(source,'base64');    
    return buffer.toString('utf-8');
}