const User = require('../models/userModel');


//CONTROLLER FUNCTION TO RENDER LOGIN PAGE
exports.getLogin = (req , res ,next ) => {
    res.render('auth/login' , {docTitle : 'Login' , path : '/login'}) ;
}

//CONTROLLER FUNCTION TO LOGIN
exports.postLogin = (req , res , next) => {
    User.findById('5c671c9f14ac4009fcf8bc14')
    .then(user => {
        req.session.user = user ;
        req.session.isAuthenticated = true ;
        console.log(req.session.user);
        req.session.save(result => {
            res.redirect('/');
        });
    })
    .catch(err => {
        console.log(err);
    })
}


//CONTROLLER FUNCTION TO GET SIGNUP PAGE
exports.getSignup = (req , res , next ) => {
    res.render('auth/signup' , {docTitle : 'Signup' , path : '/signup'});
}