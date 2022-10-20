// page panier : récapitulatif du panier
// récupération des informations des produits  depuis l'API
// récupération des produits du panier (encore virtuel)
// assemblage des informations des produits du panier et de l'API pour l'affichage
// Boucle qui va récupérer les infos 'complètes' des produits du panier pour l'affichage
// Affichage des produits du panier
// ********************************************************************************************************************************************************** //
let productsId = [];//tableau pour le back
let productsPanier = JSON.parse(localStorage.getItem("produits"));
if (productsPanier) {
  productsPanier.sort((a, b) => a.id.localeCompare(b.id));
  for (let i of productsPanier) {
    /*pour chaque produit dans le LS*/
    const productId = i.id; /*on récupère l'id de chaque produit*/
    productsId.push(productId); /*et on le push dans notre tableau*/
  }
}
//console.log(productsPanier); // => affiche les pdts du panier

// ********************************************************************************************************************************************************** //
 function getProductsApi() {
   fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((datas) => displayProducts(datas))
    .catch((error) => {
      console.log(error);
    });
}
getProductsApi();

// ********************************************************************************************************************************************************** //

function displayProducts(products) {
  let productComplete = [];
  let totalPrice = document.getElementById("totalPrice");
  let totalPriceAllItems = 0;
  let totalQuantity = document.getElementById("totalQuantity");
  let totalQuantityAllItems = 0;

  for (let index in productsPanier) {
    let productLs = productsPanier[index];
    let productFound = products.find(
      (products) => products._id === productLs.id
    );
    if (productFound) {
      //console.log(productFound); // => affiche les produits trouvés dans l'Api

      productComplete += `<article class="cart__item" id="${productFound._id}" data-id="${productFound._id}" data-color="${productLs.color}">
        <div class="cart__item__img">
        <img src="${productFound.imageUrl}" alt="${productFound.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${productFound.name}</h2>
        <p>${productLs.color}</p>
        <p>${productFound.price},00 €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté :</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLs.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;
    } //FIN CONDITION

    // CALCUL DU PRIX TOTAL DES ARTICLES COMMANDES
    let totalPriceItem = productFound.price * productLs.quantity;
    totalPriceAllItems += totalPriceItem;

    //CALCUL DE LA QUANTITE TOTALE DES ARTICLES COMMANDES

    totalQuantityAllItems += parseInt(productLs.quantity);
  } // FIN BOUCLE
  document.getElementById("cart__items").innerHTML += productComplete; // => affiche les produits sélectionnés

  // AFFICHAGE DES PRODUITS DU PANIER
  localStorage.setItem("produits", JSON.stringify(productsPanier)); // => enregistrement des produits dans le localStorage

  // AFFICHAGE DU PRIX TOTAL DES ARTICLES COMMANDES
  totalPrice.innerHTML = parseInt(totalPriceAllItems);

  //AFFICHAGE DE LA QUANTITE TOTALE DU NOMBRE D'ARTICLES COMMANDES
  totalQuantity.innerHTML = totalQuantityAllItems;

  modifQuantity();
  deleteProduct();
  //rangeProducts();
} //FIN FONCTION

// ********************************************************************************************************************************************************** //
// fonction qui va prendre en compte le changement de la quantité
// on sélectionne l'input où va s'effectuer le changement
// on écoute l'évenement sur cet input et on récupère sa valeur
// on parcours le produit qui a subit une modification de qté
// on récupère le panier pour y enregistrer le changement
// on récupère l'Id et la couleur du produit pour identifier le produit
// on enregistre ds le LS la nouvelle qté du produit identifier
// on raffraichit la page
function modifQuantity() {
  const itemsQuantity = document.querySelectorAll(".itemQuantity");

  itemsQuantity.forEach((itemQuantity) => {
    itemQuantity.addEventListener("change", () => {
      const newQuantity = Number(itemQuantity.value);
      itemQuantity.textContent = newQuantity;
      let kanap = itemQuantity.closest("article"); // => méthode qui parcourt les produits afin de trouver celui qui subit un changement(de qté)
      let productsPanier = JSON.parse(localStorage.getItem("produits")); // => on récup le panier
      let getId = kanap.getAttribute("data-id"); // => création de variables (pr récup id & color)
      let getColor = kanap.getAttribute("data-color"); // ""
      for (let index = 0; index < productsPanier.length; index++) {
        const productLs = productsPanier[index];
        if (getId === productLs.id && getColor === productLs.color) {
          // => on vérifie le pdt par son ID et sa couleur pr enregistrer sa nvelle Qté
          productLs.quantity = newQuantity;
          localStorage.setItem("produits", JSON.stringify(productsPanier)); // => on enregistre
        }
      }
      window.location.reload(); // => réactualise la page
    });
  });
}
// ************************* //
// Suppression d'un produit
function deleteProduct(products) {
  let btnDelete = document.querySelectorAll(".deleteItem");

  btnDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (event) => {
      event.preventDefault();

      let article = btnDelete.closest(".cart__item");

      let productsPanier = JSON.parse(localStorage.getItem("produits"));

      const thoseDataMatch = productsPanier.find(
        // => variable qui récupère l'id de l'élément supprimé
        (el) => el.id === article.dataset.id
      );

      if (thoseDataMatch) {
        // => méthode qui renvoie une correspondance-> mise dans la condition -
        const indexLocalStorageProduct = productsPanier.findIndex((product) => {
          return (
            product.id === article.dataset.id &&
            article.dataset.color === product.color
          );
        });

        productsPanier.splice(indexLocalStorageProduct, 1); // =>méthode(splice) pour supprimer (ou remplacer) un élément (objet) ds le LS
        // |=> le 1 indique que l'on supprime 1 élément (un élément à chaque clic)

        localStorage.setItem("produits", JSON.stringify(productsPanier)); //réinitialisation du localStorage
        location.reload(); //(optionnel) raffraîchissement de la page
      }
    });
  });
}

// ********************************************************************************************************************************************************** //
// Ce qu'attend le back : 
// Expects request to contain:
// * contact: {
// *   firstName: string,
// *   lastName: string,
// *   address: string,
// *   city: string,
// *   email: string
// * }
// * products: [string] <-- array of product _id
// *                                        FORMULAIRE

let btnSubmit = document.getElementById("order");

// récup des "p" pour afficher mess d'erreur
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let cityErrorMsg = document.getElementById("cityErrorMsg");

// types regex sur les inputs
// let textRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
// let addressRegex = /^(.){2,50}$/;
// let cityRegex = /^[a-zA-Zéèàïêç\-\s]{2,30}$/;
// let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

// methode test : Teste une correspondance dans une chaîne. Renvoie vrai ou faux
let contact = {};

//-------------------REGEX----------------//
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

//**********************Fonctions qui vérifient la validité des champs de saisies des inputs**************** //
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
    //console.log("fonction ok");

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({
        contact,
        products: productsId, //productsPanier.map((p) => p.id),
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

// ********************************************************* //
// Modèles tirés des cours //
/*
function askHello() {
  fetch("https://mockbin.com/request?greetings=salut")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    document
        .getElementById("hello-result")
        .innerText = value.queryString.greetings;
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
}

document
  .getElementById("ask-hello")
  .addEventListener("click", askHello);
*/
// ************************************* //
/*
function getCodeValidation() {
  return document.getElementById("code-validation");
}

function disableSubmit(disabled) {
  if (disabled) {
    document
      .getElementById("submit-btn")
      .setAttribute("disabled", true);
  } else {
    document
      .getElementById("submit-btn")
      .removeAttribute("disabled");
  }
}

document
  .getElementById("code")
  .addEventListener("input", function(e) {
  if (/^CODE-/.test(e.target.value)) {
    getCodeValidation().innerText = "Code valide";
    disableSubmit(false);
  } else {
    getCodeValidation().innerText = "Code invalide";
    disableSubmit(true);
  }
});
 */
// ******************************* //
/*
function send(e) {
  e.preventDefault();
  fetch("https://mockbin.com/request", {
    method: "POST",
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({value: document.getElementById("value").value})
  })
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      document
        .getElementById("result")
        .innerText = value.postData.text;
  });
}

document
  .getElementById("form")
  .addEventListener("submit", send);
*/
