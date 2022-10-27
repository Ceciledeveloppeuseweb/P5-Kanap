// page panier : récapitulatif du panier
// récupération des informations des produits  depuis l'API
// récupération des produits du panier (encore virtuel)
// assemblage des informations des produits du panier et de l'API pour l'affichage
// Boucle qui va récupérer les infos 'complètes' des produits du panier pour l'affichage
// Affichage des produits du panier
// ********************************************************************************************************************************************************** //



// fonction qui récupère le localStorage, si vide => message indicatif sur la page
function getCarts() {
  const cart = localStorage.getItem("produits");
  // console.table(cart);
  if (cart === null) {
    document.querySelector("#cartAndFormContainer > h1").textContent =
      "Votre panier est vide";
    // console.log('Votre cart est vide');
  } else {
    return JSON.parse(cart);
  }
}

// fonction qui va récup les infos des produits pour les produits du panier
function fetchProductsInCart() {
  const carts = getCarts();
  for (const cart of carts) {
    //=> pour chaque produit du panier
    fetch("http://localhost:3000/api/products/" + cart.id)
      .then((response) => response.json())
      .then((product) => showProductInCart(product, cart)) //=> insertion infos API & panier
      .catch((error) => console.log(error));
  }
}

//fonction pour afficher de manière dynamique le ou les pdts du panier
function showProductInCart(product, cart) {
     // création de l' article
     let section = document.getElementById("cart__items")
    let article = document.createElement("article");
     article.className = "cart__item";
     article.setAttribute('data-id', product._id);
     article.setAttribute('data-color', cart.color)
     section.appendChild(article);

  
   // création et affichage de l'image
  let divImage = document.createElement("div");
   divImage.classList.add("cart__item__img");
   article.appendChild(divImage);
   let image = document.createElement("img");
   image.src = product.imageUrl;
   image.alt = product.altTxt;
   divImage.appendChild(image);
  
 
   // création de la div "content"
   let divContent = document.createElement("div");
   divContent.classList.add("cart__item__content");
   article.appendChild(divContent);
  
   // création et affichage du contenu de la div content-description
  let divContentDescription = document.createElement("div");
  divContentDescription.classList.add("cart__item__content__description");
  divContent.appendChild(divContentDescription);

  let h2 = document.createElement("h2");
  h2.textContent = product.name;
  divContentDescription.appendChild(h2);
  
  let pColor = document.createElement("p");
  pColor.textContent = cart.color;
  divContentDescription.appendChild(pColor);
  
  let pPrice = document.createElement("p");
   pPrice.textContent = product.price + " €";
   divContentDescription.appendChild(pPrice)
  
// //création de la div settings
 let divContentSettings = document.createElement("div");
 divContentSettings.classList.add("cart__item__content__settings");
 divContent.appendChild(divContentSettings);

 //création et affichage contenu div settings quantity
 let divSettingsQuantity = document.createElement("div");
 divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
 divContentSettings.appendChild(divSettingsQuantity);

 let pQty = document.createElement("p");
 pQty.textContent = "Qté : ";
 divSettingsQuantity.appendChild(pQty);
 let inputQty = document.createElement("input");
let quantityDataId = pQty.closest(".cart__item").dataset.id;
let quantityDataColor = pQty.closest(".cart__item").dataset.color;
 inputQty.setAttribute("type", "number");
 inputQty.setAttribute("class", "itemQuantity");
 inputQty.setAttribute("name", "itemQuantity");
 inputQty.setAttribute("min", "1");
 inputQty.setAttribute("max", "100");
 inputQty.setAttribute("value", cart.quantity);
 divSettingsQuantity.appendChild(inputQty);

 // actualisation du changement de la quantité
 inputQty.addEventListener("change", (event) => {
   updateQuantity(event, quantityDataId, quantityDataColor);
 });

 // quantité prise si entre 0 et 100
 inputQty.addEventListener("change", (event) => {
   if (event.target.value < 0) {
     inputQty.value = 1;
   }
 });
 // appel des fonctions
 totalQuantity();
 totalPrice();

 //création et affichage de la div settings delete
 let divSettingsDelete = document.createElement("div");
 divSettingsDelete.classList.add("cart__item__content__settings__delete");
 divContentSettings.appendChild(divSettingsDelete);

 let pDelete = document.createElement("p");
 pDelete.classList.add("deleteItem");
 pDelete.textContent = "Supprimer";
 divSettingsDelete.appendChild(pDelete); 

  // suppression de l'article au clic du boutton
  const dataId = pDelete.closest(".cart__item").dataset.id;
  const dataColor = pDelete.closest(".cart__item").dataset.color;
  pDelete.addEventListener("click", (event) => {
    deleteItem(dataId, dataColor);
  });
}

//actualisation du changement de quantité(sur la page et ds le localStorage), si ok => enregistré
function updateQuantity(event, quantityDataId, quantityDataColor) {
  const cart = JSON.parse(localStorage.getItem("produits"));

  for (let article of cart) {
    if (article.id === quantityDataId && article.color === quantityDataColor) {
      if (article.quantity > 0 && article.quantity < 100) {
        article.quantity = +event.target.value;
      } else {
        article.quantity = 1;//=> si qté négative, à la validation qté=1
      }
      localStorage.setItem("produits", JSON.stringify(cart));
      location.reload();
    }
  }
}

//fonction qui supprime l'article du panier, nouveau panier réactualisé
function deleteItem(dataId, dataColor) {
  const cart = JSON.parse(localStorage.getItem("produits"));
  const cartFilter = cart.filter(//=> pdt sélectionné par son id et sa couleur
    (article) =>
      (article.id !== dataId && article.color !== dataColor) ||
      (article.id === dataId && article.color !== dataColor)
  );
  let newCart = cartFilter;
  localStorage.setItem("produits", JSON.stringify(newCart));
  location.reload();
}
  
//fonction qui calcule la qté totale affichée sur la page
function totalQuantity() {
  const getTotalQuantity = document.getElementById("totalQuantity");
  const cart = JSON.parse(localStorage.getItem("produits"));
  let totalQuantity = [];
  
  let total = 0;
  for (let article of cart) {
    
    total += article.quantity;
  }
  totalQuantity.push(total);
  
  getTotalQuantity.innerText = total;
}
  


//fonction qui calcul le prix total des articles (affiché sur la page)
function totalPrice() {
  
  let getTotalPrice = document.getElementById("totalPrice");
  let getQuantity = document.querySelectorAll(".itemQuantity");
  let getPrices = document.querySelectorAll(
    ".cart__item__content__description"
  );

  // initialisation du px à 0
  let productPrice = 0;
  
  for (let i = 0; i < getPrices.length; i++) {
    // récupération du prix sur la page( mis en number)
    productPrice +=
      parseInt(getPrices[i].lastElementChild.textContent) *
      getQuantity[i].value;
  }
  getTotalPrice.innerText = productPrice;
}

fetchProductsInCart();
// ************************************************************************************** //
// Ce qu'attend le back :
// Expects request to contain:
//  contact: {
//    firstName: string,
//    lastName: string,
//    address: string,
//    city: string,
//    email: string
//  }
//  products: [string] <-- array of product _id
//                                         FORMULAIRE
let products = [];
const cart = JSON.parse(localStorage.getItem("produits"));
for (const element of cart) {
  products.push(element.id)
}

let btnSubmit = document.getElementById("order");

// // récup des "p" pour afficher mess d'erreur
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");

// // types regex sur les inputs
let textRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
let addressRegex = /^(.){2,50}$/;
let cityRegex = /^[a-zA-Zéèàïêç\-\s]{2,30}$/;
let emailRegex =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

// // methode test : Teste une correspondance dans une chaîne. Renvoie vrai ou faux
let contact = {};

// //-------------------REGEX----------------//
const regexNames = (value) => {
  return /^[A-Za-zéèêëàçâ-]{3,30}$/.test(value);
};

const regexAdresseAndCity = (value) => {
  return /^[a-zA-Zçéèêôùïâàû0-9\s, '-]{3,60}$/.test(value);
  //return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,8}$/.test(value);// test de ses regex=> Rubular.com
};

const regexEmail = (value) => {
  return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
    value
  );
};

// //**********************Fonctions qui vérifient la validité des champs de saisies des inputs**************** //
function verifFirstName() {
  let inputFirstName = document.getElementById("firstName").value;
  if (regexNames(inputFirstName)) {
    firstNameErrorMsg.textContent = "saisie enregistrée";
    return true;
  } else {
    firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";

    return false;
  }
}

function verifLastName() {
  let inputLastName = document.getElementById("lastName").value;
  if (regexNames(inputLastName)) {
    lastNameErrorMsg.textContent = "saisie enregistrée";
    return true;
  } else {
    lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";

    return false;
  }
}

function verifCity() {
  let inputCity = document.getElementById("city").value;
  if (regexAdresseAndCity(inputCity)) {
    cityErrorMsg.textContent = "saisie enregistrée";
    return true;
  } else {
    cityErrorMsg.textContent = "Veuillez renseigner une ville valide !";

    return false;
  }
}

function verifAddress() {
  let inputAddress = document.getElementById("address").value;
  if (regexAdresseAndCity(inputAddress)) {
    addressErrorMsg.textContent = "saisie enregistrée";
    return true;
  } else {
    addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";

    return false;
  }
}

function verifEmail() {
  let inputEmail = document.getElementById("email").value;
  if (regexEmail(inputEmail)) {
    emailErrorMsg.textContent = "saisie enregistrée";
    return true;
  } else {
    emailErrorMsg.textContent = "Veuillez saisir une adresse email valide !";

    return false;
  }
}

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault(event);
  //tableau contact
  contact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
  };
  send();
});

function send() {
  // => si tout est ok, alors...
  if (
    verifFirstName() &&
    verifLastName() &&
    verifAddress() &&
    verifCity() &&
    verifEmail()
  ) {
    console.log("fonction ok");

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({
        contact,
        products: products//cart.id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // .then((res) => res.json())
      // .then((data) => console.log(data)) //=> me permet de voir ce que j'envoie au back

      // Récupération et stockage de la réponse de l'API (orderId)

      .then((response) => {
        return response.json();
      })
      .then((server) => {
        const orderId = server.orderId;

        if (orderId != "") {
          // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
          location.href = "confirmation.html?orderid=" + orderId;
        }
      });
  } else {
    console.log("fonction non validée");
  }
 }
