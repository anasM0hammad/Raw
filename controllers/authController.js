const User = require('../models/userModel');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport') ;
const crypto = require('crypto');
const { validationResult } = require('express-validator/check') ;

const transporter = nodemailer.createTransport(sendGrid({
    auth : {
        api_key : '' 
    }
}));

//CONTROLLER FUNCTION TO RENDER LOGIN PAGE
exports.getLogin = (req , res ,next ) => {
    let errorMsgArray = req.flash('error');
    if(errorMsgArray.length > 0){
        errorMsg = errorMsgArray[0] ;
    }
    else{
        errorMsg = null ;
    }
    res.render('auth/login' , {docTitle : 'Login' , path : '/login' , errorMsg : errorMsg }) ;
}

//CONTROLLER FUNCTION TO LOGIN
exports.postLogin = (req , res , next) => {
    const email = req.body.email ;
    const password = req.body.password ;

    User.findOne({email : email})
    .then(user => {
        
        if(!user){
            req.flash('error' , 'Invalid Email');
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
                req.flash('error' , 'Invalid Password');
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
    const errorMsgArray = req.flash('error');
    const successArray = req.flash('success');
    let errorMsg ;
    let success ;

    errorMsgArray.length > 0 ? errorMsg = errorMsgArray[0] : errorMsg = null ;
    successArray.length > 0 ? success = successArray[0] : success = null ;
    res.render('auth/signup' , {docTitle : 'Signup' , path : '/signup' , errorMsg : errorMsg , success : success});
}


//CONTROLLER FUNCTION FOR POST SIGNUP
exports.postSignup = (req , res , next) => {
   const name = req.body.name ;
   const email = req.body.email ;
   const password = req.body.password ;
   const confirmPassword = req.body.confirmPassword ;
   const errorMsg = validationResult(req) ;
   
   if(!errorMsg.isEmpty()){
       return res.status(422).render('auth/signup' , {docTitle : 'Signup' , path : '/signup' , errorMsg : errorMsg.array()[0].msg} ) ;
   }

   User.findOne({email : email})
   .then(user => {
       if(user){
        req.flash('error' , 'User Already Exist');
        return res.redirect('/signup');
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
           req.flash('success' , 'Signup Successfull');
           res.redirect('/login');
           
           transporter.sendMail({
               to: email ,
               from : 'support@raw12.in',
               subject : 'Welcome to Online Shopping Registering Store',
               html: '<h2>Welcome to Online Shopping Store</h2> <p>You are Signup Successfully Now you can post your products as well as buy from our website</p>'
           })
           .then(result =>{
           
           })
           .catch(err => {
               console.log(err);
           });

       });
   })
   .catch(err => {
       console.log(err);
   });
}



//CONTROLLER FUNCTION TO LOGOUT
exports.getLogout = (req , res , next )=>{
    req.session.destroy(err => {
        res.redirect('/shop');
    }) ;
}



//CONTROLLER TO GET RESET PAGE
exports.getReset = (req , res , next) => {
    const errorMsgArray = req.flash('error');
    if(errorMsgArray.length > 0){
        errorMsg = errorMsgArray[0];
    }
    else{
        errorMsg = null; 
    }
    res.render('auth/reset' , {docTitle :  'Reset Password' , path : '/reset' , errorMsg : errorMsg}) ;
}


//CONTROLLER TO POST RESET PAGE
exports.postReset = (req , res , next) => {
    const email = req.body.email ;
    let resetUser ;
    crypto.randomBytes(32 , (err , buffer) => {
        if(err){
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex') ;
        User.findOne({email : email})
        .then(user => {
            resetUser = user ;
            resetUser.resetToken = token ;
            resetUser.resetTokenExpiration = Date.now() + 3600000 ;
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/reset');
            return transporter.sendMail({
                to : req.body.email,
                from : 'support@raw12.in',
                subject : 'Resetting Password',
                html : `<h2>Reset Your Password</h2>
                        <p>We are here to help you click <a href="http://localhost:3000/reset/${token}">here</a> to reset your password Successfully. If resetting password is not requested by you just ignore this mail.</p>`
            })
        })
        .then(result => {

        })
        .catch(err => {
            console.log(err);
        })
    });
}


//CONTROLLER TO GET THE LINK FROM MAIL
exports.getNewPassword = (req , res , next) => {
    const token = req.params.token ;
    let user ;
    User.findOne({resetToken : token , resetTokenExpiration : {$gt : Date.now()}})
    .then(user => {
        if(!user){
            return res.redirect('/');
        }
        res.render('auth/new-password' , {docTitle : 'New Password' , path : '/reset' , token : token , id : user._id.toString()}) ;
    })
    .catch(err => {
        console.log(err);
    })
}



//CONTROLLER TO POST NEW PASSWORD IN DB
exports.postNewPassword = (req , res , next) => {
    const userId = req.body.userId ;
    const token = req.body.token ;
    const newPassword = req.body.password ;
    let newHashed ;

    bcrypt.hash(newPassword , 12)
    .then(hashedPassword => {
        newHashed = hashedPassword ;
        return User.findOne({_id : userId , resetToken: token , resetTokenExpiration : {$gt : Date.now()}})
    })
    .then(user => {
        user.password = newHashed ; 
        user.resetToken = undefined; 
        user.resetTokenExpiration = undefined ;
        return user.save();
    })
    .then(result => {
        res.redirect('/login') ;
    })
    .catch(err => {
        console.log(err) ;
    })

}
