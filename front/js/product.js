//redirection de la page produits à la page d'un produit via son id
let productId = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
//on récupère l'URL de la page active et on extrait l'ID d'un produit

// ************************************ //
fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => res.json())
  .then((product) => getProduct(product));
// ******************************************************************************* //
function getProduct(kanap) {
  const { imageUrl, altTxt, name, price, description, colors } = kanap;
  getImage(imageUrl, altTxt);
  getTitle(name);
  getPrice(price);
  getDescription(description);
  getColors(colors);
}
// ******************************************************************************* //
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
//function addToBasket() {
let btn = document.querySelector("#addToCart");
btn.addEventListener("click", () => {
  let elementsColors = document.querySelector("#colors").value;
  console.log(elementsColors);
  let quantity = document.querySelector("#quantity").value;
  console.log(quantity);
  if (
    quantity == undefined ||
    quantity == null ||
    quantity < 1 ||
    quantity > 100 ||
    elementsColors === "" ||
    elementsColors == null ||
    elementsColors == undefined
  ) {
    alert(
      "Veuillez sélectionner une couleur et une quantité (entre 1 et 100) du produit"
    )
  } else {
    window.location.href = "cart.html"; //renvoie sur la page panier du client (cart.html)
  }
  
  let basket = JSON.parse(localStorage.getItem("produit")) || []; //création du panier ds le LS encore vide/soit tab  soit tab vide
  console.log(basket);
  let newProduct = {
    id: productId,
    quantity: Number(quantity),
    color: elementsColors.value,
  };
  localStorage.setItem("produit", JSON.stringify(basket));//
  console.log(newProduct);
  const found = basket.find(
    //recherche du produit si existant
    (newProduct) => newProduct.id == productId &&  elementsColors.value == color
  );
  
  if (found != undefined) {
    let totalQuantity = parseInt(found.quantity) + parseInt(quantity.value); //valeur LS + value actuelle//transforme les chaines de caract en nbre
    found.quantity = totalQuantity;
    console.log(found);
    localStorage.setItem("produit", JSON.stringify(basket)); // => on enregistre et on additionne
  } 
  
  basket.push(newArticle); //on enregistre les éléments ds le LS si il n'existe pas
  localStorage.setItem("produit", JSON.stringify(basket)); // => on enregistre le nv pdt ds le LS
});
//};
