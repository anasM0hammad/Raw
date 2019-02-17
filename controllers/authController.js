const User = require('../models/userModel');

const bcrypt = require('bcryptjs');

//CONTROLLER FUNCTION TO RENDER LOGIN PAGE
exports.getLogin = (req , res ,next ) => {
    const isAuth = req.session.isLoggedIn == true ? true : false ;
    res.render('auth/login' , {docTitle : 'Login' , path : '/login' , isAuth : isAuth}) ;
}

//CONTROLLER FUNCTION TO LOGIN
exports.postLogin = (req , res , next) => {
    const email = req.body.email ;
    const password = req.body.password ;

    User.findOne({email : email})
    .then(user => {
        
        if(!user){
            return res.redirect('/login');
        }
        
         bcrypt.compare(password , user.password)
        .then(doMatch => {
            if(doMatch){
                req.session.user = user ;
                req.session.isLoggedIn = true ;
                return req.session.save(err => {
                    res.redirect('/shop');
                    console.log(err);
                });
            }
            else{
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
        }) ;
    })
    .catch(err => {
        console.log(err);
    })
}


//CONTROLLER FUNCTION TO GET SIGNUP PAGE
exports.getSignup = (req , res , next ) => {
    const isAuth = req.session.isLoggedIn == true ? true : false ;
    res.render('auth/signup' , {docTitle : 'Signup' , path : '/signup' , isAuth : isAuth});
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



//CONTROLLER FUNCTION TO LOGOUT
exports.getLogout = (req , res , next )=>{
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/shop');
    }) ;
}