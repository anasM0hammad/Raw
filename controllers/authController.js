
//CONTROLLER FUNCTION TO RENDER LOGIN PAGE
exports.getLogin = (req , res ,next ) => {
    res.render('auth/login' , {docTitle : 'Login' , path : '/login'}) ;
}