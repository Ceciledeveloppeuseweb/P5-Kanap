//=> redirection de la page produits à la page d'un produit via son id
let productId = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
//=> on récupère l'URL de la page active et on extrait l'ID d'un produit

// ************************************ //
//=> on récupère les infos du back-end
fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((product) => getProduct(product)); //infos ds getProduct
// ******************************************************************************* //
//on récup les clés en variables ds arguments des fonctions
function getProduct(kanap) {
  const { imageUrl, altTxt, name, price, description, colors } = kanap;
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
  let elementsColors = document.querySelector("#colors").value; //=> récup de la couleur sélectionnée
  console.log(elementsColors);
  let basket = JSON.parse(localStorage.getItem(productId)) || []; //=>création du panier ds le LS encore vide/soit tab  soit tab vide
  console.log(basket);
  let quantity = document.querySelector("#quantity").value; //=>récup de la qté saisie
  console.log(quantity);
  if (
    quantity == undefined || //=> conditions avec fenêtre alert
    quantity == null ||
    quantity < 1 ||
    quantity > 100 ||
    elementsColors === "" ||
    elementsColors == null ||
    elementsColors == undefined
  )
    alert(
      "Veuillez sélectionner une couleur et une quantité (entre 1 et 100) du produit"
    );
  //} else {
  //window.location.href = "cart.html"; //renvoie sur la page panier du client (cart.html)  //=>pour envoyer à la page panier
  //}
  //=>création nouveau produit avec les 3 références
  let newProduct = {
    id: productId,
    quantity: Number(quantity),
    color: elementsColors,
  };
  console.log(newProduct);
  //=> méthode pr rechercher un produit si  déja existant ds le LS
  let found = basket.find(
    (element) => element.id == productId && element.color == elementsColors
  );
  console.log(productId);
  console.log(elementsColors);
  if (found != undefined) {
    let totalQuantity =
      parseInt(found.quantity) + parseInt(newProduct.quantity); //=> valeur LS + value actuelle//transforme les chaines de caract en nbre
    found.quantity = totalQuantity;
    console.log(found.quantity);
    localStorage.setItem(productId, JSON.stringify(basket)); // => on enregistre et on additionne
  } else {
    basket.push(newProduct); //=> on enregistre les éléments ds le LS si il n'existe pas
    localStorage.setItem(productId, JSON.stringify(basket)); // => on enregistre le nv pdt ds le LS
  }
  console.log(found);
});