//récupérer l'orderid de confirmation pr affichage du num de commande
//suppression du panier une fois la commande finalisée

const productId = new URL(window.location.href).searchParams.get("orderid");
//console.log(productId);

const orderId = document.getElementById('orderId');
orderId.innerHTML = productId;

localStorage.clear();

//****************************************************// */



