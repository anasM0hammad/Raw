const deleteProd = (btn)=> {
    const prodId = btn.parentNode.querySelector('[name=prodId]').value ;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value ;
    const product = btn.closest('.card') ;

    fetch(`https://raw1.herokuapp.com//admin/delete-product/${prodId}` , {
        method : 'DELETE',
        headers : {'csrf-token' : csrf}
    })
    .then(result => {
        console.log(result) ;
        product.parentNode.removeChild(product) ;
    })
    .catch(err => {
        console.log(err);
    }) ;
}