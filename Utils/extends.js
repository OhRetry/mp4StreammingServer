//this is for extension, which is sharing same icon
const extends_to_Icons = {
    '.mp3': '.music',
    '.m4a': '.music',
    '.docx': '.doc'
}
//The extension with the name in this Set will have an icon with that name except image/video.
const Icons_set = new Set();
const Icons_Kinds = ['.mp4', '.ts', '.jpg', '.png', '.txt', '.doc','.zip', '.music', '.pdf', '.html', '.js', '.css'];
for (let kind of Icons_Kinds) {
    Icons_set.add(kind);
}
//Images must be distinguished from other extensions to provide a thumbnail. 
const Image_set = new Set();
const Image_Kinds = ['.jpg', '.png']
for (let kind of Image_Kinds) {
    Image_set.add(kind);
}
//Video must be distinguished from other extensions to provide a thumbnail. 
const Video_set = new Set();
const Video_Kinds = ['.mp4', '.ts', '.avi', '.mpg']
for (let kind of Video_Kinds) {
    Video_set.add(kind);
}


const extends_MIME = {
    ".jpg":"image/jpeg",
    ".png":"image/png",
    ".bmp":"image/x-ms-bmp",
    ".gif":"image/gif",
    ".mp4":"video/mp4",
    ".ts":"video/mp2t",
    ".avi":"video/x-msvideo",
    ".html":"text/html",
    ".txt":"text/plain;charset=utf8",
    ".css":"test/css",
    ".mp3":"audio/mpeg",
    ".m4a":"audio/m4a",
    ".pdf":"application/pdf"
}
module.exports.Icons_Kinds = Icons_Kinds;
module.exports.Icons_set = Icons_set;
module.exports.Image_Kinds = Image_Kinds;
module.exports.Image_set = Image_set;
module.exports.Video_Kinds = Video_Kinds;
module.exports.Video_set = Video_set;
module.exports.extends_to_Icons = extends_to_Icons;
module.exports.extends_MIME = extends_MIME;