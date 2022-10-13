// page panier : récapitulatif du panier
// récupération des informations des produits  depuis l'API
// récupération des produits du panier (encore virtuel)
// assemblage des informations des produits du panier et de l'API pour l'affichage
// Boucle qui va récupérer les infos 'complètes' des produits du panier pour l'affichage
// Affichage des produits du panier
// ********************************************************************************************************************************************************** //

let productsPanier = JSON.parse(localStorage.getItem("produits"));
console.log(productsPanier); // => affiche les pdts du panier

// ********************************************************************************************************************************************************** //
async function getProductsApi() {
  await fetch("http://localhost:3000/api/products")
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
      console.log(productFound); // => affiche les produits trouvés dans l'Api
      console.log(productLs);
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
    console.log("'''''''''");
  } // FIN BOUCLE
  document.getElementById("cart__items").innerHTML += productComplete; // => affiche les produits sélectionnés
  console.log("---------");
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
  console.log("itemsQuantity", itemsQuantity);
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
      console.log(article);

      let productsPanier = JSON.parse(localStorage.getItem("produits"));
      console.log(productsPanier);

      const thoseDataMatch = productsPanier.find(// => variable qui récupère l'id de l'élément supprimé
        (el) => el.id === article.dataset.id
      );
      console.log(thoseDataMatch);

      if (thoseDataMatch) {// => méthode qui renvoie une correspondance-> mise dans la condition -
        const indexLocalStorageProduct = productsPanier.findIndex((product) => {
          return (
            product.id === article.dataset.id &&
            article.dataset.color === product.color
          );
        });

        productsPanier.splice(indexLocalStorageProduct, 1);// =>méthode(splice) pour supprimer (ou remplacer) un élément (objet) ds le LS
        // |=> le 1 indique que l'on supprime 1 élément (un élément à chaque clic)
        
        localStorage.setItem("produits", JSON.stringify(productsPanier));//réinitialisation du localStorage
        location.reload();//(optionnel) raffraîchissement de la page
      }
     
    });
  });
}

// *************** //

function rangeProducts() {
  let productsPanier = JSON.parse(localStorage.getItem("produits"));
  let product = document.querySelector('.cart__item')
 // let product = productsPanier.closest(".cart__item");
 let a = a.product.name;
 let b = b.product.name;
  const productRanged = productsPanier.find(// => variable qui récupère le nom de l'élément 
  (el) => el.name === product.name
);
if(a < b) {
  return -1
}else{
  return 1
}

}


// ********************************************************************************************************************************************************** //
//  
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
 let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
 let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
 let addressErrorMsg = document.querySelector("#addressErrorMsg");
 let emailErrorMsg = document.querySelector("#emailErrorMsg");
 let cityErrorMsg = document.querySelector("#cityErrorMsg");

// type regex sur les inputs
// let textRegex = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
// let addressRegex = /^(.){2,50}$/;
// let cityRegex = /^[a-zA-Zéèàïêç\-\s]{2,30}$/;
// let emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

// methode test : Teste une correspondance dans une chaîne. Renvoie vrai ou faux


btnSubmit.addEventListener('click', (event) => {
  //tableau contact
//récup des inputs
let contact = {
  firstName : document.querySelector("#firstName").value,
   lastName : document.querySelector("#lastName").value,
   address : document.querySelector("#address").value,
   email : document.querySelector("#email").value,
   city : document.querySelector("#city").value,
  }

  //-------------------REGEX----------------//
  const regexNamesAndCity = (value) => {
    return /^[A-Z][A-Za-zéèêëàçâ-]{3,30}$/.test(value);
  };
  
  const regexAdresse = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,8}$/.test(value);
  };
  
  const regexEmail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(value);
  };

  //fonctions pr vérifier la validité des inputs
  function verifFirstName() {
    let firstName = contact.firstName;
    let inputFirstName = document.querySelector("#firstName");
    if(regexNamesAndCity(firstName)) {
      firstNameErrorMsg.textContent = "saisie enregistrée";
      return true;

    }else{
      firstNameErrorMsg.textContent = "Veuillez renseigner un prénom valide !";
      inputFirstName.style.backgroungColor = "red";
      return false;
    }
  }
  function verifLastName() {
    let lastName = contact.lastName;
    let inputLastName = document.querySelector("#lastName");
    if(regexNamesAndCity(lastName)) {
      lastNameErrorMsg.textContent = "saisie enregistrée";
      return true;
    }else{
      lastNameErrorMsg.textContent = "Veuillez renseigner un nom valide !";
      inputLastName.style.backgroungColor = "red";
      return false;
    }
  }
  function verifCity() {
    let city = contact.city;
    let inputCity = document.querySelector("#city");
    if(regexNamesAndCity(city)) {
      cityErrorMsg.textContent = "saisie enregistrée";
      return true;
    }else{
      cityErrorMsg.textContent = "Veuillez renseigner une ville valide !";
      inputCity.style.backgroungColor = "red";
      return false;
    }
  }
  function verifAddress() {
    let address = contact.address;
    let inputAddress = document.querySelector("#address");
    if( regexAdresse(address)) {
      addressErrorMsg.textContent = "saisie enregistrée";
      return true;
    }else{
      addressErrorMsg.textContent = "Veuillez saisir une adresse valide !";
      inputAddress.style.backgroungColor = "red";
      return false;
    }
  }
  function verifEmail() {
    let email = contact.email;
    let inputEmail = document.querySelector("#email");
    if(regexEmail(email)) {
      emailErrorMsg.textContent = "saisie enregistrée";
      return true;
    }else{
      emailErrorMsg.textContent = "Veuillez saisir une adresse email valide !";
      inputEmail.style.backgroungColor = "red";
      return false;
    }
  }
  function send(event) {
    if(verifEmail() && verifAddress() &&  verifCity() && verifLastName() && verifFirstName()) {
           e.preventDefault(event);
     fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        'Accept': 'application/json', 
           'Content-Type': 'application/json'
      },
    })
      // Récupération et stockage de la réponse de l'API (orderId)
      .then((response) => {
        return response.json();
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
      });

    // Si l'orderId a bien été récupéré, on redirige l'utilisateur vers la page de Confirmation
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId;
    }
  }
};

  


  
  
    
    

  
  



