//Define Globals  
const apiUrl = "https://makeup-api.herokuapp.com/api/v1/products.json?bproduct_tags=";
const cardContainer = document.getElementById("card-container");
const tags = ["CertClean", "Chemical Free", "EWG Verified", "EcoCert", "Fair Trade", "Natural", "Non-GMO", "Organic", "USDA Organic", "Vegan"];

//Display Data
function displayData(product) {
    product.map(createProductCards)
}

//display product data on card 
function createProductCards(product) {
    const createCard = document.createElement("div");
    createCard.className = "card"
    
    const productImage = document.createElement("img");
    productImage.src = product.image_link;
    productImage.className = "product-image"

    const brand = document.createElement("h2");
    brand.innerHTML = product.brand;
    brand.className = "brand"
    
    const nameLink = document.createElement("a");
    nameLink.href = product.product_link
    nameLink.className = "link"
    nameLink.innerHTML = product.name;

    const description = document.createElement('p');
    description.innerHTML = product.description
    description.id = "productDescription"

    createCard.append(productImage, brand, nameLink, description);
    cardContainer.append(createCard);
}

//Category function
//name this better
//how would you do this as a drop down instead?
//use a .map or .forEach instead?
function categoryLinks() {
    const productType = ["Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation", "Lip liner", "Lipstick", "Mascara", "Nail polish"];
    for (let i = 0; i < productType.length; i++) {
        const productids = document.getElementById(productType[i])
        productids.addEventListener("click", () => {
        cardContainer.innerHTML = "";
        fetchProductType(productType[i])
        })
     }
} 
categoryLinks();

//fetch by product type
function fetchProductType(productType) {
    fetch(`${apiUrl}${tags.join(',')}&product_type=${productType}`)
        .then(resp => resp.json())
        .then(product => displayData(product))
}

//get that makeup
function getCleanMakeup(tags) {
    fetch(`${apiUrl}${tags}`)
        .then(resp => resp.json())
        .then(product => displayData(product))
        .catch(err => console.log(err));
}



   

// const url = "https://makeup-api.herokuapp.com/api/v1/products.json?product_tags=Vegan";
// fetch(url)
// .then(res => {
//  return res.json();
// })
// .then(data => console.log(data))
// .catch(err => {
//   console.log("something went wrong...", err);
// })