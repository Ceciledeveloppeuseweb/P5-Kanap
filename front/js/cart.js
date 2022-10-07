// page panier : récapitulatif du panier
// récupération des informations des produits  depuis l'API
// récupération des produits du panier (encore virtuel)
// assemblage des informations des produits du panier et de l'API pour l'affichage
// Boucle qui va récupérer les infos 'complètes' des produits du panier pour l'affichage
// Affichage des produits du panier
// ******************************************************************* //

// *********************** //
let productsPanier = JSON.parse(localStorage.getItem("produits"));

console.log(productsPanier); // => affiche les pdts du panier

productsPanier.sort(function (a, b) {
  return a.name - b.name;
});
//return (productsPanier(a.name) < productsPanier(b.name))?1:-1;

async function getProductsApi() {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((datas) => displayProducts(datas))
    .catch((error) => {
      console.log(error);
    });
}
getProductsApi();

// ************************ //

function displayProducts(products) {
  let productComplete = [];
  let totalPrice = document.getElementById("totalPrice");
  let totalPriceAllItems = 0;
  let totalQuantity = document.getElementById("totalQuantity");
  let totalQuantityAllItems = 0;
  //let itemsQuantity = document.querySelectorAll(".itemQuantity")
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

    console.log("/////");
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
  //rangeProducts();
} //FIN FONCTION

console.log("********");
// ********************************************** //

function modifQuantity() {
  const itemsQuantity = document.querySelectorAll(".itemQuantity");
  console.log("itemsQuantity", itemsQuantity);
  itemsQuantity.forEach((itemQuantity) => {
    itemQuantity.addEventListener("change", () => {
      const newQuantity = Number(itemQuantity.value);
      itemQuantity.textContent = newQuantity;
      let kanap = itemQuantity.closest("article"); // => méthode qui parcours les produits afin de trouver celui qui subit un changement(de qté)
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
      window.location.reload();
    });
  });
}

/*  function rangeProducts() {
  productsPanier.sort(function (a, b) {
   
    if(a.name < b.name) {
      return -1;
      
    }else{
      return 1;
    }
    //return (productsPanier(a.name) < productsPanier(b.name))?1:-1;
    
  });
  
}  */

// ********************************************************************* //

/* function changeQuantity() {
  
  let inputsQuantity = [];
  console.log(inputsQuantity);
  inputsQuantity.forEach((inputQuantity) => {
    inputQuantity.addEventListener("change", () => {
      let newQuantity = document.querySelectorAll(".itemQuantity").value;
      console.log(newQuantity);
      inputsQuantity.push(newQuantity);
      console.log(newQuantity);
      for (const productLs of productsPanier) {
       productLs.quantity = parseInt(newQuantity)
       inputQuantity.textContent = parseInt(newQuantity);
     }
     localStorage.setItem("produits", JSON.stringify(productsPanier));
     //return newQuantity;
    });
  });
  //inputQuantity.innerHTML = productLs.quantity;
  //window.location.reload();
}
changeQuantity(); */

// ********************* //
/* function displayTotalPrice() {
//  let total = 0;
   const totalPrice = document.querySelector("#totalPrice");
   const total = productsPanier.reduce((total, productLs) => total + productLs.price * productLs.quantity, 0);
   totalPrice.textContent = Number(total);
//   productsPanier.forEach(productLs => {
//     const totalUnitPrice = parseInt(productLs.price) * parseInt(productLs.quantity);
//     total += parseInt(totalUnitPrice);
    
//   });
//   console.log(total);
//   totalPrice.textContent = total;
}
displayTotalPrice() */

// ************************************************* //
// ***** //
/* function getPanier() {
  let produitsPanier = [];
  if (localStorage.getItem("produits") != null) {
    produitsPanier = JSON.parse(localStorage.getItem("produits")); //=> donne du  JSON data en objet js
  }
  return produitsPanier;
} */

// ******* //

// function changeQuantity(products) {
//   let totalQuantityAllItems = document.getElementById("totalQuantity");

//   let inputs = document.querySelectorAll(".itemQuantity");

//   productsPanier.forEach((productLs) => {
//     inputs.forEach((input) => {
//       input.addEventListener("change", () => {
//         productLs.quantity = input.value;
//         let quantityAmended = productLs.quantity;

//         input.innerHTML += parseInt(quantityAmended);

//         totalQuantityAllItems.innerHTML += parseInt(inputs);
//         localStorage.setItem("produits", JSON.stringify(productsPanier));
//         console.log(localStorage);
//       });
//     });
//   });
// }
// changeQuantity();
// *************************************************************** //
/* function changeQuantity(productComplete) {
  for (let i = 0; i < productsPanier.length; i++) {
    const productLs = productsPanier[i];
    
  }
  const allInputQuantity = document.querySelectorAll(".itemQuantity");// => récupération de l'input(de chaque produit)
  allInputQuantity.forEach((inputQuantity) => {// => pour chaque input parmis ts les inputsQté
    inputQuantity.addEventListener("change", (event) => {// => j'écoute la valeur rendue de l'input
      event.preventDefault();//=> aucune action si pas d'évènement
      const inputValue =  inputQuantity.value;//variable qui stock la valeur saisie
      const dataId = productLs._id;// variable qui récupère l'id du produit
      const dataColor = productLs.color;// variable qui récupère la couleur du pdt
     console.log(inputValue);
     console.log(dataId);
     console.log( dataColor);
     productsPanier = productLs.map((productLs, index) => {
       if (productLs.id === dataId && productLs.color === dataColor) {
         productLs.quantity = inputValue;
       }
       console.log(productLs);
       return productLs;
     });
     // Mise à jour du localStorage
     localStorage.setItem("produits", JSON.stringify(productsPanier));
     // let productLsString = JSON.stringify(productsPanier);
     // localStorage.setItem("produits", productLsString);
     // Refresh de la page Panier
    // location.reload();
   });
 });
} */
//changeQuantity();

// ************************************************ //

// to delete items in cart
// function deleteCartItem(productId, productColor) {
//   let cartProducts = getCart();
//   for (let i = 0; i < cartProducts.length; i++) {
//     if(productId === cartProducts[i][0] && productColor === cartProducts[i][1]) {
//       cartProducts.splice(i, 1);
//       localStorage.setItem('cart', JSON.stringify(cartProducts));
//       window.location.reload();
//     }
//   }
// }

// function changeQuantity(products) {
//   let btnQuantity = 0;
//   let btnItemsQuantity = document.querySelectorAll(".itemQuantity");

//    btnItemsQuantity.addEventListener("change", (e) => {
//     btnQuantity = parseInt(btnItemsQuantity.e.target.value);
//     console.log(btnQuantity);
//     productLs.quantity = parseInt(btnQuantity);
//     console.log(btnQuantity);
//     btnItemsQuantity += productLs.quantity
//    })

//    localStorage.setItem("produits", JSON.stringify(productsPanier));
//  };
//  changeQuantity()
