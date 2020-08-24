function UpdateControls(product) {
console.log (product)
    let allProducts = document.querySelectorAll('.param-block:not(.main)')
    allProducts.forEach(elem=>{
        
        if (elem.getAttribute('parent')==product){
            elem.classList.remove('hide')
        } else {
            elem.classList.add('hide')
        }
    })
    // console.log(allProducts)
}

document.addEventListener('DOMContentLoaded', function () {
    UpdateControls()
    let productControls = document.querySelectorAll('input[name="product"]')
    productControls.forEach(elem => {
        elem.addEventListener('change', function () {
            UpdateControls (this.id)
        })
    })
})