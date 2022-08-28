

let products = [] ;
//fonction fetch qui permet de récupérer les éléments de l'API
fetch("http://localhost:3000/api/products")
   .then( data => data.json())
   .then(jsonListProducts => {
    //boucle qui prend la liste de tous les produits
    for(let jsonProduct of jsonListProducts){
    //ma variable qui represente un produit de la liste puis le 2eme, puis le 3eme...   
        //insertion de l'élément article ds le HTML
        document.querySelector(".items").innerHTML +=  `<a href="./product.html?id=${jsonProduct._id}">
                                                           <article>
                                                             <img src="${jsonProduct.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
                                                             <h3 class="productName">${jsonProduct.name}</h3>
                                                             <p class="productDescription">${jsonProduct.description}</p>
                                                           </article>
                                                        </a>` 
    }
   })


