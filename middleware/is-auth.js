 
 module.exports = (req , res , next) => {
    if(!req.session.isLoggedIn){
        req.flash('error' ,'Please Login First');
        res.redirect('/login');
    }
    else{
        if(!req.user.verified){
            req.flash('error' , 'Your are not Verified. Please verify your email.');
            res.redirect('/login');
        }

        else{
          next();
        }
    }
 }