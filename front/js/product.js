/*[ on peut aussi faire :   
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");]
*/
// ********************************************************************************************************* //

//=> redirection de la page produits à la page d'un produit via son id
let productId = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
//=> on récupère l'URL de la page active et on extrait l'ID d'un produit

// ************************************ //
//=> on récupère les infos du back-end depuis l'API
fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((product) => getProduct(product)); //infos ds getProduct
// ******************************************************************************* //
//on récup les clés en variables ds arguments des fonctions
function getProduct(kanap) {
  const { imageUrl, altTxt, name, price, description, colors } = kanap; //=> destructuring = : const kanap = { imageUrl: kanap.Url, altTxt: kanap.altTxt, price: kanap.price, description: kanap.description, etc..}les clés sont des variables
  //ou encore : const id=kanap._id/const imageUrl=kanap.imageUrl/const price=kanap.price/ etc...
  getImage(imageUrl, altTxt);
  getTitle(name);
  getPrice(price);
  getDescription(description);
  getColors(colors);
}
// ******************************************************************************* //
//=> Petites fonctions qui récup les infos pr les afficher
function getImage(imageUrl, altTxt) {
  let image = document.querySelector(".item__img");
  image.innerHTML = `<img src=${imageUrl}  alt=${altTxt} />`;
}

// ******************************************************************************* //
function getTitle(name) {
  let title = document.querySelector("title");
  title.innerHTML = name;
  let nameProduct = document.getElementById("title");
  nameProduct.innerHTML = `<h1 id="title">${name}</h1>`;
}

// ******************************************************************************* //
function getPrice(price) {
  let priceArticle = document.querySelector("#price");
  priceArticle.innerHTML = `<span id="price">${price}</span>`;
}

// ******************************************************************************* //
function getDescription(description) {
  let descriptionArticle = document.querySelector("#description");
  descriptionArticle.innerHTML = `<p id="description">${description}</p>`;
}

// ******************************************************************************* //
function getColors(colors) {
  let select = document.querySelector("#colors");
  colors.forEach((color) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${color}">${color}</option>`
    );
  });
}

// ******************************************************************************* //
//=> on envoie les produits sélectionnés au LS au clic du btn
let btn = document.querySelector("#addToCart");
btn.addEventListener("click", () => {
  let couleurChoisie = document.querySelector("#colors").value; //=> récup de la couleur sélectionnée
  
  let basket = JSON.parse(localStorage.getItem("produits")) || []; //=>création du panier ds le LS encore vide/soit tab  soit tab vide
 
  let quantity = document.querySelector("#quantity").value; //=>récup de la qté saisie
  
  if (
    quantity == undefined || //=> conditions avec fenêtre alert
    quantity == null ||
    quantity < 1 ||
    quantity > 100 ||
    couleurChoisie === "" ||
    couleurChoisie == null ||
    couleurChoisie == undefined
  )
  {
    alert(
      "Veuillez sélectionner une couleur et une quantité (entre 1 et 100) du produit"
    );
  } else {
  //window.location.href = "cart.html"; //renvoie sur la page panier du client (cart.html)  //=>pour envoyer à la page panier
  //}
  //=>création nouveau produit avec les 3 références
  let newProduct = {
    id: productId,
    quantity: Number(quantity),
    color: couleurChoisie,
  };
  
  //=> méthode pr rechercher un produit si  déja existant ds le LS
  let found = basket.find(
    (element) => element.id == productId && element.color == couleurChoisie
  );
  if (found != undefined) {
    
    let totalQuantity = parseInt(found.quantity) + parseInt(quantity); //=> valeur LS + value actuelle//transforme les chaines de caract en nbre
    found.quantity = totalQuantity;
    
    
  } else {
    basket.push(newProduct); //=> on enregistre les éléments ds le LS si il n'existe pas
  }
    
  localStorage.setItem("produits", JSON.stringify(basket)); // => on enregistre le nv element et on additionne ds le LS
  
}});
