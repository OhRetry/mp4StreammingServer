//login route
let route_login_path = './route_handler/login/';
const route_login = [
    {file: route_login_path+'login.js', route:'/login', type:'get'},
    {file: route_login_path+'logout.js', route:'/logout', type:'get'},
    {file: route_login_path+'auth.js', route:'/auth', type:'post'}
]

//explorer route
let route_explorer_path = './route_handler/explorer/';
const route_explorer = [   
    {file: route_explorer_path+'explorer.js', route:'/root/*', type:'get'},
    {file: route_explorer_path+'video.js', route:'/video/*', type:'get'},
    {file: route_explorer_path+'thumbnail.js', route:'/thumbnail/*', type:'get'},
    {file: route_explorer_path+'download.js', route:'/download/*', type:'get'}
]

//admin route
let route_admin_path = './route_handler/admin/';
const route_admin = [
    {file: route_admin_path+'admin.js', route:'/admin', type:'get'},
    {file: route_admin_path+'adminSet.js', route:'/adminSet', type:'post'},
    {file: route_admin_path+'adminReset.js', route:'/adminReset', type:'post'}
]

let route_index_path = './route_handler/';
const route_index = [
    {file: route_index_path + 'index.js', route:'/', type:'get'}
]

module.exports.login = route_login;
module.exports.explorer = route_explorer;
module.exports.admin = route_admin;
module.exports.index = route_index;