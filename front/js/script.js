
//variable de mon tableau de produits
let products = [] ;
//fonction fetch qui permet de récupérer les éléments de l'API
fetch("http://localhost:3000/api/products")
   .then( data => data.json())
   .then(ListProducts => {
    //boucle qui prend la liste de tous les produits
    for(let product of ListProducts){
    //ma variable qui represente un produit de la liste puis le 2eme, puis le 3eme...   
        //insertion de l'élément article ds le HTML
        document.querySelector(".items").innerHTML +=  `<a href="./product.html?id=${product._id}">
                                                           <article>
                                                             <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                             <h3 class="productName">${product.name}</h3>
                                                             <p class="productDescription">${product.description}</p>
                                                           </article>
                                                        </a>` 
    }
   })


