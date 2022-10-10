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
  //deleteItem();

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
      window.location.reload(); // => réactualise la page
    });
  });
}
// ************************* //
// Suppression d'un produit
function deleteProduct() {
  let btnDelete = document.querySelectorAll(".deleteItem");

  btnDelete.forEach((btnDelete) => {
      btnDelete.addEventListener("click" , (event) => {
          event.preventDefault();
          console.log("jusque là tt va")
          for(i=0; i<productsPanier.length; i++){
            let productLs = productsPanier[i];
            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            //const deleteId = event.target.getAttribute("id");
            //const deleteColor = event.target.getAttribute("data-color");
            let idDelete = productLs.id;
            console.log("l'id du produit cliqué est : " + idDelete)
            let colorDelete = productLs.color;
            console.log("la couleur du produit cliqué est : "+ colorDelete)
            console.log(idDelete, colorDelete);
            productsPanier = productsPanier.filter( el => el.id !== idDelete && el.color !== colorDelete );
            localStorage.setItem("produits", JSON.stringify(productsPanier));
            //alert("Vous venez de supprimer ce produit du panier");
            location.reload();
          }
      })
  })
}

            
  
            
  
           



// *************** //
// function deleteItem() {
//   const deleteButtons = document.querySelectorAll(".deleteItem");
//   deleteButtons.forEach((deleteButton) => {
//     deleteButton.addEventListener("click", (event) => {
//       event.preventDefault();
//       const deleteId = event.target.getAttribute("id");
//       const deleteColor = event.target.getAttribute("data-color");
//productsPanier = productsPanier.filter( el => el.productId !== idDelete || el.productColor !== colorDelete );
//       console.log(productsPanier);
//       // Mise à jour du localStorage
//       localStorage.setItem("productsPanier", JSON.stringify(productsPanier));
//       // Refresh de la page Panier
//       //location.reload();
//       //alert("Article supprimé du panier.");
//     });
//   });
// }





       
      
      
     
      

