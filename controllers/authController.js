const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

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


//CONTROLLER FUNCTION FOR POST SIGNUP
exports.postSignup = (req , res , next) => {
   const name = req.body.name ;
   const email = req.body.email ;
   const password = req.body.password ;
   const confirmPassword = req.body.confirmPassword ;

   User.findOne({email : email})
   .then(user => {
       if(user){
        return res.redirect('/');
       }

       bcrypt.hash(password , 12)
       .then(hashedPassword => {
        const newUser = new User({
            name : name ,
            email : email ,
            password : hashedPassword ,
            cart : { item : [] }
        });
 
        return newUser.save() ;

       })
       .then(result => {
           res.redirect('/login');
       });
   })
   .catch(err => {
       console.log(err);
   });
}