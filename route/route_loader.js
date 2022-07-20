
module.exports = function(router,router_info){
    console.log("==Router Loader==");
    router_info.forEach(function(info){
        console.log(info);
        if(info['type'] == 'get'){
            console.log("router.route(" + info['route'] + ").get(require(" + info['file'] + '))');
            router.route(info['route']).get(require(info['file']));
        }
        else if(info['type'] == 'post'){
            console.log("router.route(" + info['route'] + ").post(require(" + info['file'] + '))');
            router.route(info['route']).post(require(info['file']));
        }
    });
}