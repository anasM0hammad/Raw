//FUNCTION TO HANDLE 404 ERROR
exports.notFound = (req , res ,next) => {
    res.status(404).render('404' , {docTitle : 'Page Not Found'});
}