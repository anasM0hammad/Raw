const User = require('../models/userModel');

const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGrid = require('nodemailer-sendgrid-transport') ;

const transporter = nodemailer.createTransport(sendGrid({
    auth : {
        api_key : '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' 
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
        console.log(err);
        res.redirect('/shop');
    }) ;
}