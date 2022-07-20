const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const thumbnailQueue = require('./thumbnailQueue');

var thumbnailCache = {};
var filenameQueue;
var cacheSize;
var useFile;
var size;
var quality;

/**
*this is Initialization function of thumbnail_Manager. you have to call init before use this module.
*if you want to use default, just call init()
*in default each thumbnail size is about 1kb
*@param {int} cacheSize
*max size of thumbnail cache
*if new request come when cache is full, delete oldest thumbnail and save new thumbnail.
*Default is 5000
*@param {boolean} useFile
*If you set this option true, thumbnail_Manager save oldest one as file when buffer is full.
*If you want to save all processed thumbnail as file, set useFile=true && buffer_cnt=0  , 
*Default is False
*@param {string} size
*define thumbnail's size
*Default is "120x?"
*@param {int} quality
*ffmpeg's output thumbnail quailty
*Default is 20
*@returns {void}
*/
module.exports.init = function(_cacheSize,_useFile=false,_size="120x?",_quality=20){
    cacheSize = _cacheSize;
    useFile = _useFile;
    size = _size;
    quality = _quality;    
    filenameQueue = new thumbnailQueue(_cacheSize);
}



/**
*@param {string} path
*request path of video to make thumbnail
*@returns {Promise}
*Promise of result. result is buffer of thumbnail's binary.
*/
module.exports.request = function(path){
    if(thumbnailCache[path]){
        return thumbnailCache[path];
    }
    thumbnailCache[path] = new Promise(function(resolve,reject){        
        var deleted = filenameQueue.push(path);
        if(deleted)
            delete thumbnailCache[deleted]

        var temp=[];
        var ffstream = ffmpeg(path).inputOptions(['-ss 00:00:00']).outputOptions(["-f singlejpeg",'-vframes 1','-q 10']).size('120x?')
                                    .on('error',function(err){
                                        //console.log("error1 " + err);   
                                    })
                                    .pipe();
        ffstream        
        .on('error',function(err){
            //console.log("error2 " + err);
        })
        .on('data',function(data){
            temp.push(data);
        })
        .on('end',function(){
            resolve(Buffer.concat(temp));
        })
        
    });    
    return thumbnailCache[path];
}


/**
 * preload thumbnails from root with BFS
*/
/*
module.exports.preload = function(){
    
}
module.exports.preload_folder = function(path){
    if(filenameQueue.queue.length > size/2)
        return;
    fs.readdir(path,function(err,files){
        for(var filename of files){
            module.exports.request(files);
        }
        
    })
}
*/