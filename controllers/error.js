//FUNCTION TO HANDLE 404 ERROR
exports.notFound = (req , res ,next) => {
    const isAuth = req.session.isLoggedIn == true ? true : false ;
    res.status(404).render('404' , {docTitle : 'Page Not Found' , path: '' , isAuth:isAuth});
}