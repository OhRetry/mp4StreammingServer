module.exports = function(req,res){
    if(req.session.user){
        req.session.destroy(function(err){
            console.log("error occured while deleting session");
            console.log(err);
        })
    }
    res.redirect('/');
}