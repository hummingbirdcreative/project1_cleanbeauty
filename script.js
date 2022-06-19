//load modal
window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000 
    )
  });
  
  document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
  });
  
  //Define Globals    
  const apiUrl = "https://makeup-api.herokuapp.com/api/v1/products.json?bproduct_tags=";
  const cardContainer = document.getElementById("card-container");
  const tags = ["CertClean", "Chemical Free", "EWG Verified", "EcoCert", "Fair Trade", "Natural", "Non-GMO", "Organic", "USDA Organic", "Vegan"];
  
  
  function fetchByTag(productType) {
    const selectedTags = [];
    document.querySelectorAll('[name="tag"]').forEach(tagItem => {
      console.log('tagItem', tagItem.value);
      const tagValue = tagItem.value;
      const isSelected = tagItem.checked;
      if(isSelected) {
        selectedTags.push(tagValue);
      }
    });
  
    console.log('selectedTags', selectedTags);
  
      // the api needs a comma separated list of tags
      const tagsString = selectedTags.join(',');
    
      return  fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${productType}&product_tags=${tagsString}`)
        .then(resp => resp.json())
        .then(product => {
          console.log('product', product);
          return product;
        })
        .then(product => displayData(product))
  }
  
  function bindClickListeners() {
    const $linkTag = document.getElementById('categoryLinks');
  
    for (let i = 0; i < $linkTag.children.length; i++) {
      const item = $linkTag.children[i];
      const productType = item.innerHTML; 
      item.addEventListener('click', function(e) {
        e.preventDefault();
        cardContainer.innerHTML = '';
        
        console.log('clicked on productType:', productType);
        fetchByTag(productType);
      })   
    }
  }
  
  bindClickListeners();
  
  
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
  function categoryLinks() {
    const productType = ["Blush", "Bronzer", "Eyebrow", "Eyeliner", "Eyeshadow", "Foundation", "Lipliner", "Lipstick", "Mascara", "Nailpolish"];
    for (let i = 0; i < productType.length; i++) {
      const productids = document.getElementById(productType[i])
    }
  }
  categoryLinks();
  
  //fetch by product type
  function fetchProductType(productType) {
      fetch(`${apiUrl}${tags.join(',')}&product_type=${productType}`)
        .then(resp => resp.json())
        .then(product => displayData(product))
  }
  
  //fetch by tag
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